export class Timer {
    private isWorking: boolean = true

    constructor(
        private readonly callback: Function,
        private time: number
    ) {
        window.setTimeout(() => {
            this.callback()
            this.isWorking = false
        }, time)
    }

    get getTime(): number { return this.time }
    get getIsWorking(): boolean { return this.isWorking }

    set setTime(time: number) { this.time = time }
}