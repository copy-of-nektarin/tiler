import { Collider } from "./collider"
import { Dispenser } from "./dispenser"
import { Glue } from "./dispensers/glue"
import { PackOfTiles } from "./dispensers/packOfTiles"
import { Pan } from "./dispensers/pan"
import { Primer } from "./dispensers/primer"
import { Tile, TileState } from "./dispensers/tile"
import { Water } from "./dispensers/water"
import { Game } from "./main"
import { Player } from "./player"
import { Camera } from "./screen"

export class Level {
    public static isModalActive: boolean = false

    private readonly player: Player = new Player(4, Game.getInstance.getSize * 11 + Game.getInstance.getSize / 2, Game.getInstance.getSize * 3 + Game.getInstance.getSize / 2)
    private readonly collider: Collider = new Collider(this.player)

    private readonly dispenserList: Array<Dispenser> = new Array<Dispenser>(
        new Tile(5 * Game.getInstance.getSize, Game.getInstance.getSize), new Tile(6 * Game.getInstance.getSize, Game.getInstance.getSize), new Tile(7 * Game.getInstance.getSize, Game.getInstance.getSize),
        new Tile(8 * Game.getInstance.getSize, Game.getInstance.getSize), new Tile(9 * Game.getInstance.getSize, Game.getInstance.getSize, TileState.tile), new Tile(5 * Game.getInstance.getSize, Game.getInstance.getSize * 2),
        new Tile(6 * Game.getInstance.getSize, Game.getInstance.getSize * 2), new Tile(7 * Game.getInstance.getSize, Game.getInstance.getSize * 2), new Tile(8 * Game.getInstance.getSize, Game.getInstance.getSize * 2),
        new Tile(9 * Game.getInstance.getSize, Game.getInstance.getSize * 2, TileState.tile), new Tile(5 * Game.getInstance.getSize, Game.getInstance.getSize * 3), new Tile(6 * Game.getInstance.getSize, Game.getInstance.getSize * 3),
        new Tile(7 * Game.getInstance.getSize, Game.getInstance.getSize * 3),
        new Tile(8 * Game.getInstance.getSize, Game.getInstance.getSize * 3), new Tile(9 * Game.getInstance.getSize, Game.getInstance.getSize * 3, TileState.tile), new Tile(5 * Game.getInstance.getSize, Game.getInstance.getSize * 4),
        new Tile(6 * Game.getInstance.getSize, Game.getInstance.getSize * 4), new Tile(7 * Game.getInstance.getSize, Game.getInstance.getSize * 4), new Tile(8 * Game.getInstance.getSize, Game.getInstance.getSize * 4),
        new Tile(9 * Game.getInstance.getSize, Game.getInstance.getSize * 4, TileState.tile), new Tile(5 * Game.getInstance.getSize, Game.getInstance.getSize * 5, TileState.tile), new Tile(6 * Game.getInstance.getSize, Game.getInstance.getSize * 5, TileState.tile),
        new Tile(7 * Game.getInstance.getSize, Game.getInstance.getSize * 5, TileState.tile), new Tile(8 * Game.getInstance.getSize, Game.getInstance.getSize * 5, TileState.tile), new Tile(9 * Game.getInstance.getSize, Game.getInstance.getSize * 5, TileState.tile),
        new Primer(Game.getInstance.getSize * 12, Game.getInstance.getSize), new Glue(Game.getInstance.getSize * 13, Game.getInstance.getSize * 3), new PackOfTiles(Game.getInstance.getSize * 13, Game.getInstance.getSize * 5),
        new Water(Game.getInstance.getSize, Game.getInstance.getSize * 10), new Pan(Game.getInstance.getSize * 5, Game.getInstance.getSize * 10)
    )

    private camera: Camera = new Camera()

    constructor() {
        Game.getInstance.getScreen.setCamera = this.camera
    
        this.dispenserList.forEach((dispenser: Dispenser) => this.player.addDispenser(dispenser))
        this.dispenserList.filter((dispenser: Dispenser) => !(dispenser instanceof Tile)).forEach((dispenser: Dispenser) => this.collider.addShape({
            x: dispenser.getX / Game.getInstance.getSize,
            y: dispenser.getY / Game.getInstance.getSize,
            width: Game.getInstance.getSize / Game.getInstance.getSize,
            height: Game.getInstance.getSize / Game.getInstance.getSize
        }))
        this.collider.addShapeList([
            { x: 4, y: 0, width: 11, height: 1 },
            { x: 4, y: 1, width: 1, height: 5 },
            { x: 10, y: 1, width: 1, height: 2 },
            { x: 10, y: 5, width: 1, height: 1 },
            { x: 14, y: 1, width: 1, height: 6 },
            { x: 0, y: 6, width: 11, height: 1 },
            { x: 14, y: 7, width: 6, height: 1 },
            { x: 0, y: 7, width: 1, height: 5 },
            { x: 19, y: 8, width: 1, height: 4 },
            { x: 0, y: 12, width: 20, height: 1 },
            { x: 1, y: 7, width: 4, height: 1 },
            { x: 1, y: 9, width: 1, height: 3 },
            { x: 4, y: 10, width: 2, height: 2 },
            { x: 6, y: 11, width: 1, height: 1 },
            { x: 15, y: 8, width: 3, height: 1 },
            { x: 15, y: 11, width: 4, height: 1 },
        ])
    }

    public update(): void {
        this.player.update()
        this.collider.update()

        this.camera.moveTo(this.player.getX - Game.getInstance.getScreen.getWidth / 2 - Game.getInstance.getSize / 2, this.player.getY - Game.getInstance.getScreen.getHeight / 2 - Game.getInstance.getSize / 2)

        if (Level.isModalActive) {
            if (Game.getInstance.getScreen.getIsMouseClick) {
                Level.isModalActive = false
            }
        }
    }

    public render(): void {
        Game.getInstance.getScreen.drawImage("room", 0, 0, Game.getInstance.getSize * 20, Game.getInstance.getSize * 13)
        this.dispenserList.forEach((dispenser: Dispenser) => dispenser.render())
        this.player.render()

        if (Level.isModalActive) {
            Game.getInstance.getScreen.setColor("#00000080")
            Game.getInstance.getScreen.fill(0, 0, Game.getInstance.getScreen.getWidth, Game.getInstance.getScreen.getHeight, true)
            Game.getInstance.getScreen.drawImage("pan-photo", 100, 100, Game.getInstance.getScreen.getWidth - 200, Game.getInstance.getScreen.getHeight - 200, true)
        }
    }
}