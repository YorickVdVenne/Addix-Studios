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
        this.scoreDisplay = this.add.text(1150, 520, '', {fontFamily: 'arial black', fontSize: 120, color: '#FFFFFF'}).setOrigin(0.5).setStroke('#FFFFFF', 1)

        this.scoreDisplay.text = ' ' + this.registry.get("score")

        let btn1 = this.add.text(730, 320, 'TRY AGAIN!', {fontFamily: 'arial black', fontSize: 50, color: '#e5feff'}).setOrigin(0.5).setStroke('#1e1e1e', 10)
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
