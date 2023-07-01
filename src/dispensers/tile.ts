import { Dispenser } from "../dispenser"
import { Game } from "../main"
import { Player, Tool } from "../player"

export enum TileState {
    empty,
    primer,
    glue,
    tile
}

export class Tile extends Dispenser {
    protected titleOfUse: string = "Использовать"

    constructor(x: number, y: number,
        private state: TileState = TileState.empty
    ) {
        super(x, y)
    }

    get getTileState(): TileState { return this.state }

    public use(player: Player): void {
        if (this.state == TileState.empty) {
            if (player.getTool == Tool.primer) {
                player.sendMessage("Использовано: грунтовка")
                player.setTool = null

                this.state = TileState.primer
            } else {
                player.sendMessage("Нужно: грунтовка")
            }
        } else if (this.state == TileState.primer) {
            if (player.getTool == Tool.glue) {
                player.sendMessage("Использовано: клей")
                player.setTool = null

                this.state = TileState.glue
            } else {
                player.sendMessage("Нужно: клей")
            }
        } else if (this.state == TileState.glue) {
            if (player.getTool == Tool.tile) {
                player.sendMessage("Использовано: плитка")
                player.setTool = null

                this.state = TileState.tile
            } else {
                player.sendMessage("Нужно: плитка")
            }
        }
    }

    public render(): void {
        let imageName: string = "empty"
        
            
        if (this.state == TileState.primer) {
            imageName = "primer"
        } else if (this.state == TileState.glue) {
            imageName = "glue"
        } else if (this.state == TileState.tile) {
            imageName = "full"
        }

        Game.getInstance.getScreen.drawImage(`tile-${imageName}`, this.getX, this.getY, Game.getInstance.getSize, Game.getInstance.getSize)
    }
}