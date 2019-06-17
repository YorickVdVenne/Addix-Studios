export class EndScene extends Phaser.Scene {

    private scoreDisplay: Phaser.GameObjects.Text
    private backgroundmusic: Phaser.Sound.BaseSound
    private startbackgroundmusic: Phaser.Sound.BaseSound

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image
        this.startbackgroundmusic = this.sound.add('startbackgroundmusic');
        this,this.startbackgroundmusic.play()

        this.add.image(0, 0, 'endscene').setOrigin(0, 0)
        this.scoreDisplay = this.add.text(1075, 475, '', {fontFamily: 'arial', fontSize: 100, color: 'transparent'}).setOrigin(0.5).setStroke('#FFFFFF', 3)

        this.scoreDisplay.text = ' ' + this.registry.get("score")

        let btn1 = this.add.text(710, 800, 'TRY AGAIN!', {fontFamily: 'impact', fontSize: 60, color: '#FDFD06'}).setOrigin(0.5).setStroke('black', 5)
        btn1.setInteractive({cursor:true})
        btn1.on('pointerdown', (pointer) => {
            console.log("start button pressed");
            this.scene.start('GameScene')
            this.sound.stopAll()
            this.createMusic()
        })
    }

    private createMusic() {
        this.backgroundmusic = this.sound.add('backgroundmusic', { loop: true});
        this.backgroundmusic.play()
    }

}
