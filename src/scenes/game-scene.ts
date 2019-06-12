import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb";
import { Game } from "phaser";
import { FirstPlatform } from "../objects/firstPlatform";
import { Syringe } from "../objects/syringe";
import { EndScene } from "./end-scene";

export class GameScene extends Phaser.Scene {

    //objects and groups
    private player : Player
    public platforms: Phaser.GameObjects.Group
    public ground: Phaser.GameObjects.Group
    private syringes: Phaser.GameObjects.Group
    private bombs: Phaser.GameObjects.Group

    //ui
    //score
    private scoreDisplay: Phaser.GameObjects.Text
    private scoreTimer: Phaser.Time.TimerEvent

    //timer
    private gameTimer: Phaser.Time.TimerEvent
    private timerDisplay: Phaser.GameObjects.Text
    private timerCounter: number = 10

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

        //group for syringes and adding syringes
        this.syringes = this.add.group()

        this.syringes.add(new Syringe(this, 770, 200), true)

        //creating active platform group and adding platforms.
        this.platforms = this.add.group({ runChildUpdate: true, removeCallback: () => this.addPlatform() })
        this.platforms.addMultiple([
            new Platform(this, 800, 840, "ground")
        ], true)

        this.platforms.add(new MovingPlatform(this, 770, 750, 1440), true)
        this.platforms.add(new MovingPlatform(this, 1500, 750, 200), true)
        this.platforms.add(new MovingPlatform(this, 1800, 750, 150), true)
        this.platforms.add(new MovingPlatform(this, 2100, 750, 300), true)

        //group to check if player has fallen from the platforms
        this.ground = this.add.group()
        this.ground.addMultiple([
            new Platform(this, 800, 840, "ground")
        ], true)

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.syringes, this.platforms)
        this.physics.add.overlap(this.player, this.syringes, this.collectSyringe, null, this)
        this.physics.add.overlap(this.player, this.ground, this.outOfBounds, null, this)

        //creating camera
        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 1440, 900)
        this.cameras.main.startFollow(this.player)

        //creating gametimer
        this.timerDisplay = this.add.text(100, 50, 'Time: ' + this.timerCounter, { fontFamily: 'Impact', fontSize: 24, color: '#ffffff' } ).setOrigin(0, 0)
        this.gameTimer = this.time.addEvent({
            delay: 1000,    //ms
            callback: () => this.updateTimer(),
            loop: true
        })

        //creating scorecounter
        this.scoreDisplay = this.add.text(1300, 50, 'Score: 0', { fontFamily: 'Impact', fontSize: 24, color: '#ffffff' } ).setOrigin(0, 0)
        this.scoreTimer = this.time.addEvent({
            delay: 500,    //ms
            callback: () => this.updateScore(),
            loop: true
        })
        this.registry.set('score', 0)
    }

    update(){
        this.player.update()

        //timer update
        this.timerDisplay.text = 'Time: ' + this.timerCounter
        if (this.timerCounter < 0) {
          this.scene.start("EndScene")
        }
        
        //score update
        this.scoreDisplay.text = 'Score: ' + this.registry.get("score")

    }

    private addPlatform(){
        let x = 1440 + Math.floor(Math.random() * 750)
        let width = 100 + Math.floor(Math.random() * 400)
        this.platforms.add(new MovingPlatform(this, x, 750, width), true)
        if (Math.floor(Math.random() * 100) < 25) {
            this.syringes.add(new Syringe(this, x, 700), true)
        }
    }

    private collectSyringe(player: Player, syringe: Syringe) {
        this.syringes.remove(syringe, true, true)
        this.timerCounter += 10
    }

    private updateTimer(){
        this.timerCounter--
    }

    private updateScore(){
        this.registry.values.score++
    }

    private outOfBounds(){
        this.scene.start("EndScene")
    }
} 