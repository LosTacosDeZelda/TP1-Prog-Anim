//Importation des scripts et classes nécessaires
import {
	sceneChargement
} from './scenes/sceneChargement.js';

import {
	level1
} from './scenes/level1.js';

window.addEventListener("load", function(){

    let config = {

        scale:{
            width:300,
            height:400
        },

        scene: [sceneChargement, level1],
		physics: {
			default: 'arcade',
			arcade: {
				debug: true,
			}
		}
    }

    window.game = new Phaser.Game(config);
})