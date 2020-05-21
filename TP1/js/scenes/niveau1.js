
/**
 * 1er niveau du jeu (trop dur? le mettre en 2eme?)
 */

export class niveau1 extends Phaser.Scene {


    constructor() {
        super("niveau1");

        //Arrays
        this.layers = [];

        //Les flèches du clavier	
        this.lesfleches = null; //Les touches fléchées du clavier

        //GameObjects
        this.player = null;

        //Variable pour détecter le saut
        this.auSol = false;

        this.posX = 0;

        this.startWall = false;

        this.scoreText = null;

        this.surOrdi;

        this.themePrincipal;

        this.clicked = false;

        this.jumpButton;

        this.joystickKeys;
    }

    /**
     * 
     */
    create() {

        this.posX = 0;

        //Créer les cercles pour le joystick 
        this.grandCercle = this.add.image(0, 0, "joystickExt").setDepth(1);
        this.grandCercle.setDisplaySize(window.innerWidth / 3, window.innerWidth / 3);

        this.petitCercle = this.add.image(0, 0, "joystickInt").setDepth(1);
        this.petitCercle.setScale(window.innerWidth / 650, window.innerWidth / 650);

        // Créer le texte pour le pointage
        this.scoreText = this.add.bitmapText(screen.width/1.9, (screen.height - screen.height) + 30, "SF-Fedora", "Pointage : " + game.properties.score, 30).setDepth(1);

        this.scoreText.setScrollFactor(0);

        //Rajouter un pointeur pour la détection d'un 2ème doigt sur mobile
        this.input.addPointer();

        //On gère différamment les inputs de l'utilisateur selon l'appareil
        if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {

            //Créer le joystick virtuel
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: window.innerWidth / 7,
                y: window.innerHeight / 1.35,
                radius: 100,
                base: this.grandCercle,
                thumb: this.petitCercle,
                dir: 'left&right',
                // forceMin: 16,
                fixed: true,
                enable: true
            });

          this.joystickKeys = this.joyStick.createCursorKeys();

            //Créer le bouton de saut
            this.jumpButton = this.add.sprite(window.innerWidth / 1.2, window.innerHeight / 1.2, "jumpButton", 0).setDepth(1);  //this.add.rectangle(window.innerWidth / 1.17, window.innerHeight / 1.2, window.innerWidth / 4, window.innerHeight / 4, 0xffffff).setDepth(1);
            this.jumpButton.setDisplaySize(window.innerWidth / 4, window.innerHeight / 4);
            this.jumpButton.setInteractive();

            //Permet de gérer l'animation du bouton
            this.jumpButton.on("pointerdown", this.animBouton, this);
            this.jumpButton.on("pointerup", this.animBouton, this);

            this.jumpButton.on("pointerdown",this.saut,this);

            //Permet de gérer le bouton de saut en tant que UI
            this.jumpButton.setScrollFactor(0);

            //Variable qui change les inputs selon lappareil sur lequel on est
            this.surOrdi = false;

        }
        else {

            //Instancier un objet pour détecter les touches FLÉCHÉES du clavier
            this.lesfleches = this.input.keyboard.createCursorKeys();

            this.surOrdi = true;

        }

        //Créer les animations du traveler
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("travelerIdle", {
                start: 0,
                end: 7
            }),
            frameRate: 10,
            repeat: -1

        });


        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers('travelerRun', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("travelerJump", {
                start: 0,
                end: 19
            }),
            frameRate: 20,
            repeat: 1,

        });

        this.anims.create({

            key: "land",
            frames: this.anims.generateFrameNumbers("travelerLand", {
                start: 0,
                end: 1
            }),
            frameRate: 10,
            repeat: 1

        });
        //Fin animations traveler

        //Animation du bouton sauter
        this.anims.create({
            key: "clickButton",
            frames: this.anims.generateFrameNumbers("jumpButton", {
                start: 0,
                end: 3
            }),
            frameRate: 10
        });


        //Instancier l'aventurier comme entité physique au debut du niveau
        //On affiche l'image au repos de celui-ci
        this.player = this.physics.add.sprite(1200, 680, "travelerIdle", 0);

        // Ajuster les propriétés physiques du joueur
        this.player.body.setSize(40, 55);
        this.player.scaleX = 0.75;
        this.player.scaleY = 0.75;


        //Instancier le tilemap du niveau, et rajouter les tilesets correspondants
        let niveau1TileMap = this.make.tilemap({key:"lvl1"});

       

        //Ajouter les tileset utilisés
        let templeSet = niveau1TileMap.addTilesetImage("Jungle", "templeSet");
        let customSet = niveau1TileMap.addTilesetImage("customs", "customSet");



        //Affichage des Layers (à optimiser ???)
        this.goalLayer = niveau1TileMap.createStaticLayer("goal", [templeSet], 0, 255).setDepth(-3);
        this.bg_gateLayer = niveau1TileMap.createStaticLayer("bg_gate", [templeSet], 0, 255).setDepth(-2);
        this.gate_backLayer = niveau1TileMap.createStaticLayer("gate_back", [templeSet], 0, 255).setDepth(-1);
        this.bgLayer = niveau1TileMap.createStaticLayer("bg", [templeSet], 0, 255).setDepth(-1);
        this.solLayer = niveau1TileMap.createStaticLayer("sol", [templeSet], 0, 255);
        this.gazonLayer = niveau1TileMap.createStaticLayer("gazon", [templeSet], 0, 255).setDepth(-1);
        this.gate_frontLayer = niveau1TileMap.createStaticLayer("gate_front", [templeSet], 0, 255);
        this.fixesLayer = niveau1TileMap.createStaticLayer("fixes_bg", [templeSet], 0, 255).setDepth(-1);
        this.obstaclesLayer = niveau1TileMap.createStaticLayer("obstacles", [templeSet], 0, 255);
        this.laveLayer = niveau1TileMap.createStaticLayer("lave", [customSet], 0, 255);
        this.etoilesLayer = niveau1TileMap.createDynamicLayer("etoiles", [customSet], 0, 255);
        this.murLaveLayer = niveau1TileMap.createStaticLayer("murLave", [customSet], 0, 255);

        //Optimisation, on peut maintenant accéder plus facilement aux layers (peut faire des boucles)
        this.layers.push(this.goalLayer, this.bg_gateLayer, this.gate_backLayer, this.gate_frontLayer, this.bgLayer, this.solLayer, this.gazonLayer, this.fixesLayer, this.obstaclesLayer, this.laveLayer, this.etoilesLayer, this.murLaveLayer);


        // Ajout des collisions
        this.physics.add.collider(this.player, this.solLayer, this.toucheSol, null, this);
        this.physics.add.collider(this.player, this.obstaclesLayer, this.toucheSol, null, this);

        this.physics.add.collider(this.player, this.laveLayer, this.collisionLave, null, this);
        this.physics.add.collider(this.player, this.murLaveLayer, this.collisionLave, null, this)

        this.physics.add.collider(this.player, this.etoilesLayer, this.ramasseEtoile, null, this);

        this.physics.add.collider(this.player, this.goalLayer, this.finNiveau, null, this);

        this.solLayer.setCollisionByProperty({ collides: true });
        this.obstaclesLayer.setCollisionByProperty({ collides: true });

        this.goalLayer.setCollisionByProperty({ collides: true });
        this.laveLayer.setCollisionByProperty({ collides: true });
        this.etoilesLayer.setCollisionByProperty({ collides: true });

        //Cette méthode permet d'appeler une fonction quand quelque chose collide avec la layer 
        //Il faut donner les index des tiles que tu veux vérifier
        this.murLaveLayer.setTileIndexCallback([139, 2684354698], this.collisionLave, this);
        this.etoilesLayer.setTileIndexCallback([137], this.ramasseEtoile, this);

        //Ajustement de la taille des layers du tilemap
        this.layers.forEach(layer => {
            layer.setDisplaySize(5000, 833); //833
        });


        //Caméra suivant le joueur (avec contraintes)
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(500, 255, 4500, 1500);

        this.cameras.main.roundPixels = true
        //this.cameras.main.setScene(this);

        //Minuterie avant que le mur de lave ne commence à bouger
        this.time.addEvent(
            {
                delay: 2000,
                callback: this.startLavaWall,
                callbackScope: this
            }
        )

        //Partir le theme principal du jeu
        if (this.themePrincipal == null || this.themePrincipal.isPlaying == false) {

            this.themePrincipal = this.sound.play("themePrincipal", { loop: true });
        }



    }

    /**
     * 
     */
    collisionLave() {

        this.sound.play("sonMort");
        
        game.properties.mort = true;
        this.player.destroy();
        game.properties.score = 0;

    }

    /**
     * Fonction appelée lorsque le joeur rencontre une étoile
     * 
     * @param {*} joueur Ce qui rencontre la tuile, dans ce cas-ci, c'est le joueur
     * @param {*} etoile La tuile rencontrée
     */
    ramasseEtoile(joueur, etoile) {
        
        this.etoilesLayer.removeTileAtWorldXY(etoile.getBounds().x, etoile.getBounds().y);

        this.sound.play("sonEtoile");
        game.properties.score++;
        this.scoreText.setText("Pointage : " + game.properties.score);

    }

    /**
     * 
     */
    animBouton() {

        this.clicked = !this.clicked;

        if (this.clicked) {
            this.jumpButton.anims.play("clickButton", true);
        }
        else {
            this.jumpButton.anims.playReverse("clickButton")
        }


        console.log(this.clicked);

    }

    
    saut(){
        this.activerSaut = true;
    }

    /**
     * 
     */
    toucheSol() {

        this.auSol = true;
        //this.activerSaut = false;

    }

    /**
     * 
     */
    finNiveau() {

        game.properties.partieGagnee = true;
        this.startWall = false;
        this.scene.start("gameOver");
    }

    /**
     * 
     */
    loadScene() {

        this.scene.start("niveau1");
        this.startWall = false;

        //Petit probleme avec le reload, pour etre sur qu'il se fasse après, je l'ai fait ici
        setTimeout(function f() {
            game.properties.mort = false;

        }, 1);

    }
    /**
     * Permet de declencher le mur de lave
     */
    startLavaWall() {
        this.startWall = true;
    }

    /**
     * Update permet de faire bouger le joueur dans la scene
     * 
     */
    update() {

        this.player.setOrigin(.5, .5);

        // bouger seulement si il n'est pas mort
        if (game.properties.mort == false) {

            if (this.surOrdi) {

                // bouger vers la droite
                if (this.lesfleches.right.isDown) {

                    this.player.setVelocityX(300);

                    // faire jouer l'animation de course si le perso touche le sol
                    if (this.lesfleches.up.isUp && this.player.body.blocked.down) {
                        this.player.anims.play("run", true);
                        this.player.flipX = false;
                    }

                    // bouger vers la gauche 
                } else if (this.lesfleches.left.isDown) {

                    this.player.setVelocityX(-300);
                    // faire jouer l'animationde cours si le perso touche le sol
                    if (this.lesfleches.up.isUp && this.player.body.blocked.down) {
                        this.player.anims.play("run", true);
                        this.player.flipX = true;
                    }

                    //Si aucune touche fléchée n'est enfoncée player reste immobile		
                } else if (this.player.body.blocked.down && this.lesfleches.left.isUp && this.lesfleches.right.isUp) {

                    this.player.anims.play("idle", true);
                }

                /*Fix de mouvements aériens*/
                if (this.lesfleches.left.isUp && this.lesfleches.right.isUp) {
                    this.player.setVelocityX(0);

                }

                // mouvement du saut
                if (this.lesfleches.up.isDown && this.player.body.blocked.down) {

                    this.player.setVelocityY(-430);
                    this.auSol = false;

                    this.player.anims.play("jump", true);
                    this.sound.play("sonSaut", { volume: 0.2 });

                }
            }
            else {

                if (this.joystickKeys.right.isDown) {

                    this.player.setVelocityX(300);

                    // faire jouer l'animation de course si le perso touche le sol
                    if (this.joyStick.right && this.player.body.blocked.down) {
                        this.player.anims.play("run", true);
                        this.player.flipX = false;
                    }


                } else if (this.joystickKeys.left.isDown) {

                    this.player.setVelocityX(-300);

                    if (this.joyStick.left && this.player.body.blocked.down) {
                        this.player.anims.play("run", true);
                        this.player.flipX = true;
                    }

                } else if(this.joyStick.noKey && this.player.body.blocked.down) {

                    this.player.anims.play("idle", true);

                    this.player.setVelocityX(0);
                }

                 /*Fix des mouvements aériens*/
                 if (this.joystickKeys.left.isUp && this.joystickKeys.right.isUp) {
                    this.player.setVelocityX(0);

                }

                if (this.clicked && this.player.body.blocked.down) {

                    this.player.setVelocityY(-430);
                    this.auSol = false;

                    this.player.anims.play("jump", true);
                    this.sound.play("sonSaut", { volume: 0.2 });
                }

               
            }

            this.player.setGravityY(1000);

            //Le mur de lave avance et poursuit le joueur tout au long du niveau
            if (this.startWall == true) {

                this.murLaveLayer.setX(this.posX += 1.4);

            }

        } else {

            this.scene.start("gameOver");

            this.startWall = false;
            this.posX = 0;
        }

        console.log("Start lava wall" + this.startWall);

    }
}