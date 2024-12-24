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
	let monsters = map.createFromObjects("spawns", [
		{
			name: MONSTERS.skeleton,
			key: IMAGES.sprites,
			classType: Skeleton,
		},
		{
			name: MONSTERS.bigDemon,
			key: IMAGES.sprites,
			classType: BigDemon,
		},
		{
			name: MONSTERS.bigZombie,
			key: IMAGES.sprites,
			classType: BigZombie,
		},
		{
			name: MONSTERS.muddy,
			key: IMAGES.sprites,
			classType: Muddy,
		},
		{
			name: MONSTERS.slug,
			key: IMAGES.sprites,
			classType: Slug,
		},
	]);

	monsters.forEach((m) => group.add(m));
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
