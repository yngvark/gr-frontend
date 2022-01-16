import {MessageListener} from "../../src/network/MessageListener";

export
class TestMessageListener implements MessageListener {
    msgReceived:any

    messageReceived(json: any) {
        this.msgReceived = json
    }
}
