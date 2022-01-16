import {Gui} from "./Gui";
import {ZombieMove} from "./ZombieMove";
import {MessageListener} from "./network/MessageListener";

export class ZombieMoveListener implements MessageListener {
    private gui: Gui;

    constructor(gui: Gui) {
        this.gui = gui
    }

    messageReceived(zombieMove: any):void {
        this.gui.zombieMoved(zombieMove as ZombieMove);
    }
}