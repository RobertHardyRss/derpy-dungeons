import "./css/style.css";
import Phaser from "phaser";
import { Preloader } from "./scenes/preloader";
import { Level01 } from "./scenes/level-01";
import { Level02 } from "./scenes/level-02";
import { DEBUG } from "./constants";
import { GameUi } from "./scenes/game-ui";
import { GameOver } from "./scenes/game-over";
import { LevelDemo } from "./scenes/level-demo";

const game = new Phaser.Game({
	width: window.innerWidth,
	height: window.innerHeight,
	autoRound: false,
	physics: {
		default: "arcade",
		arcade: {
			gravity: { x: 0, y: 0 },
			debug: DEBUG,
		},
	},
	scene: [Preloader, LevelDemo, Level01, Level02, GameUi, GameOver],
	render: {
		pixelArt: true,
	},
});
