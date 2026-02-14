import { Grid } from "../lib/Grid";

describe("Grid", () => {
  describe("maximum coordinate is 50", () => {
    it("should cap maxX to 50 when given a larger value", () => {
      const grid = new Grid(100, 3);
      expect(grid.maxX).toBe(50);
      expect(grid.maxY).toBe(3);
    });

    it("should cap maxY to 50 when given a larger value", () => {
      const grid = new Grid(5, 100);
      expect(grid.maxX).toBe(5);
      expect(grid.maxY).toBe(50);
    });

    it("should cap both maxX and maxY to 50", () => {
      const grid = new Grid(999, 999);
      expect(grid.maxX).toBe(50);
      expect(grid.maxY).toBe(50);
    });

    it("should keep values at 50 when exactly 50", () => {
      const grid = new Grid(50, 50);
      expect(grid.maxX).toBe(50);
      expect(grid.maxY).toBe(50);
    });

    it("should keep values below 50 unchanged", () => {
      const grid = new Grid(5, 3);
      expect(grid.maxX).toBe(5);
      expect(grid.maxY).toBe(3);
    });
  });
});
