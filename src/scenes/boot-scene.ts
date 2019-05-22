export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('beginscreen', require('../assets/start-background.jpg'))
        this.load.image('syringe', require('../assets/syringe.png'))
        this.load.image('background1', require('../assets/level-background-1.png'))

        
        this.load.on('complete', () => {
            console.log("boot-scene complete!")
            // add code here to switch to the start scene
            this.scene.start("StartScene");
        })
    }
}