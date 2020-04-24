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
        this.load.setPath("medias/tiles/");

		//L'image du bloc
        this.load.image("bloc");
        
        this.load.setPath("medias/spritesheet");

		//La feuille de sprite de Dude
		this.load.spritesheet("dude", "dude.png", {
			frameWidth: 48,
			frameHeight: 64
		});
	}

	create() {
		this.scene.start("level1");
	}
}