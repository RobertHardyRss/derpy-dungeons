import Phaser from "phaser";
import { DEBUG, IMAGES, ITEMS, MONSTERS, REG_KEYS } from "./constants";
import { Skeleton } from "./game-objects/monsters/skeleton";
import { BigDemon } from "./game-objects/monsters/big-demon";
import { BigZombie } from "./game-objects/monsters/big-zombie";
import { Muddy } from "./game-objects/monsters/muddy";
import { Slug } from "./game-objects/monsters/slug";
import { Lever } from "./game-objects/items/lever";
import { BlueButton } from "./game-objects/items/blue-button";
import { RedButton } from "./game-objects/items/red-button";
import { FloorSpikes } from "./game-objects/items/floor-spikes";
import { Chest } from "./game-objects/items/chest";
import { Door } from "./game-objects/items/door";
import {
	LargeHealthPotion,
	SmallHealthPotion,
} from "./game-objects/items/health-potion";
import { Stairs } from "./game-objects/items/stairs";
import { IceZombie } from "./game-objects/monsters/ice-zombie";
import { Necromancer } from "./game-objects/monsters/necromancer";
import { Swampy } from "./game-objects/monsters/swampy";
import { TinySlug } from "./game-objects/monsters/tiny-slug";
import { Zombie } from "./game-objects/monsters/zombie";
import { Ogre } from "./game-objects/monsters/ogre";
import { OrcWarrior } from "./game-objects/monsters/orc-warrior";
import { OrcShaman } from "./game-objects/monsters/orc-shaman";
import { MaskedOrc } from "./game-objects/monsters/masked-orc";
import { Goblin } from "./game-objects/monsters/goblin";
import { TinyZombie } from "./game-objects/monsters/tiny-zombie";
import { Imp } from "./game-objects/monsters/imp";
import { Wogol } from "./game-objects/monsters/wogol";
import { Chort } from "./game-objects/monsters/chort";
import { Angel } from "./game-objects/monsters/angel";
import { PumpkinDude } from "./game-objects/monsters/pumpkin-dude";
import { PlagueDoctor } from "./game-objects/monsters/plague-doctor";

/** @param {Phaser.Scene} scene */
/** @param {Phaser.Tilemaps.TilemapLayer} layer */
export function debugCollisions(scene, layer) {
	if (!DEBUG) {
		return;
	}

	const debugGraphics = scene.add.graphics().setAlpha(0.75);
	layer.renderDebug(debugGraphics, {
		tileColor: null,
		collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
		faceColor: new Phaser.Display.Color(40, 39, 37, 255),
	});
}

/**
 * Resets registry values to starting state for the game
 * @param {Phaser.Scene} scene
 *  */
export function resetRegistry(scene) {
	scene.registry.set(REG_KEYS.coins, 0);
	scene.registry.set(REG_KEYS.xp, 0);
	scene.registry.set(REG_KEYS.hp, 100);
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function getPlayerStart(map) {
	/** @type {Phaser.Tilemaps.ObjectLayer } */
	let ol = map.getObjectLayer("spawns");
	let start = ol.objects.filter((o) => o.name === "player_start")[0];
	//console.log(start);
	return new Phaser.Math.Vector2(
		start.x + start.width / 2,
		start.y - start.height / 2
	);
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateMonstersFromMap(map, group) {
	const imgFull = "_idle_anim_f0.png";
	const imgBasic = "_anim_f0.png";

	let monsters = map.createFromObjects(
		"spawns",
		[
			{
				name: MONSTERS.skeleton,
				key: IMAGES.sprites,
				classType: Skeleton,
				key: `${MONSTERS.skeleton}${imgFull}`,
			},
			{
				name: MONSTERS.bigDemon,
				key: IMAGES.sprites,
				classType: BigDemon,
				key: `${MONSTERS.bigDemon}${imgFull}`,
			},
			{
				name: MONSTERS.bigZombie,
				key: IMAGES.sprites,
				classType: BigZombie,
				key: `${MONSTERS.bigZombie}${imgFull}`,
			},
			{
				name: MONSTERS.muddy,
				key: IMAGES.sprites,
				classType: Muddy,
				key: `${MONSTERS.muddy}${imgBasic}`,
			},
			{
				name: MONSTERS.slug,
				key: IMAGES.sprites,
				classType: Slug,
				key: `${MONSTERS.slug}${imgBasic}`,
			},
			{
				name: MONSTERS.iceZombie,
				key: IMAGES.sprites,
				classType: IceZombie,
				key: `${MONSTERS.iceZombie}${imgBasic}`,
			},
			{
				name: MONSTERS.necromancer,
				key: IMAGES.sprites,
				classType: Necromancer,
				key: `${MONSTERS.necromancer}${imgBasic}`,
			},
			{
				name: MONSTERS.swampy,
				key: IMAGES.sprites,
				classType: Swampy,
				key: `${MONSTERS.swampy}${imgBasic}`,
			},
			{
				name: MONSTERS.tinySlug,
				key: IMAGES.sprites,
				classType: TinySlug,
				key: `${MONSTERS.tinySlug}${imgBasic}`,
			},
			{
				name: MONSTERS.zombie,
				key: IMAGES.sprites,
				classType: Zombie,
				key: `${MONSTERS.zombie}${imgBasic}`,
			},
			{
				name: MONSTERS.ogre,
				key: IMAGES.sprites,
				classType: Ogre,
				key: `${MONSTERS.ogre}${imgFull}`,
			},
			{
				name: MONSTERS.orcWarrior,
				key: IMAGES.sprites,
				classType: OrcWarrior,
				key: `${MONSTERS.orcWarrior}${imgFull}`,
			},
			{
				name: MONSTERS.orcShaman,
				key: IMAGES.sprites,
				classType: OrcShaman,
				key: `${MONSTERS.orcShaman}${imgFull}`,
			},
			{
				name: MONSTERS.maskedOrc,
				key: IMAGES.sprites,
				classType: MaskedOrc,
				key: `${MONSTERS.maskedOrc}${imgFull}`,
			},
			{
				name: MONSTERS.goblin,
				key: IMAGES.sprites,
				classType: Goblin,
				key: `${MONSTERS.goblin}${imgFull}`,
			},
			{
				name: MONSTERS.tinyZombie,
				key: IMAGES.sprites,
				classType: TinyZombie,
				key: `${MONSTERS.tinyZombie}${imgFull}`,
			},
			{
				name: MONSTERS.imp,
				key: IMAGES.sprites,
				classType: Imp,
				key: `${MONSTERS.imp}${imgFull}`,
			},
			{
				name: MONSTERS.wogol,
				key: IMAGES.sprites,
				classType: Wogol,
				key: `${MONSTERS.wogol}${imgFull}`,
			},
			{
				name: MONSTERS.chort,
				key: IMAGES.sprites,
				classType: Chort,
				key: `${MONSTERS.chort}${imgFull}`,
			},
			{
				name: MONSTERS.angel,
				key: IMAGES.sprites,
				classType: Angel,
				key: `${MONSTERS.angel}${imgFull}`,
			},
			{
				name: MONSTERS.pumpkinDude,
				key: IMAGES.sprites,
				classType: PumpkinDude,
				key: `${MONSTERS.pumpkinDude}${imgFull}`,
			},
			{
				name: MONSTERS.plagueDoctor,
				key: IMAGES.sprites,
				classType: PlagueDoctor,
				key: `${MONSTERS.plagueDoctor}${imgFull}`,
			},
		],
		false
	);

	monsters.forEach((m) => {
		// set scale back to 1 for all objects
		m.setScale(1);
		group.add(m);
	});
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateCollideItemsFromMap(map, group) {
	let items = map.createFromObjects(
		"items",
		[
			{
				name: ITEMS.lever,
				key: IMAGES.sprites,
				frame: "lever_left.png",
				classType: Lever,
			},
			{
				name: ITEMS.chest,
				key: IMAGES.sprites,
				frame: "chest_empty_open_anim_f0.png",
				classType: Chest,
			},
		],
		false
	);

	items.forEach((m) => group.add(m));
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateOverlapItemsFromMap(map, group) {
	let items = map.createFromObjects(
		"items",
		[
			{
				name: ITEMS.buttonBlue,
				key: IMAGES.sprites,
				frame: "button_blue_up.png",
				classType: BlueButton,
			},
			{
				name: ITEMS.buttonRed,
				key: IMAGES.sprites,
				frame: "button_red_up.png",
				classType: RedButton,
			},
			{
				name: ITEMS.stairs,
				key: IMAGES.sprites,
				frame: "floor_stairs.png",
				classType: Stairs,
			},
		],
		false
	);

	items.forEach((m) => group.add(m));
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateTraps(map, group) {
	let traps = map.createFromObjects(
		"items",
		[
			{
				name: ITEMS.floorSpikes,
				key: IMAGES.sprites,
				classType: FloorSpikes,
			},
		],
		false
	);

	traps.forEach((m) => group.add(m));
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateDoors(map, group) {
	let doors = map.createFromObjects(
		"items",
		[
			{
				name: ITEMS.door,
				key: IMAGES.sprites,
				classType: Door,
				frame: "doors_leaf_closed.png",
			},
		],
		false
	);

	doors.forEach((m) => group.add(m));
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generatePotions(map, group) {
	let potions = map.createFromObjects(
		"items",
		[
			{
				name: ITEMS.flask,
				key: IMAGES.sprites,
				classType: SmallHealthPotion,
				frame: "flask_red.png",
			},
			{
				name: ITEMS.flaskBig,
				key: IMAGES.sprites,
				classType: LargeHealthPotion,
				frame: "flask_big_red.png",
			},
		],
		false
	);

	potions.forEach((m) => group.add(m));
}
