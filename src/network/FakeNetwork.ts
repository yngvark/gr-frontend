import {Broadcaster} from "./broadcast/Broadcaster";
import {Network} from "./Network";

export class FakeNetwork implements Network {
    private broadcaster:Broadcaster

    constructor(broadcaster: Broadcaster) {
        this.broadcaster = broadcaster
    }

    async connect(): Promise<void> {
    }

    send(msg:string): void {
    }

    disconnect():void {
    }

    onMessage(e:MessageEvent): void {
        console.log("-----------------1")
        console.log(e)
        console.log(e.data)
        this.broadcaster.broadcast(e.data)
    }
}
