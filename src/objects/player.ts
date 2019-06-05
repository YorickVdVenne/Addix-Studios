import { Joystick } from "../utils/joystick"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private joystick: Joystick

    constructor(scene) {
        super(scene, 100, 450, "unicorn")

        this.cursors = this.scene.input.keyboard.createCursorKeys()

        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.joystick = new Joystick(6)

        this.setCollideWorldBounds(true)
        this.setBounce(0.2)
        this.setDragX(600)
        this.setDragY(250) 
    }

    public update(): void {
        
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            
        }                                                                                                                                                                                                                                                                                   
        

        // jump when the body is touching the floor
    
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-400)
        }

        this.joystick.update()
        this.joystickInput()
        this.keyController()

    }


    private joystickInput():void {
        this.setVelocityX(this.joystick.XAxis * 400)
        this.setVelocityY(this.joystick.YAxis * 400)
    }

    public keyController() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = false
        } if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        } if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
            this.flipX = false
        } if (this.cursors.down.isDown) {
            this.setVelocityY(200)
            this.flipX = false
        }
}




}
