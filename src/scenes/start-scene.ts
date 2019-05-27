export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'startbackground').setOrigin(0, 0)

        // add another image here

        // add text here

        this.add.text(700, 200, 'UNICORNS & NEEDLES', { fontFamily: 'Arial Black', fontSize: 50, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 10)


        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.text(725, 800, 'START GAME', {fontFamily: 'cosmic sans', fontSize: 35, color: '#2ac9be'}).setOrigin(0.5).setStroke('#7df2ea', 10)
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
        
    }
}
