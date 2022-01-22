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
            load.image("map1", "features/draw_map/pipoya-rpg-world-tileset-tiled-15/48x48/pipo-map001.png")
            load.image("map2", "features/draw_map/pipoya-rpg-world-tileset-tiled-15/48x48/pipo-map001_at.png")
        })
    }

    drawMap(worldMap: WorldMap) {
        this.log.info("Drawing world map", worldMap)

        const level = [
            [0, 1, 2],
            [100, 101, 102],
            [300, 301, 302],
        ]

        let map = this.gui.scene.make.tilemap({
            tileHeight: 48,
            tileWidth: 48,
            data: level,
        })
        let tileSet1 = map.addTilesetImage("map1")
        let tileSet2 = map.addTilesetImage("map2")

        let allTiles = [ tileSet1, tileSet2 ]

        // map.createDynamicLayer('yo1', allTiles, 0, 0)
        // map.createDynamicLayer('yo2', allTiles, 0, 0)

        // map.createStaticLayer(0, tileSet1, 0, 0)
        // map.createStaticLayer(0, allTiles, 0, 0)
        map.createStaticLayer(0, allTiles, 0, 0)

        // this.gui.scene.physics.world.setBounds(0, 0, layers.width, layers.height)



    }
}