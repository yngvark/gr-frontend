import {Network} from "./network/Network";
import {Gui} from "./Gui";

export class Game {
    private network: Network;
    private gui: Gui;

    constructor(network: Network, gui:Gui) {
        this.network = network
        this.gui = gui
    }

    public async run(): Promise<void> {
        console.log("Running Game")
        this.gui.run()
    }

    stop() {
    }
}
