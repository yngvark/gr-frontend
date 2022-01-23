import {MessageListener} from "../MessageListener";
import {Logger} from "../../../Logger";

type MessageListeners = {
    [eventType: string]: MessageListener
}

export class Broadcaster {
    private log = Logger.create(this)
    private listeners:MessageListeners = {}

    addMessageListener(key:string, l:MessageListener) {
        this.listeners[key] = l
    }

    broadcast(msg:string) {
        let json = JSON.parse(msg)

        if (!("type" in json)) {
            this.log.debug("Received json", json)
            throw new Error("Cannot broadcast message without type: " + JSON.stringify(json))
        }

        let type = json["type"]
        if (this.listeners[type] === undefined) {
            let keys = Object.keys(this.listeners).join(", ")
            this.log.warn(`No listener for type '${type}'. Valid keys: ${keys}. Msg: ${msg}`)
            return
        }

        this.listeners[type].messageReceived(json)
    }
}