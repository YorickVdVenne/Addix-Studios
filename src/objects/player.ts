import { Joystick } from "../utils/joystick"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private joystick: Joystick
    private maxJumps: number = 2
    private jumps: number = 0
    private grounded: boolean

    constructor(scene) {
        super(scene, 100, 450, "unicorn")

        this.cursors = this.scene.input.keyboard.createCursorKeys()

        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.joystick = new Joystick(6)

         this.setCollideWorldBounds(true)
         this.setDragX(600)
         this.setDragY(10)
         this.setGravity(0)
         this.setFriction(0)
    }

    public update(): void {

        this.grounded = this.body.touching.down

        this.joystick.update()
        this.joystickInput()
        this.keyController()

    }


    private joystickInput():void {
        if (this.joystick.YAxis == -1 && this.grounded) {
            this.setVelocityY(-400)
        }
        if (this.joystick.XAxis == 1) {
            this.setVelocityX(700)
        }
        if (this.joystick.XAxis == -1) {
            this.setVelocityX(-200)
        }
    }

    public keyController() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = false
        } if (this.cursors.right.isDown) {
            this.setVelocityX(700)
            this.flipX = false
        }
        if (this.cursors.up.isDown && this.grounded) {
            this.setVelocityY(-400)
        }
    }
}