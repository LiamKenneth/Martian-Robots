import { Robot } from "./robot";
import { Grid } from "./grid";
import { CommandRegistry } from "./commands";

export class RobotController {
    private registry: CommandRegistry;

    constructor(registry: CommandRegistry = new CommandRegistry()) {
        this.registry = registry;
    }

    execute(robot: Robot, instructions: string, grid: Grid): void {
        for (const instruction of instructions) {
            if (robot.status === "LOST") {
                break;
            }
            const command = this.registry.get(instruction);
            if (command) {
                command.execute(robot, grid);
            }
        }
    }
}
