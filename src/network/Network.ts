export interface Network {
    connect(): Promise<void>
    send(msg:string): void
    disconnect():void
}