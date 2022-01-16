import {MessageListener} from "../network/MessageListener";
import {WorldMap} from "./WorldMap";
import {MapGui} from "./MapGui";

export class MapCreateListener implements MessageListener {
    private mapGui: MapGui;

    constructor(gui: MapGui) {
        this.mapGui = gui
    }

    messageReceived(map: any):void {
        this.mapGui.drawMap(map as WorldMap)
    }
}