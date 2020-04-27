/**
 * Classe qui charge les médias
 * @extends Phaser.Scene
 */

export class sceneChargement extends Phaser.Scene {

	constructor() {
		super("sceneChargement");
	}

	preload() {
        //Charger l'image du jeu
        this.load.setPath("medias/");

		//L'image des blocs
        this.load.image("bloc","tilesets/bloc.png");
        this.load.image("lava","tilesets/lava.png");
        
        this.load.setPath("medias/spritesheet");

		//La feuille de sprite de Dude
		this.load.spritesheet("dude", "dude.png", {
			frameWidth: 48,
			frameHeight: 64
		});

		//Fichier JSON du tilemap
		this.load.tilemapTiledJSON("lvl1","../maps/TP1_tilemap3.json");

		//Tilesets
		this.load.image("templeSet","../tilesets/tile_temple.png");
		this.load.image("customSet","../tilesets/customAssets.png");
	}

	create() {
		this.scene.start("level1");
	}
}