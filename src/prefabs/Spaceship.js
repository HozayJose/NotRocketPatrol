// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, text) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.moveSpeed = game.settings.spaceshipSpeed[currentLevel];         // pixels per frame
        this.text = text;
    }

    update(time, delta) {
        // move spaceship left
        this.x -= this.moveSpeed * delta / 16;
        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}