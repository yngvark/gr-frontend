import {MessageListener} from "../network/MessageListener";
import {WorldMap} from "./WorldMap";
import {MapGui} from "./MapGui";

export class MapCreateListener implements MessageListener {
    private mapGui: MapGui;

    constructor(gui: MapGui) {
        this.mapGui = gui
    }

    messageReceived(map: JSON):void {
        this.mapGui.drawMap(map as unknown as WorldMap)
    }
}