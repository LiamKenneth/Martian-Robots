export class Grid {
    public maxX: number;
    public maxY: number;
    private scents: Set<string>;

    constructor(maxX: number, maxY: number) {
        if (maxX < 0 || maxY < 0 || maxX > 50 || maxY > 50) {
            throw new Error("Grid coordinates must be between 0 and 50.");
        }
        this.maxX = maxX;
        this.maxY = maxY;

        this.scents = new Set();
    }

    isCoordinateOffGrid(x: number, y: number): boolean {
        return x < 0 || y < 0 || x > this.maxX || y > this.maxY;
    }

    leaveScent(x: number, y: number): void {
        this.scents.add(`${x},${y}`);
    }

    hasScent(x: number, y: number): boolean {
        return this.scents.has(`${x},${y}`);
    }
}