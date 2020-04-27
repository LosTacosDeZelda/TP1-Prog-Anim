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
        this.auSol = false;
        
        this.posX = 0;

        this.GrilleMontage = new GrilleMontage(this, 100, 10, 0x00008b);
    }

    create() {
       // this.GrilleMontage.afficherGrille();


        let solPhysics = this.physics.add.group();

        //Instancier un objet pour détecter les touches FLÉCHÉES du clavier
        this.lesfleches = this.input.keyboard.createCursorKeys();


       



        //Instancier l'image du bloc comme ENTITÉ PHYSIQUE en bas et au tier de l'écran
       /* for (let i = 0; i < 100; i++) {

            this.leBloc = solPhysics.create(0, 0, "bloc");
            this.leBloc.setOrigin(0.5, 0.5);

            this.GrilleMontage.placerIndexCellule(500 + i, this.leBloc);
            this.GrilleMontage.mettreEchelleProportionMaximale(this.leBloc, 1);
            this.mesBlocs.push(this.leBloc);
        }*/

        this.lavaBlocks = this.physics.add.group();


        //Créer les animations du traveler
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("travelerIdle",{
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat:-1

        });

        
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers('travelerRun',{
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("travelerJump",{
                start: 0,
                end: 19
            }),
            frameRate:20,
            repeat:1,
            
        });

        this.anims.create({
            key: "land",
            frames: this.anims.generateFrameNumbers("travelerLand",{
                start:0,
                end:1
            }),
            frameRate:10,
            repeat:1

        })


        //Instancier dude comme entité physique au 2/3 et en bas de la scène
        //On affiche l'image au repos
        this.dude = this.physics.add.sprite(400,500, "travelerIdle", 0);
        

        this.dude.body.setSize(40,65);
        this.dude.scaleX = 0.75;
        this.dude.scaleY = 0.75;

        



        //Détection des collisions entre dude et le bloc
        solPhysics.getChildren().forEach(bloc => {

            this.physics.add.collider(this.dude, bloc, this.test);
            bloc.setImmovable(true);

        });

        //Detection de type trigger avec le joueur et le mur de lave
        this.lavaBlocks.getChildren().forEach(bloc => {

            this.physics.add.overlap(bloc, this.dude, this.collisionLave, null, this);

        });

        //Instancier le tilemap du niveau, et rajouter les tilesets correspondants
        
        let level1TileMap = this.add.tilemap("lvl1");

        
        let templeSet = level1TileMap.addTilesetImage("Jungle","templeSet");
        let customSet = level1TileMap.addTilesetImage("customs","customSet");

		//Layers
		this.goalLayer = level1TileMap.createStaticLayer("goal", [templeSet], 0, 255).setDepth(-3);
		this.bg_gateLayer = level1TileMap.createStaticLayer("bg_gate", [templeSet], 0, 255).setDepth(-2);
		this.gate_backLayer = level1TileMap.createStaticLayer("gate_back", [templeSet], 0, 255).setDepth(-1);
		this.bgLayer = level1TileMap.createStaticLayer("bg", [templeSet], 0, 255).setDepth(-1);
		this.solLayer = level1TileMap.createStaticLayer("sol", [templeSet],0,255);
		this.gazonLayer = level1TileMap.createStaticLayer("gazon", [templeSet], 0, 255).setDepth(-1);
		this.gate_frontLayer = level1TileMap.createStaticLayer("gate_front", [templeSet], 0, 255);
		this.fixesLayer = level1TileMap.createStaticLayer("fixes_bg",[templeSet],0,255);
		this.obstaclesLayer = level1TileMap.createStaticLayer("obstacles", [templeSet], 0, 255);
		this.laveLayer = level1TileMap.createStaticLayer("lave", [customSet], 0, 255);
		this.etoilesLayer = level1TileMap.createStaticLayer("etoiles", [customSet], 0, 255);
        this.murLaveLayer = level1TileMap.createStaticLayer("murLave", [customSet], 0, 255);
        

        // ajout des collisions
        this.physics.add.collider(this.dude,this.solLayer,this.toucheSol,null,this);
		this.physics.add.collider(this.dude,this.obstaclesLayer,this.toucheSol,null,this);
		this.physics.add.collider(this.dude,this.goalLayer,this.finNiveau,null,this);
		this.physics.add.collider(this.dude,this.laveLayer,this.collisionLave,null,this);
        this.physics.add.collider(this.dude,this.murLaveLayer,this.collisionLave,null,this);

        //this.physics.collideTiles(this.dude,this.murLaveLayer.getti,this.collisionLave,null,this);

        this.physics.collide(this.dude,this.murLaveLayer,this.collisionLave,null,this);
        
        

        this.solLayer.setCollisionByProperty({collides:true});
		this.obstaclesLayer.setCollisionByProperty({collides:true});
		this.goalLayer.setCollisionByProperty({collides:true});
		this.laveLayer.setCollisionByProperty({collides:true});
        this.murLaveLayer.setCollisionByProperty({collides:true});
        
        


		// resize tiles
		this.solLayer.setDisplaySize(5000,1000);
		this.goalLayer.setDisplaySize(5000,1000);
		this.bg_gateLayer.setDisplaySize(5000,1000);
		this.gate_backLayer.setDisplaySize(5000,1000);
		this.bgLayer.setDisplaySize(5000,1000);
		this.solLayer.setDisplaySize(5000,1000);
		this.gazonLayer.setDisplaySize(5000,1000);
		this.gate_frontLayer.setDisplaySize(5000,1000);
		this.fixesLayer.setDisplaySize(5000,1000);
		this.obstaclesLayer.setDisplaySize(5000,1000);
		this.laveLayer.setDisplaySize(5000,1000);
		this.etoilesLayer.setDisplaySize(5000,1000);
        this.murLaveLayer.setDisplaySize(5000,1000);
        

        //Caméra suivant le joueur (avec contraintes)
        this.cameras.main.startFollow(this.dude);
        this.cameras.main.setBounds(0, -500, 7000, 2500);

        this.cameras.main.setScene(this);

    }

    collisionLave() {
        console.log("player touched lava wall");
        game.properties.gameOver = true;
        this.dude.destroy();
        
    }

    toucheSol(){

        this.auSol = true;
        
	}
	
	finNiveau(){
        console.log("FINIIII");
        game.properties.gameOver = true;
	}

    loadScene(){
    
        this.scene.start("level1");
        //Petit probleme avec le reload, pour etre sur qu'il se fasse après, je l'ai fait ici
        setTimeout(function f() {game.properties.gameOver = false;},1);
    
    }


    update() {
        //console.log(game.properties.gameOver);

        
        this.dude.setOrigin(.5,.5);

        if (game.properties.gameOver == false) {

            //Si aucune touche fléchée n'est enfoncée dude reste immobile		
            if (this.lesfleches.right.isDown) {

                this.dude.setVelocityX(300);

                if (this.lesfleches.up.isUp && this.auSol) {
                    this.dude.anims.play("run", true);
					this.dude.flipX = false;
                }
                
                
            } else if (this.lesfleches.left.isDown) {

                this.dude.setVelocityX(-300);

                if (this.lesfleches.up.isUp && this.auSol) {
                    this.dude.anims.play("run", true);
					this.dude.flipX = true;
                }
               

            } else if (this.auSol == true && this.lesfleches.left.isUp && this.lesfleches.right.isUp) {

                this.dude.anims.play("idle",true);

                this.dude.setVelocityX(0);
            
			} 
			if(this.lesfleches.up.isDown && this.auSol){

                this.dude.setVelocityY(-400);
                this.auSol = false;
            }

            if (this.lesfleches.up.isDown) {

                this.dude.anims.play("jump",true);

                this.dude.anims.getProgress();
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

            this.posX = 0;
        }
	   
		
        //Le mur de lave avance et poursuit le joueur tout au long du niveau
        this.murLaveLayer.setX(this.posX++);
    }
    
}