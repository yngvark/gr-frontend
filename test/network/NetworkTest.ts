import {expect} from 'chai';
import {WebsocketHandler} from "../../src/network/WebsocketHandler";
import {TestMessageListener} from "./TestMessageListener";
import {WebsocketNetwork} from "../../src/network/WebsocketNetwork";
import {Broadcaster} from "../../src/network/broadcast/Broadcaster";

describe('Network test', () => {
    it('should notify listeners when message is received', () => {
        const websocketHandler = new TestWebsocketHandler()
        const broadcaster = new Broadcaster()
        const network = new WebsocketNetwork(websocketHandler as unknown as WebsocketHandler, broadcaster)
        const listener = new TestMessageListener()
        broadcaster.addMessageListener("test", listener)

        // When
        websocketHandler.onMessage.call(network, new TestMessageEvent("test", "hello") as MessageEvent)

        // Then
        expect(listener.msgReceived).to.equal("hello")
    });
});

class TestWebsocketHandler {
    onMessage: (event: Event) => void
    private onMessageCaller: any;

    setOnMessage(caller:any, fn: (event: MessageEvent) => void) {
        this.onMessageCaller = caller
        this.onMessage = fn
    }
}

class TestMessageEvent {
    data:string
    type:string

    constructor(type:string, msg:string) {
        this.type = type
        this.data = msg
    }
}