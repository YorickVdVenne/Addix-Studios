import { Scene } from "phaser";

export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {

    private startPositionX: number
    private startPositionY: number
    private currentScene: Scene

    constructor(scene, x: number, y: number, texture:string) {
        super(scene, x, y, texture)

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0)
        this.setImmovable(true)

        // moving platform
        this.setVelocityX(-500)

        this.startPositionX = x
        this.startPositionY = y
        this.currentScene = this.scene
    }

    public update(): void {
        if (this.x < 0) {
            this.newPlatform()
            this.scene.platforms.remove(this)
        }
    }

    public newPlatform(): void {
        this.currentScene.platforms.add(new MovingPlatform(this.currentScene, this.startPositionX, this.startPositionY, "platform"), true)
    }
}
