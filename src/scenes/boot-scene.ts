export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('sky', require('../assets/background.png'))
        this.load.image('syringe', require('../assets/syringe.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('bmo', require('../assets/bmo.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('startbackground', require('../assets/startscherm002.jpg'))
        this.load.image('level1background', require('../assets/level-background-1.png'))
        this.load.image('ground', require('../assets/black-platform.png'))
        this.load.image('unicorn', require('../assets/unicorn.png'))  
        this.load.image('endscene', require('../assets/endscene.png'))  
        this.load.audio('backgroundmusic', require('../assets/backgroundmusic.mp3'))
        this.load.audio('startbackgroundmusic', require('../assets/startbackgroundmusic.mp3'))
        
        
    

        this.load.on('complete', () => {
            console.log("everything is loaded")
            // add code here to switch to the start scene
            this.scene.start("StartScene")
        })
    }
}