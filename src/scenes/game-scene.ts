import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Syringe } from "../objects/syringe";

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

    //speed
    private speedTimer: Phaser.Time.TimerEvent
    private speed = -500    //must be a negative number

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        this.speed = -500
        this.registry.values.score = 0
        this.timerCounter = 10
    }

    create(): void {
        console.log("create function")
        this.add.image(0, 0, 'level1background').setOrigin(0, 0)      

        //add player
        this.player = new Player(this, 100, 300)

        //group for syringes and adding syringes
        this.syringes = this.add.group()

        this.syringes.add(new Syringe(this, 770, 430), true)

        //creating active platform group and adding platforms.
        this.platforms = this.add.group({ runChildUpdate: true, removeCallback: () => this.addPlatform() })

        this.platforms.add(new MovingPlatform(this, 770, 500, 1440, this.speed), true)
        this.platforms.add(new MovingPlatform(this, 1500, 500, 200, this.speed), true)
        this.platforms.add(new MovingPlatform(this, 1800, 500, 150, this.speed), true)
        this.platforms.add(new MovingPlatform(this, 2300, 500, 300, this.speed), true)

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

        //speed timer
        this.speedTimer = this.time.addEvent({
            delay: 1000,    //ms
            callback: () => this.incrementSpeed(),
            loop: true
        })
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
        let y = 400 + Math.floor(Math.random() * 350)
        let width = 100 + Math.floor(Math.random() * 400)
        this.platforms.add(new MovingPlatform(this, x, y, width, this.speed), true)
        if (Math.floor(Math.random() * 100) < 15) {
            this.syringes.add(new Syringe(this, x, y - 70, this.speed), true)
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
        this.game.sound.stopAll()
        this.scene.start("EndScene")
    }

    private incrementSpeed(){
        this.speed -= 10;
    }
} 