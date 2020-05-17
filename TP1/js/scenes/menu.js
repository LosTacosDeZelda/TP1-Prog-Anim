
/**
 * Classe représentant le menu principal du jeu
 */

export class Menu extends Phaser.Scene{

    constructor(){
        super("Menu");

        this.boutonJouer;
    }

    create(){
        //this.boutonJouer = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,100,50,0xffffff);

        // Images du menu
        // afficher l'image et la mettre à la bonne taille
        this.menuBG = this.add.image(screen.width/2, screen.height/2,"menuBG");
        this.menuBG.setScale(0.35,0.35);

        // afficher le personnage du menu
        this.menuPerso = this.add.image(screen.width/2, screen.height/2,"menuPerso");

        // boutons du menu
        this.boutonJouer = this.add.bitmapText(screen.width/4,screen.height/2,"SF-Fedora","Jouer");

        // texte du menu
        this.add.bitmapText(screen.width/8,screen.height/5,"SF-Fedora","John Jones",120);

        //this.input.on("gameobjectover",this.hover)

        this.boutonJouer.setInteractive();
        this.boutonJouer.on("pointerdown",this.chargerScene, this);
    }

    update(){
        
    }

    hover(){

    }

    //Fonctions personnelles
    chargerScene(){
        this.scene.start("niveau1");
    }
}