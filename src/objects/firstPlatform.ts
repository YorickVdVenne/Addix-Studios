import { GameScene } from "../scenes/game-scene"

export class FirstPlatform extends Phaser.Physics.Arcade.Sprite {

    private currentScene: GameScene

    constructor(scene, posX: number, posY: number, platformWidth: number) {
        super(scene, posX, posY, "platform")

        console.log("created first Platform")

        //set width
        this.width = platformWidth
        this.displayWidth = platformWidth
        
        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0)
        this.setImmovable(true)

        // moving platform
        this.setVelocityX(-500)

        this.currentScene = this.scene as GameScene
    }

    public update(){
        /*if (this.x < 0 - this.width / 2){
            this.currentScene.platforms.remove(this)
        }*/
    }
}