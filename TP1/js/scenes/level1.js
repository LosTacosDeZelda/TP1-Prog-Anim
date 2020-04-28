//Importation des fichiers classes ou fichiers nécessaires


/**
 * Class representant la scène du jeu comme tel
 */

export class level1 extends Phaser.Scene {


    constructor() {
        super("level1");

        //Arrays
        this.layers = [];

        //Les flèches du clavier	
        this.lesfleches = null; //Les touches fléchées du clavier

        //GameObjects
        this.dude = null;

        //Variable pour détecter le saut
        this.auSol = false;

        this.posX = 0;

        this.startWall = false;
		
		//score
		this.score = 0;

		this.posX = 0;
    }

    create() {
       // this.GrilleMontage.afficherGrille();


        let solPhysics = this.physics.add.group();

        //Instancier un objet pour détecter les touches FLÉCHÉES du clavier
        this.lesfleches = this.input.keyboard.createCursorKeys();


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


        //Instancier l'aventurier comme entité physique au debut du niveau
        //On affiche l'image au repos de celui-ci
        this.dude = this.physics.add.sprite(800,680, "travelerIdle", 0);
        

        this.dude.body.setSize(40,55);
        this.dude.scaleX = 0.75;
        this.dude.scaleY = 0.75;


        //Instancier le tilemap du niveau, et rajouter les tilesets correspondants
        let level1TileMap = this.add.tilemap("lvl1");
        
        let templeSet = level1TileMap.addTilesetImage("Jungle","templeSet");
        let customSet = level1TileMap.addTilesetImage("customs","customSet");

        

		//affichage des Layers
		this.goalLayer = level1TileMap.createStaticLayer("goal", [templeSet], 0, 255).setDepth(-3);
		this.bg_gateLayer = level1TileMap.createStaticLayer("bg_gate", [templeSet], 0, 255).setDepth(-2);
		this.gate_backLayer = level1TileMap.createStaticLayer("gate_back", [templeSet], 0, 255).setDepth(-1);
		this.bgLayer = level1TileMap.createStaticLayer("bg", [templeSet], 0, 255).setDepth(-1);
		this.solLayer = level1TileMap.createStaticLayer("sol", [templeSet],0,255);
		this.gazonLayer = level1TileMap.createStaticLayer("gazon", [templeSet], 0, 255).setDepth(-1);
		this.gate_frontLayer = level1TileMap.createStaticLayer("gate_front", [templeSet], 0, 255);
		this.fixesLayer = level1TileMap.createStaticLayer("fixes_bg",[templeSet],0,255).setDepth(-1);
		this.obstaclesLayer = level1TileMap.createStaticLayer("obstacles", [templeSet], 0, 255);
		this.laveLayer = level1TileMap.createStaticLayer("lave", [customSet], 0, 255);
		this.etoilesLayer = level1TileMap.createStaticLayer("etoiles", [customSet], 0, 255);
        this.murLaveLayer = level1TileMap.createStaticLayer("murLave", [customSet], 0, 255);

        this.layers.push(this.goalLayer,this.bg_gateLayer,this.gate_backLayer,this.gate_frontLayer,this.bgLayer,this.solLayer,this.gazonLayer,this.fixesLayer,this.obstaclesLayer,this.laveLayer,this.etoilesLayer,this.murLaveLayer);

        
        

        // ajout des collisions
        this.physics.add.collider(this.dude,this.solLayer,this.toucheSol,null,this);
        this.physics.add.collider(this.dude,this.obstaclesLayer,this.toucheSol,null,this);
        
        this.physics.add.collider(this.dude,this.goalLayer,this.finNiveau,null,this);
        
		this.physics.add.collider(this.dude,this.laveLayer,this.collisionLave,null,this);
        this.physics.add.collider(this.dude,this.murLaveLayer,this.collisionLave,null,this)
        
		this.physics.add.collider(this.dude,this.etoilesLayer,this.ramasseEtoile,null,this);

        
        this.solLayer.setCollisionByProperty({collides:true});
        this.obstaclesLayer.setCollisionByProperty({collides:true});
        

		this.goalLayer.setCollisionByProperty({collides:true});
		this.laveLayer.setCollisionByProperty({collides:true});
        this.etoilesLayer.setCollisionByProperty({collides:true});
        
        //Cette methode permet dappeler une fonction quand quelque chose collide avec la layer 
        //Il faut donner les index des tiles que tu veux verifier
        this.murLaveLayer.setTileIndexCallback([139,2684354698],this.collisionLave,this);

		// resize tiles *********************==a optimiser==********************

        this.layers.forEach(layer => {
            layer.setDisplaySize(5000,833);
        });
        

        //Caméra suivant le joueur (avec contraintes)
        this.cameras.main.startFollow(this.dude);
        this.cameras.main.setBounds(500, 255, 4075, 1500);

        this.cameras.main.setScene(this);

        this.time.addEvent(
            {
                delay: 2000,
                callback: this.startLavaWall,
                callbackScope: this
            }
        )

    }

    collisionLave() {
        console.log("player touched lava wall");
        game.properties.gameOver = true;
        this.dude.destroy();
        
	}
	
	/*******************************== a ameliorer==****************************************/
	ramasseEtoile(){
		this.score +=1;
		// this.etoilesLayer.destroy();
	}

    toucheSol(){

        this.auSol = true;
        
	}
	
	finNiveau(){
		console.log("C'est FINI");
        game.properties.gameOver = true;
	}

    loadScene(){
    
        this.scene.start("level1");
        this.startWall = false;

        //Petit probleme avec le reload, pour etre sur qu'il se fasse après, je l'ai fait ici
        setTimeout(function f() {
            game.properties.gameOver = false;
        
        },1);
    
    }

    startLavaWall(){
        this.startWall = true;
    }


    update() {
        
        console.log(this.layers[0]);
        
        this.dude.setOrigin(.5,.5);

        if (game.properties.gameOver == false) {
            
            //Si aucune touche fléchée n'est enfoncée dude reste immobile		
            if (this.lesfleches.right.isDown) {

                this.dude.setVelocityX(300);

                if (this.lesfleches.up.isUp && this.dude.body.blocked.down) {
                    this.dude.anims.play("run", true);
					this.dude.flipX = false;
                }
                
                
            } else if (this.lesfleches.left.isDown) {

                this.dude.setVelocityX(-300);

                if (this.lesfleches.up.isUp && this.dude.body.blocked.down) {
                    this.dude.anims.play("run", true);
					this.dude.flipX = true;
                }
               

            } else if (this.dude.body.blocked.down && this.lesfleches.left.isUp && this.lesfleches.right.isUp) {

                this.dude.anims.play("idle",true);

                this.dude.setVelocityX(0);
            
			} 
			if(this.lesfleches.up.isDown && this.dude.body.blocked.down){

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
        if (this.startWall == true) {
            this.murLaveLayer.setX(this.posX += 1.75);
        }
        
    }
    
}