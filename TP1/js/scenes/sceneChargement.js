/**
 * @author 
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

		
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        
		this.load.setPath("medias/");
		
		// Menu
		this.load.image("menuBG", "img/menus/menu_jeuBG.jpg");
		this.load.image("menuPerso", "img/menus/menu_jeuPerso.png");

		// Lave                                                                                      
		this.load.image("lava","img/tilesets/lava.png");                                                                                                                                                                 
		
		// UI
		this.load.image("joystickExt","UI/Analog-Disc-Field@2x.png");
		this.load.image("joystickInt","UI/Aqua-Analog-Pad@2x.png");

		// Effets sonores (ne pas oublier d'importer les sons en mp3 et ogg... la prof qui gosse)
		this.load.audio("sonSaut","sons/jump.wav");

		//Theme Chiptune
		this.load.audio("themePrincipal","sons/TribalTheme.wav");
	
        this.load.setPath("medias/img/spritesheet");

		// Les feuilles de sprites du voyageur
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

		this.load.spritesheet("mortOuEnVie","sheetDeadAlive.png",{
			frameWidth: 340,
			frameHeight: 360
		})

		//Spritesheet du UI

		this.load.spritesheet("jumpButton","greenButtonsheet.png",{
			frameWidth: 240,
			frameHeight: 160
		});

		this.load.spritesheet("menuButton","blueButtonSheet.png",{
			frameWidth: 248,
			frameHeight: 256
		});

		this.load.spritesheet("boutonReessayer","redButtonSheet.png",{
			frameWidth:256,
			frameHeight:256
		});

		this.load.setPath("medias/");

		// Fichier JSON du tilemap
		this.load.tilemapTiledJSON("lvl1","maps/TP1_tilemap3.json");

		// Tilesets
		this.load.image("templeSet","img/tilesets/tile_temple.png");
		this.load.image("customSet","img/tilesets/customAssets.png");


		// Charger les polices bitmap
		this.load.bitmapFont("SF-Fedora","fonte/sf_fedora/bitmapFedora/font.png","fonte/sf_fedora/bitmapFedora/font.fnt");
		this.load.bitmapFont("VCR","fonte/vcr_osd/font.png","fonte/vcr_osd/font.fnt");

		this.load.on("progress",this.progressionChargement,this);

	}

	progressionChargement(pourcentage){
		console.log(pourcentage);
	}

	create() {
		this.scene.start("Menu");
	}
}