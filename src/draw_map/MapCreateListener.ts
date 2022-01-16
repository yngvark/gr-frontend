import {MessageListener} from "../network/MessageListener";
import {Gui} from "../Gui";
import {WorldMap} from "./WorldMap";

export class MapCreateListener implements MessageListener {
    private gui: Gui;

    constructor(gui: Gui) {
        this.gui = gui
    }

    messageReceived(map: JSON):void {
        this.gui.drawMap(map as unknown as WorldMap)
    }
}