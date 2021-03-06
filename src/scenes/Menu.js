class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/hitHeart1.wav');
        //this.load.audio('sfx_explosion', './assets/heartBeat.wav');
        this.load.audio('sfx_rocket', './assets/hitHeart2.wav');
        this.load.audio('sfx_heartMonitor', './assets/menuHeartBeat.wav');

        this.load.audio('sfx_hit1', './assets/heartBeat.wav');
        this.load.audio('sfx_hit2', './assets/heartBeat2.wav');
        this.load.audio('sfx_hit3', './assets/heartBeat3.wav');
        this.load.audio('sfx_hit4', './assets/heartBeat4.wav');

        this.load.audio('backgroundMusic', './assets/TheBackgroundMusic.mp3');

        //load spritesheet
        this.load.spritesheet('menuScreen', './assets/plainMenuBG.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 4});
    }

    create() {
        // menu text configuration
        game.titleConfig = {
            fontFamily: 'IndieFlower',
            fontSize: '80px',
            color: '#FFE4E1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        game.menuConfig = {
            fontFamily: 'IndieFlower',
            fontSize: '20px',
            backgroundColor: '#FF149390',
            color: '#FFC0CB',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        game.storyConfig = {
            fontFamily: 'IndieFlower',
            fontSize: '28px',
            backgroundColor: '#FF69B490',
            color: '#FFE4E1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //anima config
        this.anims.create({
            key: 'menu',
            frames: this.anims.generateFrameNumbers('menuScreen', { start: 0, end: 4, first: 0}),
            frameRate: 6,
            repeat: 0  
        });

        // place tile sprite
        this.menuScreen = this.add.sprite(0, 0, 'menu').setOrigin(0, 0);

        //adding the background music
        bgMusic = this.sound.add('backgroundMusic');
        bgMusic.loop = true;
        bgMusic.play();
        
        // show menu text
        this.titleText = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'LOVE PATROL', game.titleConfig).setOrigin(0.5);
        this.titleText.setStroke('#FFC0CB', 5);
        this.titleText.setShadow(2, 2, "#FF69B4", 2, false, true);

        let instructions = [
            'Use ?????? arrows to move & (F) to fire',
            'Press ENTER to Start',
            'Press ESC to return to Menu',
            'Press S to skip level'
        ]
        this.add.text(game.config.width/2, game.config.height - 100, instructions, game.menuConfig).setOrigin(0.5);

        // define keys
        //keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
          // Level difficulty will scale upon each level
          game.settings = {
            spaceshipSpeed: [3, 4, 5],
            background: ['levelFriend', 'levelFamily','levelSelf'],
            gameTimer: 60000    
          }
          //this.bgMusic.stop();
          this.sound.play('sfx_select');
          this.scene.start("storyScene");    
        } else {
            this.menuScreen.anims.play('menu', true);
        }
      }
}