/**
 * Scène qui s'affiche lorsque le joueur est mort ou qu'il
 * a fini un niveau, permet de faire le lien entre le menu et le jeu
 */

export class gameOver extends Phaser.Scene {

    constructor() {

        super("gameOver");

        this.boutonMenu = null; //Je pense pas que cest necessaire de faire une variable globale pour ca

    }

    create() {

        //Creer le bouton menu
        this.boutonMenu = this.add.sprite(screen.width / 4, screen.height / 2.05, "menuButton", 0);

        //Créer l'animation du bouton menu
        this.anims.create({
            key: "menuButtonAnim",
            frames: this.anims.generateFrameNumbers("menuButton", {
                start: 0,
                end: 1

            }),
            frameRate: 10
        });

        //Rendre le bouton interactif
        this.boutonMenu.setInteractive({
            pixelPerfect: true,
            useHandCursor: true
        });

        //Évènements liés au bouton menu
        this.boutonMenu.on("pointerdown", this.cliqueBoutonMenu, this);

        this.boutonMenu.on("pointerover", function () {

            this.setTint(0x0000ff);
        });

        //Pour le bouton rouge
        //this.setTint(0xff0000);

        this.boutonMenu.on("pointerout", function () {

            this.clearTint();

        });
        
        //Texte menu
        let menuTexte = this.add.bitmapText(screen.width / 4, screen.height / 2, "VCR", "Menu", 50);
        //Permet à la position du texte de correspondre à celle du bouton
        menuTexte.setOrigin(0.5, 1);

        //Changer l'affichage selon si le joueur a fini le niveau ou non
        if (this.game.properties.partieGagnee) {

            let enVie = this.add.sprite(screen.width / 3, screen.height / 5, "mortOuEnVie", 0);
            enVie.setScale(0.8);

            this.boutonMenu.setX(screen.width / 3);
            menuTexte.setX(screen.width / 3);

            game.properties.partieGagnee = false;


        } else {

            let dead = this.add.sprite(screen.width / 3, screen.height / 5, "mortOuEnVie", 1);
            dead.setScale(0.8);

            let boutonEssai = this.add.image(screen.width / 2.4, screen.height / 2.05, "boutonReessayer", 0);

            boutonEssai.setInteractive({
                pixelPerfect: true,
                useHandCursor: true
            });

           

            boutonEssai.on("pointerdown", function () {

                game.properties.mort = false;
                this.scene.start("niveau1");

            }, this);

            boutonEssai.on("pointerover",function () {
                this.setTint(0xff0000);
            });

            boutonEssai.on("pointerout",function () {
                this.clearTint();
            });

            let essaiTexte = this.add.bitmapText(screen.width / 2.39, screen.height / 2.05, "VCR", "Réessayer", 35);
            //Permet à la position du texte de correspondre à celle du bouton
            essaiTexte.setOrigin(0.5, 1);


        }

    }

    cliqueBoutonMenu() {

        game.properties.mort = false;
        this.boutonMenu.anims.play("menuButtonAnim");


        this.time.addEvent({
            delay: 500,
            callback: function () { this.scene.start("Menu"); },
            callbackScope: this
        })

    }
}