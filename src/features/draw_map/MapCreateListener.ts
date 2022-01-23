import {MessageListener} from "../../lib/network/MessageListener";
import {WorldMap} from "./WorldMap";
import {MapGui} from "./MapGui";

export class MapCreateListener implements MessageListener {
    public static type = "mapCreate"

    private mapGui: MapGui;

    constructor(gui: MapGui) {
        this.mapGui = gui
    }

    messageReceived(map: any):void {
        this.mapGui.drawMap(map as WorldMap)
    }
}