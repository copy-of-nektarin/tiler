import { Level } from "./level"
import { Screen } from "./screen"

export class Game {
    private static instance: Game

    private readonly size: number = 64
    
    private readonly screen: Screen = new Screen(document.querySelector("#canvas") as HTMLCanvasElement, 1980, 1080)
    private level: Level

    constructor() {
        Game.instance = this

        this.screen.loadImageList("/assets", "png", Array.from([
            "pan", "glue", "primer", 
            "pack-of-tiles", "water", "empty", 
            "tile-empty", "tile-glue", "tile-primer", 
            "tile-full", "room", "pan-photo"
        ]))
    
        this.level = new Level()
    }

    static get getInstance(): Game { return Game.instance }

    get getSize(): number { return this.size }
    get getScreen(): Screen { return this.screen }

    public run(): void {
        console.log("Game is running...")

        this.frame()
    }

    private frame(): void {
        window.requestAnimationFrame(() => this.frame())

        this.level.update()

        this.screen.clear()

        if (this.screen.getIsImagesLoaded) {
            this.level.render()
        } else {
            this.screen.setColor("black")
            this.screen.fill(0, 0, this.screen.getWidth, this.screen.getHeight, true)
            this.screen.setColor("white")
            this.screen.print("LOADING", this.screen.getWidth / 2, this.screen.getHeight / 2, 24, "center", true)
        }
        
        this.screen.update()
    }
}

window.addEventListener("load", () => new Game().run())