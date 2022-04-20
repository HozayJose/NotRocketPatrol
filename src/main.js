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
let keyF, keyR, keyLEFT, keyRIGHT, keyENTER, keyESC; 

//level significance for increase in difficulty
let currentLevel = 0;

//background music
let bgMusic;

//I want levels (3)
//I want to change background every level
//I want a story to play for a certain amount of time before Play
//Each level has increased speed of "ships"
//Last level has one extra "ship" that player should avoid