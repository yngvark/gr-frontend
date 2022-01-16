import {Game} from "./Game";
import {Network} from "./network/Network";
// import {Logger} from "./Logger";
import {WebsocketHandler} from "./network/WebsocketHandler";
import {Gui} from "./Gui";
import {ZombieMoveListener} from "./ZombieMoveListener";
import {WebsocketNetwork} from "./network/WebsocketNetwork";
import {FakeNetwork} from "./network/FakeNetwork";
import {MapCreateListener} from "./draw_map/MapCreateListener";

// const log = Logger.create("index")

document.addEventListener('DOMContentLoaded', async () => {
    await initGame()
}, false);

async function initGame() {
    const backendUrl = (window as any).Gridwalls.backendUrl
    console.log("backendUrl: " + backendUrl)

    let network:Network
    const gui = new Gui(20, 11)
    const game = new Game(gui)
    const zombieMoveListener = new ZombieMoveListener(gui)

    await game.run()

    document.getElementById("connectBtn")!.onclick = async () => {
        network = new WebsocketNetwork(new WebsocketHandler(backendUrl))
        await network.connect()
        network.send("hello")
        network.addMessageListener(zombieMoveListener)
    }

    document.getElementById("fakeConnectBtn")!.onclick = async () => {
        network = new FakeNetwork()
        await network.connect()
        network.send("hello")
        network.addMessageListener(new MapCreateListener(gui))
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
