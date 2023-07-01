import { Dispenser } from "../dispenser"
import { Game } from "../main"
import { Player, Tool } from "../player"

export class Primer extends Dispenser {
    private readonly maxCount: number = 5
    private count: number = this.maxCount

    protected titleOfUse: string = "Взять: грунтовка"

    public use(player: Player): void {
        if (player.getTool == Tool.primer) {
            return
        }

        if (this.count > 0) {
            player.setTool = Tool.primer
            player.sendMessage("Взято: грунтовка")

            this.count -= 1
        } else if (player.getTool == Tool.water) {
            player.setTool = null
            
            this.count = this.maxCount
        } else {
            player.sendMessage("Закончилась вода")
        }
    }

    public render(): void {
        Game.getInstance.getScreen.drawImage(this.count > 0 ? "primer" : "empty", this.getX, this.getY, Game.getInstance.getSize, Game.getInstance.getSize)
    }
}