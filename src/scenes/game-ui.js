import Phaser from "phaser";
import { ANIMS, EVENTS, IMAGES, SCENES } from "../constants";
import { sceneEvents } from "../events/event-center";

export class GameUi extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.gameUi });

		this.hearts;
	}

	create() {
		this.hearts = this.add.group({ classType: Phaser.GameObjects.Sprite });

		this.hearts.createMultiple({
			key: IMAGES.sprites,
			frame: ANIMS.ui.healthFull,
			setXY: {
				x: 20,
				y: 20,
				stepX: 32,
			},
			quantity: 5,
			setScale: {
				x: 2,
				y: 2,
			},
		});

		sceneEvents.on(EVENTS.player.healthChanged, this.handleHealthChange, this);
		this.events.once(
			Phaser.Scenes.Events.SHUTDOWN,
			() => {
				sceneEvents.off(
					EVENTS.player.healthChanged,
					this.handleHealthChange,
					this
				);
			},
			this
		);
	}

	/** @param { number } playerHealth*/
	handleHealthChange(playerHealth) {
		this.hearts.children.each((h, i) => {
			// we should have 5 hearts, which means each heart represents
			// 20 points of health. Figure out which heart we are on and if it should be
			// empty, half or full

			/** @type { Phaser.GameObjects.Sprite } */
			let heart = h;

			let emptyValue = i * 20;
			let halfValue = emptyValue + 10;

			if (playerHealth <= emptyValue) {
				heart.setFrame(ANIMS.ui.healthEmpty);
			} else if (playerHealth <= halfValue) {
				heart.setFrame(ANIMS.ui.healthHalf);
			} else {
				heart.setFrame(ANIMS.ui.healthFull);
			}
		});
	}
}
