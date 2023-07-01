import { Game } from "./main"
import { Dispenser } from "./dispenser"
import { Timer } from "./timer"
import { Tile, TileState } from "./dispensers/tile"

export enum Tool {
    tile,
    water,
    primer,
    glue    
}

export class Player {
    private oldX: number
    private oldY: number
    
    private tool: Tool | null = null

    private readonly dispenserList: Array<Dispenser> = new Array<Dispenser>()

    private message: string = ""
    private messageTimer: Timer = new Timer(() => false, 2000)

    constructor(
        private readonly speed: number,
        private x: number,
        private y: number
    ) {
        this.oldX = this.x
        this.oldY = this.y
    }

    get getX(): number { return this.x }
    get getY(): number { return this.y }
    get getOldX(): number { return this.oldX }
    get getOldY(): number { return this.oldY }
    get getTool(): Tool | null { return this.tool }

    set setX(x: number) { this.x = x }
    set setY(y: number) { this.y = y }
    set setTool(tool: Tool | null) { this.tool = tool }

    public addDispenser(dispenser: Dispenser) {
        this.dispenserList.push(dispenser)
    }

    public update(): void {
        this.oldX = this.x
        this.oldY = this.y

        if (Game.getInstance.getScreen.isKeyPress("w")) {
            this.y -= this.speed
        }
        
        if (Game.getInstance.getScreen.isKeyPress("s")) {
            this.y += this.speed
        }

        if (Game.getInstance.getScreen.isKeyPress("a")) {
            this.x -= this.speed
        }

        if (Game.getInstance.getScreen.isKeyPress("d")) {
            this.x += this.speed
        }

        if (Game.getInstance.getScreen.isKeyPress("f")) {
            let dispenser: Dispenser

            for (dispenser of this.dispenserList) {
                if (dispenser.isInersectWithPlayer(this)) {
                    dispenser.use(this)
                    break
                }
            }
        }
    }

    public render(): void {
        Game.getInstance.getScreen.setColor("red")
        Game.getInstance.getScreen.fill(this.x, this.y, Game.getInstance.getSize, Game.getInstance.getSize)

        let dispenser: Dispenser

        for (dispenser of this.dispenserList) {
            if (dispenser instanceof Tile) {
                if (dispenser.getTileState == TileState.tile) {
                    continue
                }
            }

            if (dispenser.isInersectWithPlayer(this)) {
                Game.getInstance.getScreen.setColor("red")
                Game.getInstance.getScreen.print(`[F] ${dispenser.getTitleOfUse}`, dispenser.getX + Game.getInstance.getSize / 2, dispenser.getY + Game.getInstance.getSize / 2 - 7, 14, "center")
                break
            }
        }

        if (this.messageTimer.getIsWorking) {
            Game.getInstance.getScreen.setColor("red")
            Game.getInstance.getScreen.print(this.message, Game.getInstance.getScreen.getWidth / 2, Game.getInstance.getScreen.getHeight - 30, 24, "center", true)
        }
    }

    public sendMessage(message: string): void {
        if (this.messageTimer.getIsWorking) {
            this.messageTimer.setTime = 2000
        } else {
            this.messageTimer = new Timer(() => null, 2000)
        }

        this.message = message
    }
}