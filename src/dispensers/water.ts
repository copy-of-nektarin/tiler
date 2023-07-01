import { Dispenser } from "../dispenser"
import { Game } from "../main"
import { Player, Tool } from "../player"

export class Water extends Dispenser {
    protected titleOfUse: string = "Взять: вода"

    public use(player: Player): void {
        player.sendMessage("Взято: вода")

        player.setTool = Tool.water
    }

    public render(): void {
        Game.getInstance.getScreen.drawImage("water", this.getX, this.getY, Game.getInstance.getSize, Game.getInstance.getSize)
    }
}