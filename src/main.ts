import { Grid } from "./grid";
import { Robot, Orientation } from "./robot";
import { RobotController } from "./robotController";

const INPUT = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

function main() {
    const lines = INPUT.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) return;

    // Parse Grid
    const [maxX, maxY] = lines[0].split(/\s+/).map(Number);
    const grid = new Grid(maxX, maxY);
    const controller = new RobotController();

    // Parse Robots
    for (let i = 1; i < lines.length; i += 2) {
        const [x, y, orientation] = lines[i].split(/\s+/);
        const instructions = lines[i + 1] || "";

        const robot = new Robot(Number(x), Number(y), orientation as Orientation);
        controller.execute(robot, instructions, grid);

        console.log(robot.reportFinalLocation());
    }
}

main();
