import {Logger} from "../../Logger";

const acceleration = 2;
const velocity = 1;
const gridWidth = 48;

export class Player {
    x:number = 0;
    y:number = 0;

    private change:boolean;
    private xExact:number = 0;
    private yExact:number = 0;
    private log = Logger.create(this)

    resetChange() {
        this.change = false
    }

    hasChanged() {
        return this.change;
    }

    moveLeft() {
        this.xExact -= acceleration
        this.x = this.getCoord(this.xExact)
        this.change = true
    }

    moveRight() {
        this.xExact += acceleration
        this.x = this.getCoord(this.xExact)
        this.change = true
    }

    moveUp() {
        this.yExact -= acceleration
        this.y = this.getCoord(this.yExact)
        this.change = true
    }

    moveDown() {
        this.yExact += acceleration
        this.y = this.getCoord(this.yExact)
        this.change = true
    }

    private getCoord(exact: number) {
        // let result = Math.floor(exact / gridWidth) * gridWidth
        let result = exact
        // this.log.info(exact, result)

        return result
    }
}
