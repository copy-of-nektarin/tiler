import { Dispenser } from "../dispenser"
import { Level } from "../level"
import { Game } from "../main"
import { Player } from "../player"

export class Pan extends Dispenser {
    protected titleOfUse: string = "Изучить"

    public use(_: Player): void {
        Level.isModalActive = true
    }

    public render(): void {
        Game.getInstance.getScreen.drawImage("pan", this.getX, this.getY, Game.getInstance.getSize, Game.getInstance.getSize)
    }
}