import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb";
import { Game } from "phaser";
import { FirstPlatform } from "../objects/firstPlatform";

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private platformPool: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private score= 0

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("Dit is de game scene")
        
        this.physics.world.bounds.width = 1440;
        this.physics.world.bounds.height = 900;
    }

    create(): void {
        this.add.image(0, 0, 'level1background').setOrigin(0, 0)      
    
        this.bombs = this.add.group()
        for(let i = 0; i < 0; i++){
            this.bombs.add(new Bomb(this, 20, 20), true)
        }
        

        //add player
        this.player = new Player(this)

        //creating active platform group and adding platforms.
        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 840, "ground")
        ], true)

        this.platforms.add(new FirstPlatform(this, 1440, 750, 1440), true)
        this.platforms.add(new MovingPlatform(this, 1640, 750, 150), true)
        this.platforms.add(new MovingPlatform(this, 1540, 750, 100), true)
        this.platforms.add(new MovingPlatform(this, 1940, 750, 200), true)
        this.platforms.add(new MovingPlatform(this, 2100, 750, 250), true)


        //platform pool to grab platforms from.
        this.platformPool = this.add.group({ runChildUpdate: true})


        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

        //creating camera
        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 1440, 900)
        this.cameras.main.startFollow(this.player)
    }

    private hitBomb(player:Player, bombs) {
        this.scene.start("EndScene")
    }

    //collect function EXAMPLE NOT ACTUAL CODE
    /*private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.score++
        console.log(this.score)
        if(this.score==12){
            this.scene.start('GameScene2')
        }
    }*/

    update(){
        this.player.update()

    }

}