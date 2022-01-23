import {Gui} from "../../Gui";
import {WorldMap} from "./WorldMap";
import {Logger} from "../../Logger";

export class MapGui {
    private readonly log:Logger = Logger.create(this)
    private gui: Gui;

    constructor(gui:Gui) {
        this.gui = gui

        let _this = this
        gui.scene.addPreLoader((load:Phaser.Loader.LoaderPlugin) => {
            _this.log.info("preLoadMapGui")
            load.image("map1", "features/draw_map/pipoya-rpg-world-tileset-tiled-15/48x48/pipo-map001.png")
            load.image("map2", "features/draw_map/pipoya-rpg-world-tileset-tiled-15/48x48/pipo-map001_at.png")
        })
    }

    drawMap(worldMap: WorldMap) {
        this.log.info("Drawing world map", worldMap)

        let myLevel = []
        let i = 0
        for (let y = 0; y < this.gui.yTiles; y++) {
            myLevel[y] = []
            for (let x = 0; x < this.gui.xTiles; x++) {
                myLevel[y][x] = 1
                i++
            }
        }

        const level = [
            [0, 8, 9],
            [100, 101, 102],
            [103, 104, 105],
            [120, 121, 122],
            [128, 129, 130],
            [131, 132, 133],
        ]

        let map = this.gui.scene.add.tilemap('map', 48, 48, null, null, myLevel)

        let map1Tiles = map.addTilesetImage("map1name", 'map1', 48, 48)
        let map2Tiles = map.addTilesetImage("map2name", 'map2', 48, 48)

        let layer1 = map.createLayer(0, [ map1Tiles, map2Tiles ]);
        // let layer2 = map.createLayer('layer', map2Tiles);
        // let layer2 = map.createLayer('map2Layer', map2Tiles);
        //
        // // console.log(layer1);
        //
        // let allTiles = [ map1Tiles, map2Tiles ]
        //
        // map.createLayer('map1Layer', allTiles, 0, 0)
        // map.createLayer('map2Layer', allTiles, 0, 0)

        // this.gui.scene.physics.world.setBounds(0, 0, layers.width, layers.height)



    }
}