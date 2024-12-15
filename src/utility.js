import Phaser from "phaser";
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

/** @param {Phaser.Tilemaps.Tilemap } map */
export function generateMonstersFromMap(map) {
	return map.createFromObjects("spawns", [
		{
			name: MONSTERS.skeleton,
			key: IMAGES.sprites,
			frame: `${MONSTERS.skeleton}_idle_anim_f0.png`,
			classType: Skeleton,
		},
		{
			name: MONSTERS.bigDemon,
			key: IMAGES.sprites,
			frame: `${MONSTERS.bigDemon}_idle_anim_f0.png`,
			classType: BigDemon,
		},
		{
			name: MONSTERS.bigZombie,
			key: IMAGES.sprites,
			frame: `${MONSTERS.bigZombie}_idle_anim_f0.png`,
			classType: BigZombie,
		},
		{
			name: MONSTERS.muddy,
			key: IMAGES.sprites,
			frame: `${MONSTERS.muddy}_anim_f0.png`,
			classType: Muddy,
		},
		{
			name: MONSTERS.slug,
			key: IMAGES.sprites,
			frame: `${MONSTERS.slug}_anim_f0.png`,
			classType: Slug,
		},
	]);
}
