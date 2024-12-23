import "./css/style.css";
import Phaser from "phaser";
import { Preloader } from "./scenes/preloader";
import { Level01 } from "./scenes/level-01";
import { DEBUG } from "./constants";
import { GameUi } from "./scenes/game-ui";
import { GameOver } from "./scenes/game-over";

const game = new Phaser.Game({
	width: window.innerWidth,
	height: window.innerHeight,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	autoRound: false,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 },
			debug: DEBUG,
		},
	},
	scene: [Preloader, Level01, GameUi, GameOver],
	render: {
		pixelArt: true,
	},
});
