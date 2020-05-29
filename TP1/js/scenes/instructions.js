/**
 * Classe affichant les instructions pour mobile ou
 * pour ordi
 */
export class Instructions extends Phaser.Scene {

    constructor() {
        super("Instructions");
    }

    create() {
        // afficher l'image d'aide du jeu
        let aideJeu;
        let aideJeu_BG;

   
        aideJeu_BG = this.add.image(this.game.scale.width/2, this.game.scale.height/2, "aideJeu_BG");
        aideJeu_BG.setOrigin(0.5);

        // mettre une image differente selon Ordi ou Mobile
            // ordi
        if(window.orientation == undefined){
            aideJeu = this.add.image(this.game.scale.width/2, this.game.scale.height/2, "aideJeu_Ordi");
        }
            //Mobile
        else if(window.orientation == 90 || window.orientation == -90){
            aideJeu = this.add.image(this.game.scale.width/2, this.game.scale.height/2, "aideJeu_Mobile");

        }

        aideJeu.setOrigin(0.5);
        aideJeu.setScale(this.game.scale.width/aideJeu.width);

    }
}