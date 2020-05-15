


export class Menu extends Phaser.Scene{

    constructor(){
        super("Menu");

        this.boutonJouer;
    }

    create(){
        //this.boutonJouer = this.add.rectangle(window.innerWidth/2,window.innerHeight/2,100,50,0xffffff);
        

        this.boutonJouer = this.add.bitmapText(screen.width/4,screen.height/2,"SF-Fedora","Jouer");
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