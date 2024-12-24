//@ts-check
import Phaser from "phaser";
import { ANIMS, IMAGES, REG_KEYS, SCENES } from "../constants";
import { gameEvents, EVENTS } from "../events/event-center";

export class GameUi extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.gameUi });
		console.log("GameUi constructor");

		this.coins = 0;
		this.xp = 0;
		this.hp = 0;

		/** @type {Phaser.GameObjects.Group} */ //@ts-ignore
		this.hearts;
	}

	init() {
		console.log("GameUi init");
		this.initUiValues();

		gameEvents.on(EVENTS.player.healthChanged, this.handleHealthChange, this);
		gameEvents.on(EVENTS.player.coinsChanged, this.handleCoinsChanged, this);
		gameEvents.on(EVENTS.monsterDeath, this.handleMonsterDeath, this);

		this.events.once(
			Phaser.Scenes.Events.SHUTDOWN,
			() => {
				gameEvents.off(
					EVENTS.player.healthChanged,
					this.handleHealthChange,
					this
				);
				gameEvents.off(
					EVENTS.player.coinsChanged,
					this.handleCoinsChanged,
					this
				);
				gameEvents.off(EVENTS.monsterDeath, this.handleMonsterDeath, this);
			},
			this
		);

		this.events.on(Phaser.Scenes.Events.WAKE, this.initUiValues, this);
	}

	create() {
		console.log("GameUi create");
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
	}

	/** Sets up local properties for the UI by reading from the registry */
	initUiValues() {
		this.coins = this.registry.get(REG_KEYS.coins);
		this.xp = this.registry.get(REG_KEYS.xp);
		this.hp = this.registry.get(REG_KEYS.hp);
	}

	/** @param { number } playerHealth*/
	handleHealthChange(playerHealth) {
		this.registry.set(REG_KEYS.hp, playerHealth);
		this.hp = playerHealth;
		this.updateHealthDisplay();
	}

	updateHealthDisplay() {
		this.hearts.children.each((heart, i) => {
			// we should have 5 hearts, which means each heart represents
			// 20 points of health. Figure out which heart we are on and if it should be
			// empty, half or full

			let emptyValue = i * 20;
			let halfValue = emptyValue + 10;

			if (this.hp <= emptyValue) {
				heart.setFrame(ANIMS.ui.healthEmpty);
			} else if (this.hp <= halfValue) {
				heart.setFrame(ANIMS.ui.healthHalf);
			} else {
				heart.setFrame(ANIMS.ui.healthFull);
			}
		});
	}

	/** @param { number } coins */
	handleCoinsChanged(coins) {
		this.coins += coins;
		this.registry.set(REG_KEYS.coins, this.coins);
		this.coinText?.setText(this.coins.toString());
	}

	/** @param { number } xp */
	handleMonsterDeath(xp) {
		this.xp += xp;
		this.registry.set(REG_KEYS.xp, this.xp);
		this.xpText?.setText(`XP ${this.xp}`);
	}
}
