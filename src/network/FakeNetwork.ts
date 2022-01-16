import {MessageListener} from "./MessageListener";

export class FakeNetwork {
    private messageListeners:MessageListener[]

    constructor() {
        this.messageListeners = []
    }

    async connect(): Promise<void> {
    }

    send(msg:string): void {
    }

    disconnect():void {
    }

    addMessageListener(m: MessageListener):void {
        this.messageListeners.push(m)
    }

    private onMessage(e:MessageEvent): void {
        for (const l of this.messageListeners) {
            let json = JSON.parse(e.data)
            l.messageReceived(json)
        }
    }
}
