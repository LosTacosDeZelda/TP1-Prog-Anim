
/**
 * Classe représentant le menu principal du jeu
 */

export class Menu extends Phaser.Scene{

    constructor(){
        super("Menu");

        this.boutonJouer;

        this.bonneOrientation = true;
    }

    create(){
        //this.boutonJouer = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,100,50,0xffffff);

        // si on est sur ordinateur
        if(window.orientation == undefined){

            // afficher l'image et la mettre à la bonne taille
            this.menuBG = this.add.image(0, 0,"menuBG");
            this.menuBG.setOrigin(0,0);
            this.menuBG.setScale(0.53,0.53);

            // afficher le personnage du menu
            this.menuPerso = this.add.image(0,0,"menuPerso");
            this.menuPerso.setOrigin(0,0);
            this.menuPerso.setScale(0.4,0.4);

            // boutons du menu
            this.boutonJouer = this.add.bitmapText(this.game.scale.width,this.game.scale.height/2,"SF-Fedora","Jouer");
            this.boutonJouer.setOrigin(1.2,1);

            // texte du menu
            this.menuTexte = this.add.bitmapText(this.game.scale.width,0,"SF-Fedora","John Jones",100);
            this.menuTexte.setOrigin(1.1,0);
    
        }
        // si on est sur mobile à l'horizontale
        else if(window.orientation == 90 || window.orientation == -90){

            // afficher l'image et la mettre à la bonne taille
            this.menuBG = this.add.image(screen.width/2, 0,"menuBG");
            this.menuBG.setOrigin(0.45,0);
            this.menuBG.setScale(0.53,0.53);

            // afficher le personnage du menu
            this.menuPerso = this.add.image(0,0,"menuPerso");
            this.menuPerso.setOrigin(0.15,0);
            this.menuPerso.setScale(0.4,0.4);

            // boutons du menu
            this.boutonJouer = this.add.bitmapText(screen.width,screen.height/2,"SF-Fedora","Jouer");
            this.boutonJouer.setOrigin(1.15,1);

            // texte du menu
            this.menuTexte = this.add.bitmapText(window.innerWidth/1.05,0,"SF-Fedora","John Jones",100);
            this.menuTexte.setOrigin(1,0);
        }
        // si on est sur mobile et à la verticale
        else if(window.orientation==0){
            this.bonneOrientation = false;
        }

        // mettre l'interactivité du bouton seulement si le mobile n'est pas à la verticale
        if(window.orientation != 0){
            this.boutonJouer.setInteractive();
            this.boutonJouer.on("pointerdown",this.chargerScene, this);    
        }

        //this.input.on("gameobjectover",this.hover)

        
        /*------------------------------------------*/
        /*****************ANIMATIONS*****************/
        /*------------------------------------------*/
        // animer le personnage
        this.tweens.add({
            targets: this.menuPerso,
            angle: 5, 
            duration: 2000,
            repeat: -1,
            yoyo: true
        });
        
        // debug
        console.log("window orientation : " + window.orientation);
        console.log("canvas size : " + this.game.scale.width);
    }

    update(){
        // rafraichir le menu si on passe de vertical à horizontal
        if(this.bonneOrientation == false && (window.orientation == 90 || window.orientation == -90)){
            this.bonneOrientation = true;
            this.create();
        }

   
    }

    hover(){

    }

    //Fonctions personnelles
    chargerScene(){
        this.scene.start("niveau1");
    }
}