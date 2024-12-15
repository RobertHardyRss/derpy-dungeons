export const DEBUG = true;

export const SCENES = {
	preloader: "preloader",
	ui: "game-ui",
	gameOver: "game-over",
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

// must match the firstgid property of the creatures tileset
const CREATURES_FIRST_GID = 290;

export const GIDS = {
	angel: 1 + CREATURES_FIRST_GID,
	bigDemon: 2 + CREATURES_FIRST_GID,
	bigZombie: 3 + CREATURES_FIRST_GID,
	chort: 8 + CREATURES_FIRST_GID,
	plagueDoctor: 11 + CREATURES_FIRST_GID,
	goblin: 24 + CREATURES_FIRST_GID,
	iceZombie: 26 + CREATURES_FIRST_GID,
	imp: 27 + CREATURES_FIRST_GID,
	maskedOrc: 31 + CREATURES_FIRST_GID,
	muddy: 32 + CREATURES_FIRST_GID,
	necromancer: 33 + CREATURES_FIRST_GID,
	ogre: 34 + CREATURES_FIRST_GID,
	orcShaman: 35 + CREATURES_FIRST_GID,
	orcWarrior: 36 + CREATURES_FIRST_GID,
	pumpkinDude: 37 + CREATURES_FIRST_GID,
	skeleton: 38 + CREATURES_FIRST_GID,
	slug: 40 + CREATURES_FIRST_GID,
	swampy: 41 + CREATURES_FIRST_GID,
	tinySlug: 42 + CREATURES_FIRST_GID,
	tinyZombie: 43 + CREATURES_FIRST_GID,
	wogol: 73 + CREATURES_FIRST_GID,
	zombie: 74 + CREATURES_FIRST_GID,
};
