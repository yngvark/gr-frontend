import {Gui} from "../Gui";
import {WorldMap} from "./WorldMap";
import {Logger} from "../Logger";

export class MapGui {
    private readonly log:Logger = Logger.create(this)
    private gui: Gui;

    constructor(gui:Gui) {
        this.gui = gui
        this.log.info("created mapgui logger")

        let _this = this
        gui.scene.addPreLoader((load:Phaser.Loader.LoaderPlugin) => {
            _this.log.info("preLoadMapGui")
            load.image("map", [
                "features/draw_map/pipoya-rpg-world-tileset-tiled-15/48x48/pipo-map001.png",
                "features/draw_map/pipoya-rpg-world-tileset-tiled-15/48x48/pipo-map001_at.png"
            ])
        })
    }

    drawMap(worldMap: WorldMap) {
        this.log.info("Drawing world map", worldMap)

        const level = [
            [0, 8, 30],
            [60, 180, 181],
            [200, 300, 800],
        ]

        let map = this.gui.scene.make.tilemap({
            tileHeight: 48,
            tileWidth: 48,
            data: level,
        })
        let tileSet = map.addTilesetImage("map")
        map.createStaticLayer(0, tileSet, 0, 0)

        // this.gui.scene.physics.world.setBounds(0, 0, layers.width, layers.height)
    }
}