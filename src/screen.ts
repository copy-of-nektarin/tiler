type KeyMap = Map<string, boolean>
type ImageMap = Map<string, HTMLImageElement>

export class Camera {
    private x: number = 0
    private y: number = 0

    get getX(): number { return this.x }
    get getY(): number { return this.y }

    public moveTo(x: number, y: number): void {
        this.x = x
        this.y = y
    }
}

export class Screen {
    private context: CanvasRenderingContext2D

    private scaleX: number = 1
    private scaleY: number = 1

    private readonly keyList: KeyMap = new Map()
    private isMouseClick: boolean = false

    private camera: Camera | null = null

    private readonly imageList: ImageMap = new Map()
    private isImagesLoaded: boolean = false

    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly width: number,
        private readonly height: number
    ) {
        this.context = this.canvas.getContext("2d")!
        this.resize()

        window.addEventListener("resize", () => this.resize())
        
        window.addEventListener("keydown", (event: KeyboardEvent) => this.keyList.set(event.key.toLowerCase(), true))
        window.addEventListener("keyup", (event: KeyboardEvent) => this.keyList.set(event.key.toLowerCase(), false))

        window.addEventListener("click", () => this.isMouseClick = true)        
    }

    get getWidth(): number { return this.width }
    get getHeight(): number { return this.height }
    get getIsImagesLoaded(): boolean { return this.isImagesLoaded }
    get getIsMouseClick(): boolean { return this.isMouseClick }

    set setCamera(camera: Camera) { this.camera = camera }

    public clear(): void {
        this.context.save()
        this.context.scale(this.scaleX, this.scaleY)
        this.context.clearRect(0, 0, this.width, this.height)
    }

    public update(): void {
        this.context.restore()
        this.isMouseClick = false
    }

    public setColor(color: string) {
        this.context.fillStyle = color
    }

    public fill(x: number, y: number, width: number, height: number, isCameraOff: boolean = false): void {
        if (this.camera != null && !isCameraOff) {
            this.context.fillRect(x - this.camera.getX, y - this.camera.getY, width, height)
        } else {
            this.context.fillRect(x, y, width, height)
        }
    }

    public print(text: string, x: number, y: number, fontSize: number, textAlign: CanvasTextAlign = "left", isCameraOff: boolean = false): void {
        this.context.textAlign = textAlign
        this.context.font = `${fontSize}px Arial`
        
        if (this.camera != null && !isCameraOff) {
            this.context.fillText(text, x - this.camera.getX, y - this.camera.getY)
        } else {
            this.context.fillText(text, x, y)
        }
    }

    public drawImage(imageName: string, x: number, y: number, width: number, height: number, isCameraOff: boolean = false): void {
        try {
            if (this.camera != null && !isCameraOff) {
                this.context.drawImage(this.imageList.get(imageName)!, x - this.camera.getX, y - this.camera.getY, width, height)
            } else {
                this.context.drawImage(this.imageList.get(imageName)!, x, y, width, height)            
            }
        } catch (_) {
            this.drawNoneImage(x, y, width, height, isCameraOff)
        }
    }

    public isKeyPress(key: string): boolean {
        return this.keyList.get(key.toLowerCase()) || false
    }

    public loadImageList(root: string, extension: string, imageNameList: Array<string>): void {
        const promiseList: Array<Promise<unknown>> = new Array()

        imageNameList.forEach((imageName: string) => {
            promiseList.push(new Promise((resolve, _) => {
                const image: HTMLImageElement = new Image()
                image.src = `${root}/${imageName}.${extension}`

                image.addEventListener("load", () => resolve(null))

                this.imageList.set(imageName, image)
            }))
        })

        Promise.all(promiseList).then(() => this.isImagesLoaded = true)
    }

    private resize(): void {
        this.canvas.width = document.documentElement.clientWidth
        this.canvas.height = document.documentElement.clientHeight
        this.context.imageSmoothingEnabled = false
        this.context.textBaseline = "top"

        this.scaleX = this.canvas.width / this.width
        this.scaleY = this.canvas.height / this.height
    }

    private drawNoneImage(x: number, y: number, width: number, height: number, isCameraOff: boolean): void {
        this.setColor("black")
        this.fill(x, y, width, height, isCameraOff)
    }
}