import {Game} from "./Game";
import {Network} from "./lib/network/Network";
import {WebsocketHandler} from "./lib/network/WebsocketHandler";
import {Gui} from "./Gui";
import {ZombieMoveListener} from "./ZombieMoveListener";
import {WebsocketNetwork} from "./lib/network/WebsocketNetwork";
import {FakeNetwork} from "./lib/network/FakeNetwork";
import {MapCreateListener} from "./features/draw_map/MapCreateListener";
import {MapGui} from "./features/draw_map/MapGui";
import {Broadcaster} from "./lib/network/broadcast/Broadcaster";

// const log = Logger.create("index")

document.addEventListener('DOMContentLoaded', async () => {
    await initGame()
}, false);

async function initGame() {
    const backendUrl = (window as any).Gridwalls.backendUrl

    let network:Network
    let broadcaster = new Broadcaster()

    const gui = new Gui(20, 11)
    const mapGui = new MapGui(gui)

    broadcaster.addMessageListener("zombieMove", new ZombieMoveListener(gui))
    broadcaster.addMessageListener(MapCreateListener.type, new MapCreateListener(mapGui))

    const game = new Game(gui)
    await game.run()

    document.getElementById("connectBtn")!.onclick = async () => {
        network = new WebsocketNetwork(new WebsocketHandler(backendUrl), broadcaster)
        await network.connect()
        connect(network)
    }

    document.getElementById("fakeConnectBtn")!.onclick = async () => {
        let fakeNetwork = new FakeNetwork(broadcaster)
        network = fakeNetwork

        await network.connect()
        connect(network)

        let msg:any = {
            data: JSON.stringify({
                type: MapCreateListener.type,
                hello: "hi there",
            }),
        }

        fakeNetwork.onMessage(msg)
    }

    document.getElementById("disconnectBtn")!.onclick = () => {
        game.stop()
        network.disconnect()
    }

    document.getElementById("sendBtn")!.onclick = () => {
        const msg = (document.getElementById("msg") as HTMLInputElement).value
        network.send(msg)
    }

}

function connect(network: Network) {
    network.send("start")
}
