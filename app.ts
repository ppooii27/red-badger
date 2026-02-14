import { Direction, Instruction } from "./types";
import { CONFIG } from "./config";
import { Grid, Robot } from "./lib";

function processInstructions(
  robot: Robot,
  instructions: Instruction[],
  grid: Grid,
): Robot {
  if (instructions.length > CONFIG.MAX_INSTRUCTION_LENGTH) {
    throw new Error(
      `Instruction string must be less than 100 characters (got ${instructions.length})`,
    );
  }
  for (const instruction of instructions) {
    switch (instruction) {
      case "F":
        robot.moveForward(grid);
        break;
      case "L":
        robot.turnLeft();
        break;
      case "R":
        robot.turnRight();
        break;
      default:
        throw new Error(`Unknown instruction: ${instruction}`);
    }
  }
  return robot;
}

if (require.main === module) {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question: string): Promise<string> =>
    new Promise((resolve) => rl.question(question, resolve));

  (async () => {
    /**
     * first line of input is the upper-right coordinates of the grid
     * ask for the grid size (max coordinate value is 50)
     */
    const gridInput = await ask("Please input the grid size (x, y): ");
    const [maxX, maxY] = gridInput
      .trim()
      .split(/\s+/)
      .map((num) => Math.min(Number(num), CONFIG.GRID_MAX));
    const grid = new Grid(maxX, maxY);

    /**
     * the following input consists of sequences of position and instructions for each robot
     * position input is in the format: x y orientation (e.g., 1 2 N)
     * instruction input is a string of characters (e.g., FFRLF)
     * all instruction string less than 100 characters
     */

    while (true) {
      const posInput = await ask("position & direction (e.g., 1 2 N): ");
      const instrInput = await ask("instructions (e.g., FFRLF): ");

      const parts = posInput.toUpperCase().trim().split(/\s+/);
      const robot = new Robot(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10),
        parts[2] as Direction,
      );

      const instructions = instrInput
        .toLocaleUpperCase()
        .trim()
        .split("") as Instruction[];

      // Process and output the result
      const result = processInstructions(robot, instructions, grid);
      console.log(result.getPosition());
    }

    // rl.close();
  })();
}
