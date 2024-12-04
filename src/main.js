import "./css/style.css";
import Phaser from "phaser";

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
			debug: true,
		},
	},
	scene: [],
});
