//narrative goes here, begins before Play scene 
//set a one time timer to last the story
//have a delay for each background
class Story extends Phaser.Scene {
    constructor() {
        super('storyScene');

        this.stories = {
            0: {
                text: [
                    'Sometimes we forget to say',
                    'these three little words to',
                    'those we care about...',
                    '',
                    'To our friends...'
                ],
                //background: 'menuScreen',
            },
            1 : {
                text: 'To our family...',
                //background: 'heart',
            },
            2: {
                text: [
                    'And most importantly,',
                    'to ourselves!'
                ]

                //background: 'heart',
            },
            3: {
                text: 'Never forget that you\'re loved',
                //background: 'heart',
            }
        }
    }

    preload() {
        //backgrounds
        this.load.image('levelFriend', './assets/levelFriendBG.png');
        this.load.image('levelFamily', './assets/levelFamilyBG.png');
        this.load.image('levelSelf', './assets/levelSelfBG.png');
    }

    create() {
        // show background sprite
        this.storyBG = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);
        
        //skip button
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.storyText = this.add.text(game.config.width/2, game.config.height/2, this.stories[currentLevel].text, game.storyConfig)
        this.storyText.setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding * 5, 'Press ESC to return to Menu', game.menuConfig).setOrigin(0.5);
        
        if(currentLevel < 3) {
            this.add.text(game.config.width/2, game.config.height - 50, 'Press ENTER to continue', game.menuConfig).setOrigin(0.5);
        } else {
            this.add.text(game.config.width/2, game.config.height - 50, 'Press ESC to return to menu', game.menuConfig).setOrigin(0.5);
        }
        
    }

    update() {
        if (currentLevel < 3 && Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.sound.play('sfx_select');
            this.scene.start('playScene'); 
            console.log(currentLevel);
        } else {
            this.storyBG.anims.play('menu', true);
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('sfx_select');
            bgMusic.stop();
            currentLevel = 0;
            this.scene.start('menuScene'); 
        }
    }
}