import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb";

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private bombs: Phaser.GameObjects.Group
    private score= 0

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("Dit is de game scene")
        
        this.physics.world.bounds.width = 1440
        this.physics.world.bounds.height

    }

    create(): void {
        this.add.image(0, 0, 'level1background').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 125 },
        })


        this.bombs = this.add.group()
        for(let i = 0; i < 0; i++){
            this.bombs.add(new Bomb(this, 20, 20), true)
        }
        

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 840, "ground")
        ], true)

        this.platforms.add(new MovingPlatform(this, 1440, 800, "platform"), true)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 1440, 900)
        this.cameras.main.startFollow(this.player)
    }

    private hitBomb(player:Player, bombs) {
        this.scene.start("EndScene")
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.score++
        console.log(this.score)
        if(this.score==12){
            this.scene.start('GameScene2')
        }
    }

    update(){
        this.player.update()

    }

}
