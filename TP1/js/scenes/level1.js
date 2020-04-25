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

        

        //Arrays
        this.mesBlocs = [];

        //Les flèches du clavier	
        this.lesfleches = null; //Les touches fléchées du clavier

        //GameObjects
        this.dude = null;
        this.blocLave = null;
        this.leBloc = null; //L'image du bloc

        //Variable pour détecter le saut
        this.isJumping = false;
        // 3*10*2.5
        this.GrilleMontage = new GrilleMontage(this, 100, 10, 0x00008b);
    }

    create() {
       // this.GrilleMontage.afficherGrille();



        //Instancier un objet pour détecter les touches FLÉCHÉES du clavier
        this.lesfleches = this.input.keyboard.createCursorKeys();


        let sol = this.physics.add.group();

        //Instancier l'image du bloc comme ENTITÉ PHYSIQUE en bas et au tier de l'écran
        for (let i = 0; i < 100; i++) {

            this.leBloc = sol.create(0, 0, "bloc");
            this.leBloc.setOrigin(0.5, 0.5);

            this.GrilleMontage.placerIndexCellule(500 + i, this.leBloc);
            this.GrilleMontage.mettreEchelleProportionMaximale(this.leBloc, 1);
            this.mesBlocs.push(this.leBloc);
        }

        this.lavaBlocks = this.physics.add.group();

        //Instancier mur de lave
        for (let i = 0; i < 10; i++) {

            this.blocLave = this.lavaBlocks.create(0, 0, "lava");

            this.GrilleMontage.placerColonneLigne(1, i + 1, this.blocLave);
            this.GrilleMontage.mettreEchelleProportionMaximale(this.blocLave, 1);

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
        this.dude = this.physics.add.sprite(game.config.width * 2 / 3, game.config.height / 2, "dude", 4);
        this.dude.setOrigin(0.5, 1);



        //Détection des collisions entre dude et le bloc
        sol.getChildren().forEach(bloc => {

            this.physics.add.collider(this.dude, bloc, this.test);
            bloc.setImmovable(true);

        });

        //Detection de type trigger avec le joueur et le mur de lave
        this.lavaBlocks.getChildren().forEach(bloc => {

            this.physics.add.overlap(bloc, this.dude, this.collisionMurLave, null, this);

        });


        //Caméra suivant le joueur avec contraintes
        this.cameras.main.startFollow(this.dude);
        this.cameras.main.setBounds(0, -500, 7000, 2500);

        this.cameras.main.setScene(this);



    }

    collisionMurLave() {
        console.log("player touched lava wall");
        game.properties.gameOver = true;
        this.dude.destroy();
        
    }

    loadScene(){
    
        this.scene.start("level1");
        //Petit probleme avec le reload, pour etre sur qu'il se fasse après, je l'ai fait ici
        setTimeout(function f() {game.properties.gameOver = false;},1);
    
    }


    update() {
        console.log(game.properties.gameOver);

        if (game.properties.gameOver == false) {

            //Si aucune touche fléchée n'est enfoncée dude reste immobile		
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
        else{
            
            //setTimeout(this.loadScene,2000);
            //Delai avant que le scene reload
            this.time.addEvent(
                {
                    delay: 0,
                    callback: this.loadScene,
                    callbackScope: this
                }

            );
            
        }

       

        //Le mur de lave avance et poursuit le joueur tout au long du niveau
        this.lavaBlocks.setVelocityX(200);



    }
}