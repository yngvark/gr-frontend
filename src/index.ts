import {Game} from "./Game";
import {Network} from "./network/Network";
// import {Logger} from "./Logger";
import {WebsocketHandler} from "./network/WebsocketHandler";
import {Gui} from "./Gui";
import {ZombieMoveListener} from "./ZombieMoveListener";

// const log = Logger.create("index")

document.addEventListener('DOMContentLoaded', async () => {
    await initGame()
}, false);

async function initGame() {
    const backendUrl = (window as any).Gridwalls.backendUrl
    console.log("backendUrl: " + backendUrl)

    const network = new Network(new WebsocketHandler(backendUrl))
    const gui = new Gui(20, 11)
    const game = new Game(network, gui)
    const zombieMoveListener = new ZombieMoveListener(gui)

    network.addMessageListener(zombieMoveListener)

    await game.run()

    document.getElementById("connectBtn")!.onclick = async () => {
        await network.connect()
        network.send("hello")
    }

    document.getElementById("disconnectBtn")!.onclick = () => {
        game.stop()
        this.network.disconnect()
    }

    document.getElementById("sendBtn")!.onclick = () => {
        const msg = (document.getElementById("msg") as HTMLInputElement).value
        network.send(msg)
    }
}
