//@ts-check
import Phaser from "phaser";
import {
	AUDIO,
	DEBUG_DISABLE_MONSTER_MOVEMENT,
	IMAGES,
} from "../../../constants";
import { WeaponBase } from "../../weapons/base-classes/weapon-base";
import { gameEvents, EVENTS } from "../../../events/event-center";

export class MonsterBase extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, frame, typeName) {
		super(scene, x, y, IMAGES.sprites, frame);

		this.typeName = typeName;
		this.hitPoints = 1;
		this.xp = 1;
		this.strength = 1;

		/** the base speed for the monster, consider the maximum speed 2 times the base speed */
		this.baseSpeed = 50;
		/** the vector that will be used for setting the monster's velocity  */
		this.movementVector = Phaser.Math.Vector2.ZERO;
		this.lastDirectionVector = Phaser.Math.Vector2.ZERO;

		/**
		 * This event is a timer event on the scene that will change direction
		 * @type {Phaser.Time.TimerEvent}
		 */
		this.updateMovementEvent = this.scene.time.delayedCall(
			1000,
			this.updateMovement,
			undefined,
			this
		);

		this.scene.physics.add.existing(this);
		this.body.onCollide = true;
		this.scene.physics.world.on(
			Phaser.Physics.Arcade.Events.TILE_COLLIDE,
			this.handleTileCollision,
			this
		);
	}

	destroy(fromScene) {
		this.updateMovementEvent.destroy();
		super.destroy(fromScene);
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (!this.active) {
			return;
		}
		this.move();

		if (this.body.velocity.x < 0) {
			this.flipX = true;
		} else if (this.body.velocity.x > 0) {
			this.flipX = false;
		}

		this.attack(delta);
	}

	handleTileCollision(monster, tile) {
		if (monster !== this) {
			return;
		}
		monster.updateMovement();
	}

	/**
	 * @param {MonsterBase} monster
	 * @param {WeaponBase} weapon
	 * @returns
	 */
	handleWeaponCollision(weapon) {
		if (!weapon.active) {
			return;
		}

		this.hitPoints -= weapon.damage;
		if (this.hitPoints <= 0) {
			this.scene.sound.play(AUDIO.monsterDeath, { volume: 0.3 });
			gameEvents.emit(EVENTS.monsterDeath, this.xp);
			this.setActive(false);
			this.setVisible(false);
		} else {
			this.scene.sound.play(
				AUDIO.monsterDamage[
					Phaser.Math.Between(0, AUDIO.monsterDamage.length - 1)
				],
				{ volume: 0.3 }
			);
		}
		return Math.max(0, this.hitPoints);
	}

	updateMovement() {
		// randomly setup direction vector
		let directionVector = new Phaser.Math.Vector2(
			Phaser.Math.Between(-1, 1),
			Phaser.Math.Between(-1, 1)
		);

		// switch up the directions each time
		while (directionVector.equals(this.lastDirectionVector)) {
			directionVector = new Phaser.Math.Vector2(
				Phaser.Math.Between(-1, 1),
				Phaser.Math.Between(-1, 1)
			);
		}
		this.lastDirectionVector = directionVector;

		// randomly setup speed vector
		const speedVector = new Phaser.Math.Vector2(
			Phaser.Math.Between(this.baseSpeed, this.baseSpeed * 2),
			Phaser.Math.Between(this.baseSpeed, this.baseSpeed * 2)
		);

		// multiply speed and direction to get current movement
		this.movementVector = speedVector.multiply(directionVector);

		// update the movement on a timer
		this.updateMovementEvent?.destroy();
		this.updateMovementEvent = this.scene.time.delayedCall(
			Phaser.Math.Between(3000, 10000),
			this.updateMovement,
			undefined,
			this
		);
	}

	move() {
		if (DEBUG_DISABLE_MONSTER_MOVEMENT) {
			return;
		}
		this.setVelocity(this.movementVector.x, this.movementVector.y);
	}

	attack(delta) {}
}
