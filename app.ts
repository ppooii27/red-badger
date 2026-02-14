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

function parseGridInput(input: string): Grid {
  const parts = input.trim().split(/\s+/);
  const rawX = Number(parts[0]);
  const rawY = Number(parts[1]);
  const maxX = isNaN(rawX)
    ? CONFIG.GRID_DEFAULT_X
    : Math.min(rawX, CONFIG.GRID_MAX);
  const maxY = isNaN(rawY)
    ? CONFIG.GRID_DEFAULT_Y
    : Math.min(rawY, CONFIG.GRID_MAX);
  return new Grid(maxX, maxY);
}

function parseRobotInput(input: string): Robot | null {
  const parts = input.toUpperCase().trim().split(/\s+/);
  const x = parseInt(parts[0], 10);
  const y = parseInt(parts[1], 10);
  const direction = parts[2] as Direction;

  if (isNaN(x) || isNaN(y) || !["N", "S", "E", "W"].includes(direction)) {
    return null;
  }

  return new Robot(x, y, direction);
}

function parseInstructionInput(input: string): Instruction[] | null {
  const chars = input.toUpperCase().trim().split("");
  if (chars.length === 0) return null;
  if (!chars.every((c) => ["F", "L", "R"].includes(c as Instruction))) {
    return null;
  }
  return chars as Instruction[];
}

export { processInstructions };

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
    const gridInput = await ask("Grid size (e.g 3 5): ");
    const grid = parseGridInput(gridInput);

    /**
     * the following input consists of sequences of position and instructions for each robot
     * position input is in the format: x y orientation (e.g., 1 2 N)
     * instruction input is a string of characters (e.g., FFRLF)
     * all instruction string less than 100 characters
     */

    while (true) {
      let robot: Robot | null = null;
      while (!robot) {
        const posInput = await ask(
          "Robot position & direction (e.g., 1 2 N): ",
        );
        robot = parseRobotInput(posInput);
        if (!robot)
          console.log(
            "Invalid input. Please enter: x y direction (e.g., 1 2 N)",
          );
      }

      let instructions: Instruction[] | null = null;
      while (!instructions) {
        const instrInput = await ask("instructions (e.g., FFRLF): ");
        instructions = parseInstructionInput(instrInput);
        if (!instructions)
          console.log(
            "Invalid input. Please enter F, L, or R only (e.g., FFRLF)",
          );
      }

      // Process and output the result
      const result = processInstructions(robot, instructions, grid);
      console.log("Output: ", result.getPosition());
    }

    // rl.close();
  })();
}
