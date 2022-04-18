class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/newSelect.wav');
        this.load.audio('sfx_explosion', './assets/heartBeat.wav');
        this.load.audio('sfx_rocket', './assets/hitHeart2.wav');
        this.load.audio('sfx_heartMonitor', './assets/menuHeartBeat.wav');
        this.load.audio('sfx_hit1', './assets/heartBeat.wav');
        this.load.audio('sfx_hit2', './assets/heartBeat2.wav');
        this.load.audio('sfx_hit3', './assetsheartBeat3.wav');
        this.load.audio('sfx_hit4', './assets/heartBeat4.wav');
        this.load.audio('backgroundMusic', './assets/TheBackgroundMusic.mp3');

        //load spritesheet
        this.load.spritesheet('menuScreen', './assets/plainMenuBG.png', {frameWidth: 640, frameHeight: 480, startFrame: 0, endFrame: 4});
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
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
        this.bgMusic = this.sound.add('backgroundMusic');
        this.bgMusic.loop = true;
        this.bgMusic.play();
        
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'NOT ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ENTER to Begin', menuConfig).setOrigin(0.5);

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
          this.bgMusic.stop();
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        } else {
            this.menuScreen.anims.play('menu', true);
        }
      }
}