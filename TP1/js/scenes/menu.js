
/**
 * Classe représentant le menu principal du jeu
 */

export class Menu extends Phaser.Scene {

    constructor() {
        super("Menu");

        this.bonneOrientation = true;

        this.canvasElm = null;

        this.elementsMenu = null;

        this.boutonsPrincipaux = [];
        this.boutonsNiveaux = [];
        this.meilleurScoreTextes = [];
    }

    create() {

        let boutonJouer;
        let boutonInstructions;
        let boutonCredits;
        let telephoneRotation;

        let menuBG;
        let menuPerso;
        let menuTexte;

        //Référence du canvas
        this.canvasElm = document.querySelector("canvas");

        //Prendre la référence des éléments overlay du menu
        this.elementsMenu = document.querySelectorAll("body > div");

        //Boutons pour la sélection des niveaux
        this.boutonsNiveaux = document.querySelectorAll("#menuNiveaux #flexContainer .niveaux img");
        this.meilleurScoreTextes = document.querySelectorAll("#menuNiveaux #flexContainer .niveaux span");

        //this.meilleurScoreTextes.forEach(scoreText => {scoreText.innerHtml = this.game.properties.stockageLocal.getItem("pointageNiv")})

       
        for (let i = 0; i < this.meilleurScoreTextes.length; i++) {

            if (this.game.properties.stockageLocal.getItem("pointageNiv" + (i+1)) != null) {
                this.meilleurScoreTextes[i].innerHTML = this.game.properties.stockageLocal.getItem("pointageNiv" + (i+1)) + "/5";
            }
            else{
                this.game.properties.stockageLocal.setItem("pointageNiv"+ (i+1), 0);
            }
          
        }

        console.log(this.boutonsNiveaux);

        //Bouton Retour pour chacun des sous-menus
        this.elementsMenu.forEach(overlay => {

            document.querySelector("#" + overlay.id + " img").addEventListener("click", function () {
                this.toggleOverlay(overlay);
            }.bind(this));

            console.log(this.elementsMenu);
        });

        for (let i = 0; i < this.boutonsNiveaux.length; i++) {

            this.boutonsNiveaux[i].addEventListener("click", function () {
                this.chargerNiveau(window.game.scene.scenes[i + 3].scene.key);
            }.bind(this));

        };



        //Gestion du plein-écran
        this.input.keyboard.on("keydown-F", this.gererPleinEcran, this);

        console.log("FullScreenAvailable : " + this.sys.game.device.fullscreen.available);
        console.log(window.game.scene.scenes[3].scene.key);
        

            // si on est sur ordinateur
            if (window.orientation == undefined) {

                // afficher l'image et la mettre à la bonne taille
                menuBG = this.add.image(0, 0, "menuBG");
                menuBG.setOrigin(0, 0);
                menuBG.setScale(0.53, 0.53);

                // afficher le personnage du menu
                menuPerso = this.add.image(0, 0, "menuPerso");
                menuPerso.setOrigin(0, 0);
                menuPerso.setScale(0.4, 0.4);

                // Boutons du menu : Jouer, Instructions, Crédits
                boutonJouer = this.add.bitmapText(this.game.scale.width, this.game.scale.height / 2, "SF-Fedora", "Jouer");
                boutonJouer.setOrigin(1.2, 1);

                boutonInstructions = this.add.bitmapText(this.game.scale.width, this.game.scale.height / 1.5, "SF-Fedora", "Instructions");
                boutonInstructions.setOrigin(1.1, 1);

                boutonCredits = this.add.bitmapText(this.game.scale.width, this.game.scale.height / 1.2, "SF-Fedora", "Crédits");
                boutonCredits.setOrigin(1.2, 1);

                // Nom du jeu
                menuTexte = this.add.bitmapText(this.game.scale.width, 0, "SF-Fedora", "John Jones", 100);
                //menuTexte.text = "FullScreenAvailable : " + this.sys.game.device.fullscreen.available;
                menuTexte.setOrigin(1.1, 0);

            }
            // si on est sur mobile à l'horizontale
            else if (window.orientation == 90 || window.orientation == -90) {

                // afficher le decor et la mettre à la bonne taille
                menuBG = this.add.image(screen.width / 2, 0, "menuBG");
                menuBG.setOrigin(0.45, 0);
                menuBG.setScale(0.53, 0.53);

                // afficher le personnage du menu
                menuPerso = this.add.image(0, 0, "menuPerso");
                menuPerso.setOrigin(0.15, 0);
                menuPerso.setScale(0.4, 0.4);

                // boutons du menu
                boutonJouer = this.add.bitmapText(screen.width, screen.height / 2, "SF-Fedora", "Jouer");
                boutonJouer.setOrigin(1.15, 1);

                boutonInstructions = this.add.bitmapText(this.game.scale.width, this.game.scale.height / 1.5, "SF-Fedora", "Instructions");
                boutonInstructions.setOrigin(1.1, 1);

                boutonCredits = this.add.bitmapText(this.game.scale.width, this.game.scale.height / 1.2, "SF-Fedora", "Crédits");
                boutonCredits.setOrigin(1.2, 1);


                // texte du menu
                menuTexte = this.add.bitmapText(window.innerWidth / 1.05, 0, "SF-Fedora", "John Jones", 100);
                //menuTexte.text = "FullScreenAvailable : " + this.sys.game.device.fullscreen.available;
                menuTexte.setOrigin(1, 0);
            }

            // si on est sur mobile et à la verticale
            else if (window.orientation == 0) {
                this.bonneOrientation = false;

                // Inviter l'utilisateur a changer l'orientation de son appareil si il est en mode portrait
                telephoneRotation = this.add.image(this.game.scale.width/2, this.game.scale.height/2, "telephoneRotation");
                telephoneRotation.setOrigin(0.5);
            }
        
        // mettre l'interactivité des boutons seulement si le mobile n'est pas à la verticale
        if (window.orientation != 0) {

            if (this.boutonsPrincipaux.length < 3) {
                this.boutonsPrincipaux.push(boutonJouer, boutonInstructions, boutonCredits);
            }
            
            console.log(this.boutonsPrincipaux);

            boutonJouer.setInteractive({ useHandCursor: true, pixelPerfect: true });
            boutonJouer.on("pointerdown", function () { this.toggleOverlay(this.elementsMenu[0]) }, this);

            boutonInstructions.setInteractive({ useHandCursor: true, pixelPerfect: true });
            boutonInstructions.on("pointerdown", function () { this.scene.start("Instructions")}, this);
            

            boutonCredits.setInteractive({ useHandCursor: true, pixelPerfect: true });
            boutonCredits.on("pointerdown", function () { this.toggleOverlay(this.elementsMenu[2]) }, this);
        }


        /*------------------------------------------*/
        /*****************ANIMATIONS*****************/
        /*------------------------------------------*/
        // animer le personnage
        this.tweens.add({
            targets: menuPerso,
            angle: 5,
            duration: 2000,
            repeat: -1,
            yoyo: true
        });

        // debug
        console.log("window orientation : " + window.orientation);
        console.log("canvas size : " + this.game.scale.width);



    }

    update() {

        // rafraichir le menu si on passe de vertical à horizontal
        if (this.bonneOrientation == false && (window.orientation == 90 || window.orientation == -90)) {
            this.bonneOrientation = true;
            this.create();
        }

        //Technique pour positionner un div de la meme façon que le canvas
        if (this.elementsMenu != null) {

            this.elementsMenu.forEach(div => {
                div.style.width = this.canvasElm.style.width;
                div.style.height = this.canvasElm.style.height;

                div.style.marginLeft = this.canvasElm.style.marginLeft;
                div.style.marginRight = this.canvasElm.style.marginRight;
                div.style.marginTop = this.canvasElm.style.marginTop;
            });
        }

    }



    //Fonctions personnelles
    /**
     * Charge le niveau (scène) passé en paramètre
     * @param {*} niveau 
     */
    chargerNiveau(niveau) {
        this.elementsMenu[0].classList.add("invisible");
        this.scene.start(niveau);
    }

    /**
     * 
     * @param {*} element 
     */
    toggleOverlay(element) {
        //this.scene.start("niveau1");

        element.classList.toggle("invisible");

        if (!element.classList.contains("invisible")) {
            this.boutonsPrincipaux[0].disableInteractive();
            this.boutonsPrincipaux[1].disableInteractive();
            this.boutonsPrincipaux[2].disableInteractive();
        } else {
            this.boutonsPrincipaux[0].setInteractive();
            this.boutonsPrincipaux[1].setInteractive();
            this.boutonsPrincipaux[2].setInteractive();
        }
    }

    /**
     * 
     */
    gererPleinEcran() {
        console.log("enter");
        if (this.scale.isFullscreen) {
        
            this.elementsMenu.forEach(overlay => {document.body.insertBefore(overlay, document.body.firstChild);})
            
            this.scale.stopFullscreen();
        }
        else {

            this.scale.startFullscreen();

            this.elementsMenu.forEach(overlay => { this.canvasElm.parentElement.insertBefore(overlay, this.canvasElm.parentElement.firstChild);});

        }

    }
}