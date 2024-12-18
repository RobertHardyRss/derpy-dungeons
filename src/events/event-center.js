import Phaser from "phaser";

export const sceneEvents = new Phaser.Events.EventEmitter();

export const EVENTS = {
	player: {
		healthChanged: "dd-player-health-changed",
		xpChanged: "dd-player-xp-changed",
		coinsChanged: "dd-player-coins-changed",
	},
	monsterDeath: "dd-monster-death",
	switchActivated: "dd-switch-activated",
};
