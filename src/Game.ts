import {Gui} from "./Gui";

export class Game {
    private gui: Gui;

    constructor(gui:Gui) {
        this.gui = gui
    }

    public async run(): Promise<void> {
        this.gui.run()
    }

    stop() {
    }
}
