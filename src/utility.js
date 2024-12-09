import Phaser from "phaser";
import { DEBUG } from "./constants";

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
