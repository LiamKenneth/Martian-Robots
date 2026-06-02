import { Grid } from "../src/grid";

describe("Grid", () => {
  describe("initialization", () => {
    it("should store the grid boundaries", () => {
      const grid = new Grid(5, 3);
      expect(grid.maxX).toBe(5);
      expect(grid.maxY).toBe(3);
    });

    it("should throw an error for coordinates outside 0-50", () => {
      expect(() => new Grid(-1, 5)).toThrow("Grid coordinates must be between 0 and 50.");
      expect(() => new Grid(51, 5)).toThrow("Grid coordinates must be between 0 and 50.");
      expect(() => new Grid(5, -1)).toThrow("Grid coordinates must be between 0 and 50.");
      expect(() => new Grid(5, 51)).toThrow("Grid coordinates must be between 0 and 50.");
    });
  });

  describe("isCoordinateOffGrid", () => {
    let grid: Grid;

    beforeEach(() => {
      grid = new Grid(5, 3);
    });

    it("should return false for coordinates within the grid", () => {
      expect(grid.isCoordinateOffGrid(0, 0)).toBe(false);
      expect(grid.isCoordinateOffGrid(3, 2)).toBe(false);
      expect(grid.isCoordinateOffGrid(5, 3)).toBe(false);
    });

    it("should return true for negative coordinates", () => {
      expect(grid.isCoordinateOffGrid(-1, 0)).toBe(true);
      expect(grid.isCoordinateOffGrid(0, -1)).toBe(true);
      expect(grid.isCoordinateOffGrid(-1, -1)).toBe(true);
    });

    it("should return true for coordinates exceeding maxX", () => {
      expect(grid.isCoordinateOffGrid(6, 3)).toBe(true);
    });

    it("should return true for coordinates exceeding maxY", () => {
      expect(grid.isCoordinateOffGrid(5, 4)).toBe(true);
    });
  });

  describe("scents", () => {
    let grid: Grid;

    beforeEach(() => {
      grid = new Grid(5, 3);
    });

    it("should not have a scent initially", () => {
      expect(grid.hasScent(3, 3)).toBe(false);
    });

    it("should store scent at a given coordinate", () => {
      grid.leaveScent(3, 3);
      expect(grid.hasScent(3, 3)).toBe(true);
    });

    it("should only report scent for the exact coordinates where it was left", () => {
      grid.leaveScent(3, 3);
      expect(grid.hasScent(3, 2)).toBe(false);
      expect(grid.hasScent(2, 3)).toBe(false);
      expect(grid.hasScent(3, 3)).toBe(true);
    });
  });
});
