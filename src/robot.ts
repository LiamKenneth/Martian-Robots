import { Grid } from "./grid";

export type Orientation = "N" | "E" | "S" | "W";
export type RobotStatus = "Active" | "LOST";

export class Robot {
    public x: number;
    public y: number;
    public orientation: Orientation;
    public status: RobotStatus;

    constructor(x: number, y: number, orientation: Orientation) {
        if (x < 0 || y < 0 || x > 50 || y > 50) {
            throw new Error("Robot coordinates must be between 0 and 50.");
        }
        this.x = x;
        this.y = y;
        this.orientation = orientation;
        this.status = "Active";
    }

    turnLeft(): void {
        this.orientation = ({ N: "W", W: "S", S: "E", E: "N" } as const)[this.orientation];
    }

    turnRight(): void {
        this.orientation = ({ N: "E", E: "S", S: "W", W: "N" } as const)[this.orientation];
    }

    moveForward(grid: Grid): void {
        let nextX = this.x;
        let nextY = this.y;

        switch (this.orientation) {
            case "N":
                nextY += 1;
                break;
            case "E":
                nextX += 1;
                break;
            case "S":
                nextY -= 1;
                break;
            case "W":
                nextX -= 1;
                break;
        }

        if (grid.isCoordinateOffGrid(nextX, nextY)) {
            if (grid.hasScent(this.x, this.y)) {
                return;
            }
            this.status = "LOST";
            grid.leaveScent(this.x, this.y);
        } else {
            this.x = nextX;
            this.y = nextY;
        }
    }

    reportFinalLocation(): string {
        return `${this.x} ${this.y} ${this.orientation}${this.status === "LOST" ? " LOST" : ""}`;
    }
}