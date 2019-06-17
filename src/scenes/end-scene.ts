export class EndScene extends Phaser.Scene {

    private scoreDisplay: Phaser.GameObjects.Text

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image

        this.add.image(0, 0, 'endscene').setOrigin(0, 0)
        this.scoreDisplay = this.add.text(1075, 475, '', {fontFamily: 'arial', fontSize: 100, color: 'transparent'}).setOrigin(0.5).setStroke('#FFFFFF', 3)

        this.scoreDisplay.text = ' ' + this.registry.get("score")

        // add text here

        // this.add.text(400, 300, 'GAME OVER, MAN!', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
    }
}
