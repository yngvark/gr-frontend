import {expect} from 'chai';

import {Broadcaster} from "../../../src/network/broadcast/Broadcaster";
import {TestMessageListener} from "../TestMessageListener";

describe('Broadcaster test', () => {
    it('should broadcast', () => {
        let b = new Broadcaster()
        let t = new TestMessageListener()
        b.addMessageListener("test", t)

        let msg = {
            type: "test",
            hello: "hi",
        }

        // When
        b.broadcast(JSON.stringify(msg))

        // Then
        expect(t.msgReceived).to.deep.equal(msg)
    });

    it('should not broadcast', () => {
        let b = new Broadcaster()
        let t = new TestMessageListener()
        b.addMessageListener("test", t)

        let msg = {
            type: "wrongtype",
            hello: "hi",
        }

        // When
        b.broadcast(JSON.stringify(msg))

        // Then
        expect(t.msgReceived).to.be.undefined
    });
});
