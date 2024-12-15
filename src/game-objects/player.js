import Phaser from "phaser";
import { ANIMS, EVENTS, IMAGES, PLAYER_DAMAGE_COOLDOWN } from "../constants";
import { MonsterBase } from "./monsters/base-classes/monster-base";
import { sceneEvents } from "../events/event-center";

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, IMAGES.sprites, "knight_f_idle_anim_f0.png");

		this.health = 100;
		this.speed = 100;
		this.knockBackCount = 0;
		this.currentHealthState = HealthState.IDLE;
		this.damageCounter = 0;

		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.keys = this.scene.input.keyboard.createCursorKeys();

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

	update(time, deltaTime) {
		this.manageHealthState(deltaTime);

		if (this.currentHealthState === HealthState.DEAD) {
			this.anims.play(ANIMS.player.dead, true);
			return;
		}

		if (this.knockBackCount > 0) {
			this.knockBackCount--;
			this.anims.play(ANIMS.player.hit, true);
			return;
		}

		if (this.keys.left.isDown) {
			this.setVelocityX(-this.speed);
			this.flipX = true;
		} else if (this.keys.right.isDown) {
			this.setVelocityX(this.speed);
			this.flipX = false;
		} else {
			this.setVelocityX(0);
		}

		if (this.keys.up.isDown) {
			this.setVelocityY(-this.speed);
		} else if (this.keys.down.isDown) {
			this.setVelocityY(this.speed);
		} else {
			this.setVelocityY(0);
		}

		if (this.body.velocity.equals(Phaser.Math.Vector2.ZERO)) {
			this.anims.play(ANIMS.player.idle, true);
		} else {
			this.anims.play(ANIMS.player.run, true);
		}
	}

	/** @param {MonsterBase} monster */
	handleMonsterDamage(monster) {
		if (this.currentHealthState !== HealthState.IDLE) {
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
