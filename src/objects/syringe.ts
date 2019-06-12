export class Syringe extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y){
        super(scene, x, y, "syringe")

        //physics
        this.scene.physics.add.existing(this)
    }

}