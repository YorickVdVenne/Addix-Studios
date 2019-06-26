import { Game } from "../app"
import { Arcade } from "../utils/arcade/arcade"

export class StartScene extends Phaser.Scene {

    private backgroundmusic: Phaser.Sound.BaseSound
    private startbackgroundmusic: Phaser.Sound.BaseSound
    private arcade: Arcade
    private g: Game
    private buttonListener: EventListener


    constructor() {
        super({key: "StartScene"})

        this.g = this.game as Game
        this.arcade = this.g.arcade
    }

    init(): void {
        console.log("this is the start scene.")
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'startbackground').setOrigin(0, 0)
        this.startbackgroundmusic = this.sound.add('startbackgroundmusic');
        this,this.startbackgroundmusic.play()

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.text(705, 800, 'START GAME', {fontFamily: 'impact', fontSize: 60, color: 'transparent'}).setOrigin(0.5).setStroke('#FFFFFF', 3)
        btn1.setInteractive({cursor:true})
        btn1.on('pointerdown', () => this.nextScene())

        //change after gamepad buttonpress.
        this.buttonListener = () => this.nextScene()
        document.addEventListener('joystick0button0', () => this.buttonListener)
        
    }

    private createMusic() {
        this.backgroundmusic = this.sound.add('backgroundmusic', { loop: true});
        this.backgroundmusic.play()
    }

    private nextScene() {
        console.log("start button pressed");
        this.sound.stopAll()
        this.createMusic()
        document.removeEventListener('joystick0button0', this.buttonListener)
        this.scene.start('GameScene')
    }
}
