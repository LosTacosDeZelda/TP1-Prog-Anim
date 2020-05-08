//Importation des scripts et classes nécessaires
import {
	sceneChargement
} from './scenes/sceneChargement.js';

import {
	level1
} from './scenes/level1.js';

window.addEventListener("load", function(){
    let largeur = 1024,
		hauteur = 576;

	//On fait 2 vérifications la première pour "Mobile" et la seconde pour "Tablet"
	//Et si on est sur un mobile (tablette ou téléphone), on re-dimensionne le jeu
	if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {
		//8console.log("Le jeu est lu sur un mobile... on change les dimensions...");
		largeur = Math.max(window.innerWidth, window.innerHeight);
		hauteur = Math.min(window.innerWidth, window.innerHeight);
	}

    let config = {
		backgroundColor: 0x000000,
        scale:{
            mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
            width:largeur,
            height:hauteur
        },

        scene: [sceneChargement, level1],
		physics: {
			default: 'arcade',
			arcade: {
				//debug: true,
			}
		}
		
    }

	window.game = new Phaser.Game(config);
	
	window.game.properties = {

		gameOver: false
		//Ici, tu peux mettre les proprietes globales du jeu
	}
	
}, false)