import { Scene } from "phaser";

export class FirstPlatform extends Phaser.Physics.Arcade.Sprite {

    private currentScene: Scene

    constructor(scene, posX: number, posY: number, platformWidth: number) {
        super(scene, posX, posY, "platform")

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

        this.currentScene = this.scene
    }

    public update(){
        if (this.x < 0 - this.width / 2){
            this.currentScene.platforms.remove(this)
        }
    }
}