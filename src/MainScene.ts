import 'phaser';
import {Player} from "./features/player/Player";

type PreLoaderFn = (scene:Phaser.Loader.LoaderPlugin) => void

export class MainScene extends Phaser.Scene {
    private playerSprite: Phaser.GameObjects.Sprite
    private cursors: any
    private preLoaderFns:PreLoaderFn[] = []
    private player:Player = new Player()

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        console.log("mainscene preload")

        this.load.image("skeleton", "assets/skeleton.png")
        this.load.image("human", "assets/human.png")

        for (const preLoaderFn of this.preLoaderFns) {
            preLoaderFn(this.load)
        }
    }

    addPreLoader(preLoaderFn:PreLoaderFn) {
        this.preLoaderFns.push(preLoaderFn)
    }

    create(): void {
        this.playerSprite = this.add.sprite(0, 0, "human").setOrigin(0, 0).setDepth(10)
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    // https://phaser.io/tutorials/making-your-first-phaser-3-game/part7
    update(): void {
        this.updatePlayer()
    }

    updatePlayer(): void {
        this.player.resetChange()

        if (this.cursors.left.isDown)
        {
            this.player.moveLeft()
        }

        if (this.cursors.right.isDown)
        {
            this.player.moveRight()
        }

        if (this.cursors.up.isDown)
        {
            this.player.moveUp()
        }

        if (this.cursors.down.isDown)
        {
            this.player.moveDown()
        }

        if (this.player.hasChanged()) {
            this.playerSprite.setPosition(this.player.x, this.player.y)
        }
    }


}
