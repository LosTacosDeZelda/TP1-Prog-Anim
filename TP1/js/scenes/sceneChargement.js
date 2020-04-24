/**
 * Classe qui charge les médias
 * @extends Phaser.Scene
 */

export class sceneChargement extends Phaser.Scene {

	constructor() {
		super("SceneChargement");
	}

	preload() {
		//Charger l'image du jeu

		//L'image du bloc
		this.load.image("medias/tiles/bloc");

		//La feuille de sprite de Dude
		this.load.spritesheet("dude", "medias/spritesheet/dude.png", {
			frameWidth: 48,
			frameHeight: 64
		});
	}

	create() {
		this.scene.start("level1");
	}
}