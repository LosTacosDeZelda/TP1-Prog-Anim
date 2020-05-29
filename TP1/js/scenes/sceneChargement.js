/**
 * @author 
 * Classe qui charge les médias
 * @extends Phaser.Scene
 */

export class SceneChargement extends Phaser.Scene {

	constructor() {
		super("SceneChargement");

		this.nbProgression;
		this.cercleProgression;
		this.txtProgression;
	}
	
	preload() {

		//Creation du cercle qui montre la progression du chargement du jeu
		this.cercleProgression = this.add.graphics();

		this.txtProgression = this.add.text(screen.width/3.1,screen.height/4,"0",{fontSize: 60, color:"#000000"});

		//Charger le plugin pour le joystick virtuel
		let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
		this.load.plugin('rexvirtualjoystickplugin', url, true);

		
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');

        
		this.load.setPath("medias/");
		
		// Menu
		this.load.image("menuBG", "img/menus/menu_jeuBG.png");
		this.load.image("menuPerso", "img/menus/menu_jeuPerso.png");
		this.load.image("telephoneRotation", "img/menus/rotation.png");
		this.load.image("aideJeu_Ordi", "img/menus/aideJeu_Ordi.jpg");
		this.load.image("aideJeu_Mobile", "img/menus/aideJeu_Mobile.jpg");
		this.load.image("aideJeu_BG", "img/menus/aideJeu_BG.jpg");

		// UI
		this.load.image("joystickExt","UI/Analog-Disc-Field@2x.png");
		this.load.image("joystickInt","UI/Aqua-Analog-Pad@2x.png");

		// Effets sonores
		this.load.audio("sonSaut",["sons/jump.wav","sons/jump.ogg","sons/jump.mp3"]);
		this.load.audio("sonEtoile",["sons/starPickup.wav"]);
		this.load.audio("sonMort",["sons/dyingInLava.wav"]);

		//Theme Chiptune
		this.load.audio("themePrincipal",["sons/TribalTheme.wav","sons/TribalTheme.ogg","sons/TribalTheme.mp3"]);
	
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
		this.load.tilemapTiledJSON("lvl1","maps/niveau1Tilemap.json");
		this.load.tilemapTiledJSON("lvl2","maps/niveau2Tilemap.json");

		// Tilesets
		this.load.image("templeSet","img/tilesets/tile_temple-extruded.png");
		this.load.image("customSet","img/tilesets/customAssets-extruded.png");

		//Mur de lave
		this.load.image("murLave","img/tilesets/murDeLave.png");


		// Charger les polices bitmap
		this.load.bitmapFont("SF-Fedora","fonte/sf_fedora/bitmapFedora/font.png","fonte/sf_fedora/bitmapFedora/font.fnt");
		this.load.bitmapFont("VCR","fonte/vcr_osd/font.png","fonte/vcr_osd/font.fnt");

		this.load.on("progress",this.progressionChargement,this);

		

	}

	progressionChargement(pourcentage){
		// console.log(pourcentage * 360);

		this.cercleProgression.beginPath();

		this.cercleProgression.fillStyle(0xfafe50);

		this.cercleProgression.arc(screen.width/3,200,100,Phaser.Math.DegToRad(270),Phaser.Math.DegToRad((pourcentage * 360)+270),false);
		
		this.cercleProgression.lineTo(screen.width/3,200);

		this.cercleProgression.fill();

		this.txtProgression.text = Math.round(pourcentage * 100) + "%";
	}

	create() {
		
		this.scene.start("Menu");
	}

}