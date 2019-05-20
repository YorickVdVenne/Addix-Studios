export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"});
    }

    init(): void {

    }

    preload(): void {

    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.add.text(400, 400, 'Unicorns & Needles', {fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16);
    }
}