export class StartScene extends Phaser.Scene {

    private backgroundmusic: Phaser.Sound.BaseSound
    private startbackgroundmusic: Phaser.Sound.BaseSound


    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
        console.log("i am the start scene...")
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'startbackground').setOrigin(0, 0)
        this.startbackgroundmusic = this.sound.add('startbackgroundmusic');
        this,this.startbackgroundmusic.play()

        // add another image here


        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.text(705, 800, 'START GAME', {fontFamily: 'impact', fontSize: 60, color: 'transparent'}).setOrigin(0.5).setStroke('#FFFFFF', 3)
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
