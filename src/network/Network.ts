import {MessageListener} from "./MessageListener";

export interface Network {
    connect(): Promise<void>
    send(msg:string): void
    disconnect():void
    addMessageListener(m: MessageListener):void
}