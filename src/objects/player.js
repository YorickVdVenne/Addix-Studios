"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player(scene) {
        var _this = _super.call(this, scene, 100, 450, "bmo") || this;
        _this.cursors = _this.scene.input.keyboard.createCursorKeys();
        _this.scene.add.existing(_this);
        _this.scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.setBounce(0.2);
        _this.setDragX(600);
        _this.setDragY(250);
        return _this;
    }
    Player.prototype.update = function () {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200);
            this.flipX = true;
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(200);
            this.flipX = false;
        }
        // jump when the body is touching the floor
        var grounded = this.body.touching.down;
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-400);
        }
    };
    return Player;
}(Phaser.Physics.Arcade.Sprite));
exports.Player = Player;
