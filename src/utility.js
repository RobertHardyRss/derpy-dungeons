import Phaser, { Physics } from "phaser";
import { DEBUG, IMAGES, MONSTERS } from "./constants";
import { Skeleton } from "./game-objects/monsters/skeleton";
import { BigDemon } from "./game-objects/monsters/big-demon";
import { BigZombie } from "./game-objects/monsters/big-zombie";
import { Muddy } from "./game-objects/monsters/muddy";
import { Slug } from "./game-objects/monsters/slug";

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
