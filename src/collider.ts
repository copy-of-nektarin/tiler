import { Game } from "./main"
import { Player } from "./player"

interface Shape {
    x: number
    y: number
    width: number
    height: number
}

export class Collider {
    private readonly shapeList: Array<Shape> = new Array<Shape>()

    constructor(
        private readonly player: Player
    ) {}

    public addShape(shape: Shape): void {
        this.shapeList.push(shape)
    }

    public addShapeList(shapeList: Array<Shape>): void {
        this.shapeList.push(...shapeList)
    }

    public removeShape(shape: Shape): void {
        this.shapeList.splice(this.shapeList.indexOf(shape), 1)
    }

    public clear(): void {
        this.shapeList.length = 0
    }

    public update(): void {
        this.shapeList.forEach((shape: Shape) => {
            if (this.player.getOldX < this.player.getX) {
                if (
                    (this.player.getOldX - 1 + Game.getInstance.getSize < shape.x * Game.getInstance.getSize) && (this.player.getX + Game.getInstance.getSize > shape.x * Game.getInstance.getSize) &&
                    (this.player.getY + Game.getInstance.getSize > shape.y * Game.getInstance.getSize) && (this.player.getY < shape.y * Game.getInstance.getSize + shape.height * Game.getInstance.getSize) 
                ) {
                    this.player.setX = shape.x * Game.getInstance.getSize - Game.getInstance.getSize
                }
            }

            if (this.player.getOldX > this.player.getX) {
                if (
                    (this.player.getOldX + 1 > shape.x * Game.getInstance.getSize + shape.width * Game.getInstance.getSize) && (this.player.getX < shape.x * Game.getInstance.getSize + shape.width * Game.getInstance.getSize) &&
                    (this.player.getY + Game.getInstance.getSize > shape.y * Game.getInstance.getSize) && (this.player.getY < shape.y * Game.getInstance.getSize + shape.height * Game.getInstance.getSize) 
                ) {
                    this.player.setX = shape.x * Game.getInstance.getSize + shape.width * Game.getInstance.getSize
                }
            }

            if (this.player.getOldY < this.player.getY) {
                if (
                    (this.player.getOldY - 1 + Game.getInstance.getSize < shape.y * Game.getInstance.getSize) && (this.player.getY + Game.getInstance.getSize > shape.y * Game.getInstance.getSize) &&
                    (this.player.getX + Game.getInstance.getSize > shape.x * Game.getInstance.getSize) && (this.player.getX < shape.x * Game.getInstance.getSize + shape.width * Game.getInstance.getSize) 
                ) {
                    this.player.setY = shape.y * Game.getInstance.getSize - Game.getInstance.getSize
                }
            }

            if (this.player.getOldY > this.player.getY) {
                if (
                    (this.player.getOldY + 1 > shape.y * Game.getInstance.getSize + shape.height * Game.getInstance.getSize) && (this.player.getY < shape.y * Game.getInstance.getSize + shape.height * Game.getInstance.getSize) &&
                    (this.player.getX + Game.getInstance.getSize > shape.x * Game.getInstance.getSize) && (this.player.getX < shape.x * Game.getInstance.getSize + shape.width * Game.getInstance.getSize) 
                ) {
                    this.player.setY = shape.y * Game.getInstance.getSize + shape.height * Game.getInstance.getSize
                }
            }
        })
    }
}