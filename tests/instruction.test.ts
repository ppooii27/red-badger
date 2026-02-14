import { Grid, Robot } from "../lib";
import { processInstructions } from "../app";
import { Instruction } from "../types";

describe("Instruction", () => {
  describe("All instruction strings less than 100 characters", () => {
    const grid = new Grid(50, 50);
    it("should accept instructions with exactly 99 characters", () => {
      const robot = new Robot(0, 0, "N");
      const instructions = Array(99).fill("F") as Instruction[];
      expect(() =>
        processInstructions(robot, instructions, grid),
      ).not.toThrow();
    });

    it("should reject instructions with 100 characters", () => {
      const robot = new Robot(0, 0, "N");
      const instructions = Array(100).fill("F") as Instruction[];
      expect(() => processInstructions(robot, instructions, grid)).toThrow(
        "Instruction string must be less than 100 characters",
      );
    });

    it("should reject instructions with more than 100 characters", () => {
      const robot = new Robot(0, 0, "N");
      const instructions = Array(200).fill("F") as Instruction[];
      expect(() => processInstructions(robot, instructions, grid)).toThrow(
        "Instruction string must be less than 100 characters",
      );
    });
  });
});
