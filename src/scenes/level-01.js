import Phaser from "phaser";
import { IMAGES, SCENES } from "../constants";
import { Player } from "../game-objects/player";
import { debugCollisions } from "../utility";

export class Level01 extends Phaser.Scene {
	constructor() {
		super({ key: SCENES.level01 });
	}

	preload() {
		this.load.tilemapTiledJSON("level-01", "/tilemaps/level-01.json");
	}

	create() {
		const map = this.make.tilemap({
			key: "level-01",
			tileHeight: 16,
			tileWidth: 16,
		});

		const floorTiles = map.addTilesetImage("floors", IMAGES.floor);
		const floorLayer = map.createLayer("floor", floorTiles);

		const wallTiles = map.addTilesetImage("low-walls", IMAGES.walls);
		const wallLayer = map.createLayer("wall", wallTiles);

		wallLayer.setCollisionByProperty({ collides: true });
		debugCollisions(this, wallLayer);

		const decorTiles = map.addTilesetImage("high-walls", IMAGES.decor);
		const decorLayer = map.createLayer("decor", decorTiles);

		this.player = new Player(this, 50, 50);

		this.physics.add.collider(this.player, wallLayer);

		//this.cameras.main.setOrigin(50, 50);
		this.cameras.main.zoom = 3;
		this.cameras.main.startFollow(this.player);
	}

	update() {
		this.player.update();
	}
}
