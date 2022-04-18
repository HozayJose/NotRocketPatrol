class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

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
            frameRate: 12,
            repeat: 0  
        });

        // place tile sprite
        this.menuScreen = this.add.sprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);

        
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
            spaceshipSpeed: [3, 5, 7],
            background: ['levelFriend', 'levelFamily','levelSelf'],
            gameTimer: 6000 //0    
          }
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        } else {
            this.menuScreen.anims.play('menu', true);
        }
      }
}