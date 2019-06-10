export class Platform extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, platformWidth: number, posX: number) {
        super(scene, posX, 200, "platform")

        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0) 
        this.setImmovable(true)
    }
}