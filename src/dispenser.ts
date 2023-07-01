import { Game } from "./main"
import { Player } from "./player"

export class Dispenser {
    protected titleOfUse: string = "Use"
    
    constructor(
        private x: number,
        private y: number
    ) {}

    get getX(): number { return this.x }
    get getY(): number { return this.y }
    get getTitleOfUse(): string { return this.titleOfUse }

    public isInersectWithPlayer(player: Player): boolean {
        return (
            (player.getX + Game.getInstance.getSize > this.x - Game.getInstance.getSize / 2) && (player.getX < this.x + Game.getInstance.getSize + Game.getInstance.getSize / 2) &&
            (player.getY + Game.getInstance.getSize > this.y - Game.getInstance.getSize / 2) && (player.getY < this.y + Game.getInstance.getSize + Game.getInstance.getSize / 2)
        )
    }

    public use(player: Player): void {

    }

    public render(): void {

    }
}