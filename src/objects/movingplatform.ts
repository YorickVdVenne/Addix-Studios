import { Scene } from "phaser";

export class MovingPlatform extends Phaser.Physics.Arcade.Sprite {

    private startPositionX: number
    private startPositionY: number
    private currentScene: Scene
    private platform: MovingPlatform

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

        this.startPositionX = posX
        this.startPositionY = posY
        this.currentScene = this.scene
    }

    public update(): void {
        if (this.x < 0) {
            this.addPlatform(150, this.startPositionX)

            //move platform from active group to pool.
            this.currentScene.platforms.remove(this)
            this.currentScene.platformPool.add(this)
            this.active = false;
            this.visible = false;

            
        }
    } 

    public addPlatform(platformWidth: number, posX: number): void {
        //if there are platforms in the pool:
        if (this.currentScene.platformPool.getLength()){
            //take the first platform from the pool.
            this.platform = this.currentScene.platformPool.getFirst()
            this.platform.x = posX
            this.platform.active = true
            this.platform.visible = true
            //remove platform from the pool and add to active group.
            this.currentScene.platformPool.remove(this.platform)
            this.currentScene.platforms.add(this.platform)
        }
        //if there are NO platforms in the pool create a new one.
        else {
            this.currentScene.platforms.add(new MovingPlatform(this.currentScene, posX, this.startPositionY, platformWidth), true)
        }
    }
}
