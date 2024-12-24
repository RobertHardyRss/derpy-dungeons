//@ts-check
import Phaser from "phaser";
import {
	ANIMS,
	AUDIO,
	IMAGES,
	PLAYER_DAMAGE_COOLDOWN,
	SCENES,
} from "../constants";
import { MonsterBase } from "./monsters/base-classes/monster-base";
import { gameEvents, EVENTS } from "../events/event-center";
import { Axe } from "./weapons/axe";

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, weapons) {
		super(scene, x, y, IMAGES.sprites, "knight_f_idle_anim_f0.png");

		this.health = this.scene.registry.get("hp") ?? 100;
		this.speed = 100;
		this.knockBackCount = 0;
		this.attackCoolDown = 0;

		this.currentHealthState = HealthState.IDLE;
		this.damageCounter = 0;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.keys = this.scene.input.keyboard?.createCursorKeys();

		/** @type {Phaser.GameObjects.Group} */
		this.weapons = weapons;
		this.attackDirection = new Phaser.Math.Vector2(0, 0);

		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.45);
		this.setOffset(4, 14);

		this.anims.play(ANIMS.player.idle);
	}

	create() {}

	manageHealthState(deltaTime) {
		switch (this.currentHealthState) {
			case HealthState.IDLE:
				break;

			case HealthState.DAMAGING:
				this.damageCounter += deltaTime;
				if (this.damageCounter >= PLAYER_DAMAGE_COOLDOWN) {
					this.damageCounter = 0;
					this.setTint(0xffffff);
					this.currentHealthState = HealthState.IDLE;
				}
				break;
		}
	}

	preUpdate(time, deltaTime) {
		super.preUpdate(time, deltaTime);
		this.manageHealthState(deltaTime);

		if (this.currentHealthState === HealthState.DEAD) {
			this.anims.play(ANIMS.player.dead, true);
			return;
		}

		if (this.attackCoolDown != 0) {
			this.attackCoolDown -= deltaTime;
			this.attackCoolDown = Math.max(0, this.attackCoolDown);
		}

		if (this.knockBackCount > 0) {
			this.knockBackCount--;
			this.anims.play(ANIMS.player.hit, true);
			return;
		}

		let direction = new Phaser.Math.Vector2(0, 0);

		if (this.keys?.left.isDown) {
			direction.x = -1;
			this.flipX = true;
		} else if (this.keys?.right.isDown) {
			direction.x = 1;
			this.flipX = false;
		} else {
			direction.x = 0;
		}

		if (this.keys?.up.isDown) {
			direction.y = -1;
		} else if (this.keys?.down.isDown) {
			direction.y = 1;
		} else {
			direction.y = 0;
		}

		if (this.keys?.space.isDown) {
			// no moving when space is down
			this.setVelocity(0, 0);
			this.attackDirection = direction;
			this.throwWeapon();
			return;
		}

		this.setVelocity(direction.x * this.speed, direction.y * this.speed);
		if (this.body?.velocity.equals(Phaser.Math.Vector2.ZERO)) {
			this.anims.play(ANIMS.player.idle, true);
		} else {
			this.anims.play(ANIMS.player.run, true);
		}
	}

	throwWeapon() {
		if (this.attackCoolDown !== 0) {
			return;
		}

		let w = new Axe(
			this.scene,
			this.x,
			this.y,
			this.attackDirection,
			this.flipX
		);
		this.attackCoolDown = w.coolDownTimer;

		//@ts-ignore playerWeapons exist on scene
		this.scene.playerWeapons.add(w);
	}

	/**
	 * @param {MonsterBase} source
	 * @param {boolean} isActive
	 **/
	handleDamageToPlayer(source, isActive, knockback = true) {
		if (this.currentHealthState !== HealthState.IDLE || !isActive) {
			return;
		}

		this.currentHealthState = HealthState.DAMAGING;

		// tint the player red
		this.setTint(0xff0000);
		this.health -= source.strength;

		if (this.health <= 0) {
			this.currentHealthState = HealthState.DEAD;
			this.scene.sound.play(AUDIO.playerDeath);
			gameEvents.emit(EVENTS.player.death);
		}

		if (knockback) {
			this.knockBackCount = source.strength;

			let knockBackVector = new Phaser.Math.Vector2(
				this.x - source.x,
				this.y - source.y
			);

			knockBackVector.normalize().scale(200);
			this.setVelocity(knockBackVector.x, knockBackVector.y);
		}
		this.scene.sound.play(
			AUDIO.playerDamage[Phaser.Math.Between(0, AUDIO.playerDamage.length - 1)],
			{ volume: 0.3 }
		);
		gameEvents.emit(EVENTS.player.healthChanged, this.health);
	}

	/** @param {number} amount - the amount to heal the player */
	handlePlayerHealing(amount) {
		// cannot go over 100 health
		this.health = Math.min(100, this.health + amount);
		this.scene.sound.play(AUDIO.heal);
		gameEvents.emit(EVENTS.player.healthChanged, this.health);
	}
}

const HealthState = {
	IDLE: 0,
	DAMAGING: 1,
	DEAD: 2,
};
