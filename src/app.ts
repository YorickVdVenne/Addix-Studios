import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { EndScene } from "./scenes/end-scene"
import { Arcade } from "./utils/arcade/arcade"

const config: GameConfig = {
    width: 1440,
    height: 900,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, StartScene, GameScene, EndScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 900 }
        }
    },
    render: { pixelArt: true }
};

export class Game extends Phaser.Game {

    public arcade: Arcade

    constructor(config: GameConfig) {
        super(config)
        this.arcade = new Arcade(this, false)
    }
}

window.addEventListener("load", () => new Game(config))