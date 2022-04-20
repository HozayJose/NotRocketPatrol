//narrative goes here, begins before Play scene 
//set a one time timer to last the story
//have a delay for each background
class Story extends Phaser.Scene {
    constructor() {
        super('storyScene');
    }

    preload() {
    }

    create() {
        // show background sprite
        this.storyBG = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);

        //skip button
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        game. menuConfig.backgroundColor = '#FF69B4';
        game.menuConfig.color = '#FFE4E1';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ENTER to Start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 5, 'Press ESC to return to Menu', menuConfig).setOrigin(0.5);

        //'Sometimes we forget to say these three little words to those we care about...'
        //'To our friends...'
        //'To our family...'
        //And most importantly, to ourselves'
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene'); 
            console.log(currentLevel);
        } else {
            this.storyBG.anims.play('menu', true);
        }
    }
}