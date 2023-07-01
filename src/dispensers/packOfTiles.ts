import { Dispenser } from "../dispenser"
import { Game } from "../main"
import { Player, Tool } from "../player"

export class PackOfTiles extends Dispenser {
    protected titleOfUse: string = "Взять: плитка"

    public use(player: Player): void {
        player.sendMessage("Взято: плитка")
        
        player.setTool = Tool.tile        
    }

    public render(): void {
        Game.getInstance.getScreen.drawImage("pack-of-tiles", this.getX, this.getY, Game.getInstance.getSize, Game.getInstance.getSize)
    }
}