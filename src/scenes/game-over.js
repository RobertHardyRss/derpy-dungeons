import Phaser from "phaser";
import { AUDIO, IMAGES, REG_KEYS, SCENES } from "../constants";
import { resetRegistry } from "../utility";

export class GameOver extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.gameOver });
		console.log("GameOver constructor");
		this.xp;
		this.coins;
		this.score;

		this.width;
		this.centerWidth;
		this.height;
		this.centerHeight;

		this.enterKey;
	}

	init() {
		console.log("GameOver init");
		this.scene.sleep(SCENES.gameUi);

		this.xp = this.registry.get(REG_KEYS.xp);
		this.coins = this.registry.get(REG_KEYS.coins);
		this.score = this.xp * 3 + this.coins * 2;

		this.width = window.innerWidth;
		this.centerWidth = this.width / 2;
		this.height = window.innerHeight;
		this.centerHeight = this.height / 2;

		this.enterKey = this.input.keyboard.on(
			"keydown-ENTER",
			this.startGame,
			this
		);
	}

	create() {
		console.log("GameOver create");
		this.sound.play(AUDIO.gameOver, { loop: true, volume: 0.5 });

		const skull = this.add.sprite(
			this.centerWidth,
			this.centerHeight - 75,
			IMAGES.sprites,
			"skull.png"
		);
		skull.setOrigin(0.5);
		skull.setScale(50, 50);

		this.showLine(`TOTAL XP: ${this.xp}    TOTAL GOLD: ${this.coins}`, 50, 20);
		this.showLine(`FINAL SCORE: ${this.score}`, 90, 30);

		this.showLine("GAME OVER!", this.centerHeight, 60);
		this.showLine("Press ENTER to restart", this.height - 50, 15);
	}

	showLine(text, y, size) {
		const line = this.add
			.bitmapText(this.centerWidth, y, "arcade", text, size)
			.setOrigin(0.5) // place from center
			.setAlpha(0); // make transparent

		this.tweens.add({
			targets: line,
			duration: 2000,
			alpha: { from: 0, to: 1 },
			repeat: 0,
		});
	}

	startGame() {
		resetRegistry(this);
		this.sound.stopAll();
		this.scene.wake(SCENES.gameUi);
		this.scene.start(SCENES.level01);
	}
}
