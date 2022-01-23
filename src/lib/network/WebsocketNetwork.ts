import {WebsocketHandler} from "./WebsocketHandler";
import {Broadcaster} from "./broadcast/Broadcaster";
import {Network} from "./Network";

export class WebsocketNetwork implements Network {
    private websocketHandler:WebsocketHandler
    private broadcaster:Broadcaster

    constructor(websocketHandler: WebsocketHandler, broadcaster: Broadcaster) {
        this.websocketHandler = websocketHandler
        this.websocketHandler.setOnMessage(this, this.onMessage)

        this.broadcaster = broadcaster
    }

    async connect(): Promise<void> {
        return this.websocketHandler.connect()
    }

    send(msg:string): void {
        this.websocketHandler.send(msg)
    }

    disconnect():void {
        this.websocketHandler.disconnect()
    }

    private onMessage(e:MessageEvent): void {
        this.broadcaster.broadcast(e.data)
    }
}
