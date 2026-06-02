import { Robot } from "../src/robot";

describe("Robot", () => {
  describe("initialization", () => {
    it("should initialize with given coordinates, orientation, and status Active", () => {
      const robot = new Robot(1, 1, "E");
      expect(robot.x).toBe(1);
      expect(robot.y).toBe(1);
      expect(robot.orientation).toBe("E");
      expect(robot.status).toBe("Active");
    });

    it("should throw an error for coordinates outside 0-50", () => {
      expect(() => new Robot(-1, 5, "N")).toThrow("Robot coordinates must be between 0 and 50.");
      expect(() => new Robot(51, 5, "N")).toThrow("Robot coordinates must be between 0 and 50.");
      expect(() => new Robot(5, -1, "N")).toThrow("Robot coordinates must be between 0 and 50.");
      expect(() => new Robot(5, 51, "N")).toThrow("Robot coordinates must be between 0 and 50.");
    });
  });

  describe("turning", () => {
    let robot: Robot;

    beforeEach(() => {
      robot = new Robot(1, 1, "N");
    });

    it("should turn left correctly (N -> W -> S -> E -> N)", () => {
      robot.turnLeft();
      expect(robot.orientation).toBe("W");
      robot.turnLeft();
      expect(robot.orientation).toBe("S");
      robot.turnLeft();
      expect(robot.orientation).toBe("E");
      robot.turnLeft();
      expect(robot.orientation).toBe("N");
    });

    it("should turn right correctly (N -> E -> S -> W -> N)", () => {
      robot.turnRight();
      expect(robot.orientation).toBe("E");
      robot.turnRight();
      expect(robot.orientation).toBe("S");
      robot.turnRight();
      expect(robot.orientation).toBe("W");
      robot.turnRight();
      expect(robot.orientation).toBe("N");
    });
  });

});
