//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";



/**
 * Class representant la scène du jeu comme tel
 */

export class level1 extends Phaser.Scene {


	constructor() {
		super("level1");

        

		// Propriétés du jeu 
		this.leBloc = null; //L'image du bloc
		this.mesBlocs = [];

		//Les flèches du clavier	
		this.lesfleches = null; //Les touches fléchées du clavier

		//Le personnage de dude
		this.dude = null;

		//Variable pour détecter le saut
		this.isJumping = false;

		this.GrilleMontage = new GrilleMontage(this, 3*10*2.5, 2*10*0.5, 0x00008b);
	}

	create() {
		this.GrilleMontage.afficherGrille();

		//Instancier un objet pour détecter les touches FLÉCHÉES du clavier
		this.lesfleches = this.input.keyboard.createCursorKeys();
		let posX = 0;


		//Instancier l'image du bloc comme ENTITÉ PHYSIQUE en bas et au tier de l'écran
		for (let i = 0; i < 75; i++) {
			
			this.leBloc = this.physics.add.image(game.config.width - posX, game.config.height, "bloc");
			this.leBloc.setOrigin(0.5, 0.5);
			
			this.GrilleMontage.placerIndexCellule(450+i, this.leBloc);
			this.GrilleMontage.mettreEchelleProportionMaximale(this.leBloc, 1);
            this.mesBlocs.push(this.leBloc);
		}

		//Créer les animations de dude - marcheGauche et marcheDroite
		this.anims.create({
			key: "marcheGauche",
			frames: this.anims.generateFrameNumbers('dude', {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: "marcheDroite",
			frames: this.anims.generateFrameNumbers('dude', {
				frames: [5, 6, 7, 8]
			}),
			frameRate: 10,
			repeat: -1
		});

		//Instancier dude comme entité physique au 2/3 et en bas de la scène
		//On affiche l'image au repos
		this.dude = this.physics.add.sprite(game.config.width * 2 / 3, game.config.height/2, "dude", 4);
		this.dude.setOrigin(0.5, 1);
        


		//dude peut sortir des limites du jeu
		//this.dude.setCollideWorldBounds(true);
		this.leBloc.setCollideWorldBounds(true);

		//Le bloc reste immobile lors des collisions

		//Détection des collisions entre dude et le bloc
        this.mesBlocs.forEach(bloc => {

            this.physics.add.collider(this.dude,bloc,this.test);
            bloc.setImmovable(true);
            
        });
		
		this.physics.world.checkCollision.down = true;

        this.cameras.main.startFollow(this.dude);
        //this.cameras.main.followOffset =

	}

	checkIsGrounded(){
		
		console.log("AuSol");
	}

	update() {

		//Si aucune touche fléchée n'est enfoncée
		//dude reste immobile		

		if (this.lesfleches.right.isDown) {
			this.dude.setVelocityX(300);
			this.dude.anims.play("marcheDroite", true);
		} else if (this.lesfleches.left.isDown) {
			this.dude.setVelocityX(-300);
			this.dude.anims.play("marcheGauche", true);
		} else {
			this.dude.anims.stop();
			this.dude.setFrame(4);

			this.dude.setVelocityX(0);
		}

		if (this.lesfleches.up.isDown && this.dude.body.touching.down) {
			console.log("Appuyé sur la fleche du haut");
            this.dude.setVelocityY(-500);
		}
		
		
		this.dude.setGravityY(1000);
	}
}