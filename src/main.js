let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Story, Play ],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyENTER, keyESC, keyS; 

//level significance for increase in difficulty
let currentLevel = 0;

//background music
let bgMusic;


// ----- GOALS for Mod -----
//I want levels (3)
//I want to change text and background every level
//I want a story to play between each level
//Each level has increased speed of "ships" to reflect difficulty
//Last level has one extra "ship" that player should avoid - not met

//Project by Jose Salas
//Many thanks to classmate Sam Feng for helping me write more efficient coding

//---- Point Breakdown ----
// S(hrek) Tier = 60 points for redesigning game artwork, UI, and sound
// Intermediate Tier = 20 points for using Phaser's particle emitter for particle explosions
// Novice Tier = 10 points for creating 4 new explosion SFX and randomizing which plays
// Starting Tier = 5 points for adding copyright free background music but NOT LIMITED to Play scene
//#FACADE Tier = 5 points for creating a short narrative to play throughout the game 