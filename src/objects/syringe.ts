export class Syringe extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, speed){
        super(scene, x, y, "syringe")

        //physics
        this.scene.physics.add.existing(this)
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0)
        this.setImmovable(true)
        this.setVelocityX(speed)

    }

}