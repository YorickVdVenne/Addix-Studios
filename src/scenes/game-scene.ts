import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { Bomb } from "../objects/bomb";
import { Game } from "phaser";
import { FirstPlatform } from "../objects/firstPlatform";
import { Syringe } from "../objects/syringe";
import { EndScene } from "./end-scene";

export class GameScene extends Phaser.Scene {

    private player : Player
    public platforms: Phaser.GameObjects.Group
    public platformPool: Phaser.GameObjects.Group
    private syringes: Phaser.GameObjects.Group
    private bombs: Phaser.GameObjects.Group

    //ui
    private score= 0
    private timer: Phaser.Time.TimerEvent
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
    
        this.bombs = this.add.group()
        for(let i = 0; i < 0; i++){
            this.bombs.add(new Bomb(this, 20, 20), true)
        }
        

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

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.syringes, this.platforms)
        this.physics.add.overlap(this.player, this.syringes, this.collectSyringe, null, this)

        //creating camera
        this.cameras.main.setSize(1440, 900)
        this.cameras.main.setBounds(0, 0, 1440, 900)
        this.cameras.main.startFollow(this.player)

        //creating timer for gameover
        this.timerDisplay = this.add.text(700, 50, 'Score: 0', { fontFamily: 'Arial', fontSize: 11, color: '#ffffff' } ).setOrigin(0, 0)
        this.timer = this.time.addEvent({
            delay: 1000,    //ms
            callback: () => this.updateTimer(),
            loop: true
        })
    }

    update(){
      this.player.update()

      //timer
      this.timerDisplay.text = 'Time:' + this.timerCounter
      if (this.timerCounter < 0){
        this.scene.start("EndScene")
        }
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
} 