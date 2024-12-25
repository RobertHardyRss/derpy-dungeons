export const DEBUG = true;
export const DEBUG_DISABLE_MONSTER_MOVEMENT = true;

export const PLAYER_DAMAGE_COOLDOWN = 250;

export const SCENES = {
	preloader: "preloader",
	gameUi: "game-ui",
	gameOver: "game-over",
	levelDemo: "level-demo",
	level01: "level-01",
	level02: "level-02",
};

export const IMAGES = {
	floor: "floor",
	walls: "walls",
	decor: "decor",
	sprites: "sprites",
};

export const ANIMS = {
	player: {
		idle: "player-idle",
		run: "player-run",
		hit: "player-hit",
		dead: "player-dead",
	},
	ui: {
		healthFull: "ui_heart_full.png",
		healthHalf: "ui_heart_half.png",
		healthEmpty: "ui_heart_empty.png",
		coin: "coin-spin",
	},
	chest: {
		closed: "chest-closed",
		open: "chest-open",
	},
	floorSpikes: {
		up: "floor_spikes-up",
		down: "floor_spikes_down",
	},
	fountains: {
		blue: {
			basin: "fountain-blue-base",
			middle: "fountain-blue-middle",
		},
		red: {
			basin: "fountain-red-base",
			middle: "fountain-red-middle",
		},
		top: {},
	},
};

export const MONSTERS = {
	angel: "angel",
	bigDemon: "big_demon",
	bigZombie: "big_zombie",
	chort: "chort",
	plagueDoctor: "doc",
	goblin: "goblin",
	iceZombie: "ice_zombie",
	imp: "imp",
	maskedOrc: "masked_orc",
	muddy: "muddy",
	necromancer: "necromancer",
	ogre: "ogre",
	orcShaman: "orc_shaman",
	orcWarrior: "orc_warrior",
	pumpkinDude: "pumpkin_dude",
	skeleton: "skeleton",
	slug: "slug",
	swampy: "swampy",
	tinySlug: "tiny_slug",
	tinyZombie: "tiny_zombie",
	wogol: "wogol",
	zombie: "zombie",
};

export const WEAPONS = {
	axe: "weapon_axe.png",
};

export const ITEMS = {
	floorSpikes: "floor_spikes",
	lever: "lever",
	chest: "chest",
	buttonBlue: "button_blue",
	buttonRed: "button_red",
	door: "door",
	flask: "flask",
	flaskBig: "flask_big",
	stairs: "stairs",
};

export const AUDIO = {
	chest: "chest",
	lever: "lever",
	button: "button",
	doorOpen: "door-open",
	doorClose: "door-close",
	playerDamage: [
		"player-damage-1",
		"player-damage-2",
		"player-damage-3",
		"player-damage-4",
		"player-damage-5",
		"player-damage-6",
	],
	playerDeath: "player-death",
	playerWalk: ["player-walk-1", "player-walk-2", "player-walk-3"],
	playerAttackHit: "player-attack-hit",
	playerAttackMiss: "player-attack-miss",
	monsterDamage: ["monster-damage-1", "monster-damage-2", "monster-damage-3"],
	monsterDeath: "monster-death",
	music: "music",
	gameOver: "game-over",
	heal: "heal",
};

export const REG_KEYS = {
	coins: "coins",
	xp: "xp",
	hp: "hp",
};
