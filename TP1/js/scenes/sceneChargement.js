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

		//Les feuilles de sprites du traveler
		this.load.spritesheet("travelerRun", "travelerRun.png", {
			frameWidth: 64,
			frameHeight: 64
		});

		this.load.spritesheet("travelerIdle", "travelerIdle.png",{
			frameWidth: 64,
			frameHeight: 64
		});

		this.load.spritesheet("travelerJump", "travelerJump.png",{
			frameWidth: 64,
			frameHeight: 64
		});

		this.load.spritesheet("travelerLand","travelerLand.png",{
			frameWidth:64,
			frameHeight:64
		})

		//this.load.image("travelerRun","spr_m_traveler_run_anim.gif")

		//Fichier JSON du tilemap
		this.load.tilemapTiledJSON("lvl1","../maps/TP1_tilemap4.json");

		//Tilesets
		this.load.image("templeSet","../tilesets/tile_temple.png");
		this.load.image("customSet","../tilesets/customAssets.png");
	}

	create() {
		this.scene.start("level1");
	}
}