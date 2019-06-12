import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb";
import { Game } from "phaser";
import { FirstPlatform } from "../objects/firstPlatform";

export class GameScene extends Phaser.Scene {

    private player : Player
    public platforms: Phaser.GameObjects.Group
    public platformPool: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private score= 0

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        
      
    }

    create(): void {
        console.log("create function")
        this.add.image(0, 0, 'level1background').setOrigin(0, 0)      

        //add player
        this.player = new Player(this)

        //creating active platform group and adding platforms.
        this.platforms = this.add.group({ runChildUpdate: true, removeCallback: () => this.addPlatform() })
        this.platforms.addMultiple([
            new Platform(this, 800, 840, "ground")
        ], true)

        this.platforms.add(new MovingPlatform(this, 1300, 750, 100), true)
        this.platforms.add(new MovingPlatform(this, 1600, 750, 100), true)
        this.platforms.add(new MovingPlatform(this, 1900, 750, 100), true)
        this.platforms.add(new MovingPlatform(this, 2100, 750, 100), true)

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.player, this.platforms)

        //creating camera
        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 1440, 900)
        this.cameras.main.startFollow(this.player)
    }

    update(){
      this.player.update()
    }

    private addPlatform(){
        let x = 1440 + Math.floor(Math.random() * 500)
        let width = 100 + Math.floor(Math.random() * 500)
        this.platforms.add(new MovingPlatform(this, x, 750, width), true)
    }
}