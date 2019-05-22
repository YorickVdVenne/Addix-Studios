export class Level1 extends Phaser.Scene {

    constructor() {
        super({ key: "Level1" })
    }

    init(): void {

        this.physics.world.bounds.width = 1600
        this.physics.world.bounds.height

    }

    create(): void {    
        this.add.image(0, 0, 'background1').setOrigin(0, 0)      
    
}