import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb";

export class GameScene extends Phaser.Scene {

    private player : Player
    private score : number = 0
    private platformGroup: Phaser.GameObjects.Group
    private platformPool: Phaser.GameObjects.Group

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("Dit is de game scene")
        
        this.physics.world.bounds.width = 1600
        this.physics.world.bounds.height
    }

    create(): void {
        this.add.image(0, 0, 'level1background').setOrigin(0, 0)      
    
        // group with all active platforms.
        this.platformGroup = this.add.group({

        });

        // pool
        this.platformPool = this.add.group({

        });
        this.platformPool.add(new Platform(this, 0, 1440), true)

        // TODO add player
        this.player = new Player(this)

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.player, this.platformGroup)
        
        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 1600, 600)
        this.cameras.main.startFollow(this.player)
    }

    update(){
        this.player.update()
    }

}
