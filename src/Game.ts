import {Gui} from "./Gui";

export class Game {
    private gui: Gui;

    constructor(gui:Gui) {
        this.gui = gui
    }

    public async run(): Promise<void> {
        console.log("Running Game")
        this.gui.run()
    }

    stop() {
    }
}
