import { Grid } from "../src/grid";
import { Robot } from "../src/robot";
import { RobotController } from "../src/robotController";
import { CommandRegistry } from "../src/commands";

describe("RobotController", () => {
  let grid: Grid;
  let controller: RobotController;

  beforeEach(() => {
    grid = new Grid(5, 3);
    controller = new RobotController();
  });

  it("should execute a sequence of turn and forward instructions", () => {
    const robot = new Robot(1, 1, "E");
    controller.execute(robot, "RFRFRFRF", grid);
    expect(robot.reportFinalLocation()).toBe("1 1 E");
  });

  it("should fall off the grid, become LOST, and leave a scent", () => {
    const robot = new Robot(3, 2, "N");
    controller.execute(robot, "FRRFLLFFRRFLL", grid);
    expect(robot.reportFinalLocation()).toBe("3 3 N LOST");
    expect(grid.hasScent(3, 3)).toBe(true);
  });

  it("should stop executing instructions immediately after being lost", () => {
    const robot = new Robot(3, 2, "N");
    // The robot falls off the grid on the second forward step (FRRFLLFF... -> F moves to 3,3; next F would move off grid)
    controller.execute(robot, "FFL", grid); // Second F goes off grid, L should be ignored
    expect(robot.reportFinalLocation()).toBe("3 3 N LOST");
    expect(robot.orientation).toBe("N"); // Didn't turn left
  });

  it("should ignore falling off the grid if a scent is already present", () => {
    // First robot goes off grid at (3, 3) facing North
    const robot1 = new Robot(3, 2, "N");
    controller.execute(robot1, "FF", grid);
    expect(robot1.reportFinalLocation()).toBe("3 3 N LOST");
    expect(grid.hasScent(3, 3)).toBe(true);

    // Second robot starts at (0, 3) facing West and moves east, then tries to go north at (3, 3)
    const robot2 = new Robot(0, 3, "W");
    controller.execute(robot2, "LLFFFLFLFL", grid);
    expect(robot2.reportFinalLocation()).toBe("2 3 S");
  });

  it("should allow registering and executing custom commands", () => {
    const registry = new CommandRegistry();
    // Define a custom command 'U' that turns the robot 180 degrees (U-turn)
    const uTurnCommand = {
      execute(robot: Robot): void {
        robot.turnRight();
        robot.turnRight();
      }
    };
    registry.register("U", uTurnCommand);

    const customController = new RobotController(registry);
    const robot = new Robot(1, 1, "E");
    customController.execute(robot, "U", grid);
    expect(robot.orientation).toBe("W");
  });

  it("should throw an error for instructions exceeding 99 characters in length", () => {
    const robot = new Robot(1, 1, "E");
    const longInstructions = "F".repeat(100);
    expect(() => controller.execute(robot, longInstructions, grid)).toThrow(
      "Instruction string length must be less than 100 characters."
    );
  });
});
