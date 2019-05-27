export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"});
    }

    init(): void {

    }

    preload(): void {

    }

    create(): void {
        this.add.image(0, 0, 'beginscreen').setOrigin(0, 0);
        this.add.text(700, 170, 'UNICORNS & NEEDLES', {fontFamily: 'VT323', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 8);
        let btn1 = this.add.text(725, 800, 'START GAME', {fontFamily: 'cosmic sans', fontSize: 40, color: '#2ac9be'}).setOrigin(0.5).setStroke('#7df2ea', 16)

        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('Level1')
        })
}
