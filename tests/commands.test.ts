import { Grid } from "../src/grid";
import { Robot } from "../src/robot";
import { TurnLeftCommand, TurnRightCommand, MoveForwardCommand, CommandRegistry } from "../src/commands";

describe("Commands", () => {
  let robot: Robot;
  let grid: Grid;

  beforeEach(() => {
    robot = new Robot(1, 1, "N");
    grid = new Grid(5, 5);
  });

  describe("TurnLeftCommand", () => {
    it("should turn the robot left", () => {
      const command = new TurnLeftCommand();
      command.execute(robot);
      expect(robot.orientation).toBe("W");
    });
  });

  describe("TurnRightCommand", () => {
    it("should turn the robot right", () => {
      const command = new TurnRightCommand();
      command.execute(robot);
      expect(robot.orientation).toBe("E");
    });
  });

  describe("MoveForwardCommand", () => {
    it("should move the robot forward", () => {
      const command = new MoveForwardCommand();
      command.execute(robot, grid);
      expect(robot.x).toBe(1);
      expect(robot.y).toBe(2);
    });
  });
});

describe("CommandRegistry", () => {
  it("should register default commands", () => {
    const registry = new CommandRegistry();
    expect(registry.get("L")).toBeInstanceOf(TurnLeftCommand);
    expect(registry.get("R")).toBeInstanceOf(TurnRightCommand);
    expect(registry.get("F")).toBeInstanceOf(MoveForwardCommand);
  });

  it("should allow registering custom commands", () => {
    const registry = new CommandRegistry();
    const customCommand = { execute: jest.fn() };
    registry.register("U", customCommand);
    expect(registry.get("U")).toBe(customCommand);
  });

  it("should return undefined for unregistered commands", () => {
    const registry = new CommandRegistry();
    expect(registry.get("X")).toBeUndefined();
  });
});
