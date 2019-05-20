export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('sky', require('../assets/background.jpg'))

        this.load.on('complete', () => {
            console.log("boot-scene complete!")
            // add code here to switch to the start scene
            this.scene.start("StartScene");
        })
    }
}