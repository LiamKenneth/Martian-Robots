import { Robot } from "./robot";
import { Grid } from "./grid";

export interface Command {
    execute(robot: Robot, grid: Grid): void;
}

export class TurnLeftCommand implements Command {
    execute(robot: Robot): void {
        robot.turnLeft();
    }
}

export class TurnRightCommand implements Command {
    execute(robot: Robot): void {
        robot.turnRight();
    }
}

export class MoveForwardCommand implements Command {
    execute(robot: Robot, grid: Grid): void {
        robot.moveForward(grid);
    }
}


export class CommandRegistry {
    private registry = new Map<string, Command>();

    constructor() {
        this.register("L", new TurnLeftCommand());
        this.register("R", new TurnRightCommand());
        this.register("F", new MoveForwardCommand());
    }

    register(char: string, command: Command): void {
        this.registry.set(char, command);
    }

    get(char: string): Command | undefined {
        return this.registry.get(char);
    }
}
