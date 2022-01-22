import {MessageListener} from "../MessageListener";
import {Logger} from "../../Logger";

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
        console.log("-----------------")
        console.log(msg)
        if (msg !instanceof String) {
            this.log.error(msg)
            throw new Error("Invalid type")
        }
        console.log("-----------------2222a")
        let json = JSON.parse(msg)
        console.log("-----------------2222b")

        console.log(json)

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