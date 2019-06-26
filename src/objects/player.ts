import { Game } from "../app"
import { Arcade } from "../utils/arcade/arcade"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private maxJumps: number = 1
    private jumps: number = 0
    private grounded: boolean
    private arcade: Arcade

    constructor(scene, x: number, y: number) {
        super(scene, x, y, "unicorn")

        //keyboard controls
        this.cursors = this.scene.input.keyboard.createCursorKeys()

        //joystick controls
        let g = this.scene.game as Game
        this.arcade = g.arcade

        document.addEventListener("joystick0button0", () => this.jump())

        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0)
        this.setDragX(600)
        this.setDragY(50) 
    }

    public update(): void {

        this.grounded = this.body.touching.down

        this.keyController()
        this.joystickController()

        if (this.grounded){
            this.jumps = 0
        }

    }

    public keyController(): void {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = true
        } if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        }
        if (this.cursors.up.isDown && this.grounded) {
            this.setVelocityY(-800)
        }
    }

    private joystickController(): void {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        if (this.arcade.Joysticks[0]) {
            this.setVelocityX(this.arcade.Joysticks[0].X * 200)
        }
    }

    private jump() {
        if (this.grounded || this.jumps < this.maxJumps) {
            this.setVelocityY(-800)
            this.jumps++
        }
    }
}