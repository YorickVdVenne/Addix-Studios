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


        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.text(705, 800, 'START GAME', {fontFamily: 'impact', fontSize: 60, color: 'transparent'}).setOrigin(0.5).setStroke('#FFFFFF', 3)
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })
        
    }
}
