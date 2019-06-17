import { Scene } from "phaser";
import { GameScene } from "../scenes/game-scene"

export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {

    private gameScene: GameScene

    constructor(scene, posX: number, posY: number, platformWidth: number, speed) {
        super(scene, posX, posY, "platform")

        console.log("created platform")

        //set width of platform
        this.width = platformWidth
        this.displayWidth = platformWidth

        //physics
        this.scene.physics.add.existing(this)
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0)
        this.setImmovable(true)
        this.setVelocityX(speed)

        //set gameScene
        this.gameScene = this.scene as GameScene
    }

    public update(): void {
        if (this.x < 0 - this.width / 2) {
            this.remove()
        }
    }
    
    public remove() : void {
        this.gameScene.platforms.remove(this, true)
    }
}