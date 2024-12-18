import Phaser from "phaser";
import { ANIMS, IMAGES, PLAYER_DAMAGE_COOLDOWN } from "../constants";
import { MonsterBase } from "./monsters/base-classes/monster-base";
import { sceneEvents, EVENTS } from "../events/event-center";
import { Axe } from "./weapons/axe";

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, weapons) {
		super(scene, x, y, IMAGES.sprites, "knight_f_idle_anim_f0.png");

		this.health = 100;
		this.speed = 100;
		this.knockBackCount = 0;
		this.attackCoolDown = 0;

		this.currentHealthState = HealthState.IDLE;
		this.damageCounter = 0;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.keys = this.scene.input.keyboard.createCursorKeys();

		/** @type {Phaser.GameObjects.Group} */
		this.weapons = weapons;
		this.attackDirection = new Phaser.Math.Vector2(0, 0);

		// adjust hitbox
		this.setSize(this.width * 0.5, this.height * 0.6);
		this.setOffset(4, 10);

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

		if (this.keys.left.isDown) {
			direction.x = -1;
			this.flipX = true;
		} else if (this.keys.right.isDown) {
			direction.x = 1;
			this.flipX = false;
		} else {
			direction.x = 0;
		}

		if (this.keys.up.isDown) {
			direction.y = -1;
		} else if (this.keys.down.isDown) {
			direction.y = 1;
		} else {
			direction.y = 0;
		}

		if (this.keys.space.isDown) {
			// no moving when space is down
			this.setVelocity(0, 0);
			this.attackDirection = direction;
			this.throwWeapon();
			return;
		}

		this.setVelocity(direction.x * this.speed, direction.y * this.speed);
		if (this.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
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
		this.scene.playerWeapons.add(w);
		console.log(w, this.scene.playerWeapons);
	}

	/** @param {MonsterBase} monster */
	handleMonsterDamage(monster) {
		if (this.currentHealthState !== HealthState.IDLE || !monster.active) {
			return;
		}

		this.currentHealthState = HealthState.DAMAGING;

		// tint the player red
		this.setTint(0xff0000);

		this.health -= monster.strength;
		if (this.health <= 0) {
			this.currentHealthState = HealthState.DEAD;
		}

		this.knockBackCount = monster.strength;

		let knockBackVector = new Phaser.Math.Vector2(
			this.x - monster.x,
			this.y - monster.y
		);

		knockBackVector.normalize().scale(200);
		this.setVelocity(knockBackVector.x, knockBackVector.y);

		sceneEvents.emit(EVENTS.player.healthChanged, this.health);
	}
}

const HealthState = {
	IDLE: 0,
	DAMAGING: 1,
	DEAD: 2,
};
