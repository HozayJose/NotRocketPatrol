class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/loveRocket.png');
        this.load.image('heartI', './assets/wordHeart1.png');
        this.load.image('heartLOVE', './assets/wordHeart2.png');
        this.load.image('heartYOU', './assets/wordHeart3.png');
        this.load.image('love', './assets/heartParticle.png');
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/heartExplosion.png', {frameWidth: 52, frameHeight: 48, startFrame: 0, endFrame: 9});
    }
    
    create() {
        // place tile sprite
        this.background = this.add.image(game.config.width / 2, game.config.height/2, game.settings.background[currentLevel]).setOrigin(0.5, 0.5);
        
        
        // pink UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFF1493).setOrigin(0, 0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        
        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'heartYOU', 0, 'YOU').setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'heartLOVE', 0, 'LOVE').setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'heartI', 0, 'I').setOrigin(0,0);
        
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 12
        });
        
        //particles researched from https://rexrainbow.github.io/phaser3-rex-notes/docs/site/particles/
        //particle manager
        this.particles = this.add.particles('love');
        //particle emitter
        this.emitter = this.particles.createEmitter({
            x: {min: 0, max: 100},
            y: {min:0, max: 100},
            speed: 50,
            lifespan: 1500,
            blendMode: 'LUMINOSITY',
            frequency: 5,
            //alpha: {start: 1, end: 0},
            scale: {start: 1, end: 0},
            on: false
        });
        
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        // initialize score
        this.sentence = [];
        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FF69B4',
            color: '#FFE4E1',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 500
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.sentence.join(), scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ??? to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(time, delta) {
        // cheatcode
        if(Phaser.Input.Keyboard.JustDown(keyS)) {
            currentLevel += 1;
            this.scene.start("storyScene"); 
        }

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            currentLevel += 1;
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            currentLevel = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.sound.play('sfx_select');
            bgMusic.stop();
            currentLevel = 0;
            this.scene.start('menuScene'); 
        }


        if(!this.gameOver) {
            this.p1Rocket.update(time, delta);             // update p1
            this.ship01.update(time, delta);               // update spaceship (x3)
            this.ship02.update(time, delta);
            this.ship03.update(time, delta);
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

        //adding particles to ship
        this.particles.emitParticleAt(ship.x, ship.y, 25);

        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });

        // add text
        if(!this.sentence.includes(ship.text)) {
            this.sentence.push(ship.text);
        }

        // score add and repaint
        this.scoreLeft.text = this.sentence.join(" "); 
        
        // check for if game ends by winning
        if (this.sentence.length >= 3 && currentLevel != 3) {
            currentLevel += 1;
            this.scene.start("storyScene"); 
            //console.log(currentLevel);
        }

        //console.log('sfx_hit' + (Math.ceil(Math.random() * 4)));
        this.sound.play('sfx_hit' + (Math.ceil(Math.random() * 4)));

    
      }
}