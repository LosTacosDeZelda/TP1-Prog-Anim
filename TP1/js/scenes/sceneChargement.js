/**
 * Classe qui charge les médias
 * @extends Phaser.Scene
 */

export class sceneChargement extends Phaser.Scene {

	constructor() {
		super("sceneChargement");
	}

	preload() {

		//Charger le plugin pour le joystic virtuel
		let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
		this.load.plugin('rexvirtualjoystickplugin', url, true);

		//this.load.plugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',true);
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        //Charger l'image du jeu
        this.load.setPath("medias/");

		//L'image des blocs
        this.load.image("bloc","tilesets/bloc.png");
		this.load.image("lava","tilesets/lava.png");
		
		//UI
		this.load.image("joystickExt","UI/Analog-Disc-Field@2x.png");
		this.load.image("joystickInt","UI/Aqua-Analog-Pad@2x.png");

		//Effets sonores
		this.load.audio("sonSaut","sons/jump.wav");
		
        
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
		});

		this.load.spritesheet("jumpButton","greenButtonsheet.png",{
			frameWidth: 60,
			frameHeight: 40
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