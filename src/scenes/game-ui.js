import Phaser from "phaser";
import { ANIMS, IMAGES, SCENES } from "../constants";
import { sceneEvents, EVENTS } from "../events/event-center";

export class GameUi extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.gameUi });
		this.coins = 0;
		this.xp = 0;
		this.hearts;
	}

	create() {
		this.coins = this.registry.get("coins");
		this.xp = this.registry.get("xp");
		this.hearts = this.add.group({ classType: Phaser.GameObjects.Sprite });

		this.hearts.createMultiple({
			key: IMAGES.sprites,
			frame: ANIMS.ui.healthFull,
			setXY: {
				x: window.innerWidth - 150,
				y: 20,
				stepX: 32,
			},
			quantity: 5,
			setScale: {
				x: 2,
				y: 2,
			},
		});

		this.xpText = this.add.bitmapText(
			window.innerWidth / 2 - 50,
			10,
			"arcade",
			`XP ${this.xp}`,
			20
		);

		this.coinText = this.add.bitmapText(40, 10, "arcade", `${this.coins}`, 20);
		this.coinSprite = this.add.sprite(
			20,
			20,
			IMAGES.sprites,
			"coin_anim_f0.png"
		);
		this.coinSprite.setScale(3, 3);
		this.coinSprite.anims.play(ANIMS.ui.coin, true);

		sceneEvents.on(EVENTS.player.healthChanged, this.handleHealthChange, this);
		sceneEvents.on(EVENTS.player.coinsChanged, this.handleCoinsChanged, this);
		sceneEvents.on(EVENTS.monsterDeath, this.handleMonsterDeath, this);

		this.events.once(
			Phaser.Scenes.Events.SHUTDOWN,
			() => {
				sceneEvents.off(
					EVENTS.player.healthChanged,
					this.handleHealthChange,
					this
				);
				sceneEvents.off(
					EVENTS.player.coinsChanged,
					this.handleCoinsChanged,
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

	/** @param { number } coins */
	handleCoinsChanged(coins) {
		this.coins += coins;
		this.registry.set("coins", this.coins);
		this.coinText.setText(this.coins);
	}

	/** @param { number } xp */
	handleMonsterDeath(xp) {
		this.xp += xp;
		this.registry.set("xp", this.xp);
		this.xpText.setText(`XP ${this.xp}`);
	}
}
