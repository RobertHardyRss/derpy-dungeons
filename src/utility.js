import Phaser, { Physics } from "phaser";
import { DEBUG, IMAGES, INTERACTABLES, MONSTERS } from "./constants";
import { Skeleton } from "./game-objects/monsters/skeleton";
import { BigDemon } from "./game-objects/monsters/big-demon";
import { BigZombie } from "./game-objects/monsters/big-zombie";
import { Muddy } from "./game-objects/monsters/muddy";
import { Slug } from "./game-objects/monsters/slug";
import { Lever } from "./game-objects/interactables/lever";
import { BlueButton } from "./game-objects/interactables/blue-button";
import { RedButton } from "./game-objects/interactables/red-button";
import { FloorSpikes } from "./game-objects/interactables/floor-spikes";

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
export function generateCollidableInteractablesFromMap(map, group) {
	let interactables = map.createFromObjects(
		"interactables",
		[
			{
				name: INTERACTABLES.lever,
				key: IMAGES.sprites,
				classType: Lever,
			},
		],
		false
	);

	interactables.forEach((m) => group.add(m));
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateOverlappableInteractablesFromMap(map, group) {
	let interactables = map.createFromObjects(
		"interactables",
		[
			{
				name: INTERACTABLES.buttonBlue,
				key: IMAGES.sprites,
				classType: BlueButton,
			},
			{
				name: INTERACTABLES.buttonRed,
				key: IMAGES.sprites,
				classType: RedButton,
			},
		],
		false
	);

	interactables.forEach((m) => group.add(m));
}

/**
 * @param {Phaser.Tilemaps.Tilemap } map
 * @param {Phaser.GameObjects.Group } map
 */
export function generateTraps(map, group) {
	let interactables = map.createFromObjects(
		"interactables",
		[
			{
				name: INTERACTABLES.floorSpikes,
				key: IMAGES.sprites,
				classType: FloorSpikes,
			},
		],
		false
	);

	interactables.forEach((m) => group.add(m));
}
