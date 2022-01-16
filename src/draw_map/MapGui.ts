import {Gui} from "../Gui";
import {WorldMap} from "./WorldMap";
import {Logger} from "../Logger";

export class MapGui {
    private readonly log:Logger
    private gui: Gui;

    constructor(gui:Gui) {
        this.log = Logger.create(this)
        this.gui = gui
        console.log("console create mapgui logger", this.log)
        this.log.info("created mapgui logger")

        let _this = this
        gui.scene.addPreLoader((load:Phaser.Loader.LoaderPlugin) => {
            _this.log.info("preLoadMapGui")
            load.image("pipo-tiles", "features/draw_map/pipo-map001.png")
        })
    }

    drawMap(worldMap: WorldMap) {
        this.log.info("Drawing world map", worldMap)
        const level = [
            [ 0, 0, 0 ],
            [ 0, 8, 0 ],
            [ 0, 0, 8 ],
        ]

        let map = this.gui.scene.make.tilemap({
            tileHeight: 48,
            tileWidth: 48,
            data: level
        })

        let tiles = map.addTilesetImage("pipo-tiles")
        map.createStaticLayer(0, tiles, 0, 0)
        // this.gui.scene.physics.world.setBounds(0, 0, layers.width, layers.height)
    }
}