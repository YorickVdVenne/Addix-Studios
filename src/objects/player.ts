export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    maxJumps: number = 2;
    jumps: number = 0;

    constructor(scene) {
        super(scene, 100, 450, "bmo")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setDragY(250)
    }

    public update(): void {
        
        // jump when the body is touching the floor
        if (this.cursors.up.isDown && this.jumps < this.maxJumps) {
            this.setVelocityY(-400)
            this.jumps++
        }

    }
}
