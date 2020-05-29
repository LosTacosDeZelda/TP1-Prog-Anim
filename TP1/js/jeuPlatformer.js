//Importation des scripts et classes nécessaires
import { SceneChargement } from './scenes/SceneChargement.js';

import { Menu } from "./scenes/Menu.js";

import { Niveau1 } from './scenes/Niveau1.js';

import { Niveau2 } from './scenes/Niveau2.js';

import { Niveau3 } from './scenes/Niveau3.js';

import { Niveau4 } from './scenes/Niveau4.js';

import { GameOver } from './scenes/GameOver.js';
import { Instructions } from './scenes/Instructions.js';

window.addEventListener("load", function () {
	
	let largeur = 1024,
		hauteur = 576;

	//On fait 2 vérifications la première pour "Mobile" et la seconde pour "Tablet"
	//Et si on est sur un mobile (tablette ou téléphone), on re-dimensionne le jeu
	if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {
		//8console.log("Le jeu est lu sur un mobile... on change les dimensions...");
		largeur = Math.max(window.innerWidth, window.innerHeight);
		hauteur = Math.min(window.innerWidth, window.innerHeight);

		//ScreenOrientation.lock("landscape");
		//window.screen.lockOrientation("landscape");

	}

	let config = {
		backgroundColor: 0x666666,
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: largeur,
			height: hauteur
		},

		scene: [SceneChargement, Menu, Instructions, Niveau1, Niveau2 ,Niveau3,Niveau4,GameOver],
		physics: {
			default: 'arcade',
			arcade: {
				// debug: true,
			}
		}

	}

	window.game = new Phaser.Game(config);

	window.game.properties = {

		//Ici, tu peux mettre les proprietes globales du jeu
		score: 0,
		stockageLocal: window.localStorage,
		mort: false,
		partieGagnee: false

	}

}, false)