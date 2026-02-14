import { Direction } from "../types";
import { Grid } from "./Grid";

/**
 * The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).
 */
const MOVES: Record<Direction, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  S: { x: 0, y: -1 },
  E: { x: 1, y: 0 },
  W: { x: -1, y: 0 },
};

const LEFT: Record<Direction, Direction> = { N: "W", W: "S", S: "E", E: "N" };
const RIGHT: Record<Direction, Direction> = { N: "E", E: "S", S: "W", W: "N" };

export class Robot {
  x: number;
  y: number;
  direction: Direction;
  lost: boolean;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.lost = false;
  }

  turnLeft(): void {
    this.direction = LEFT[this.direction];
  }

  turnRight(): void {
    this.direction = RIGHT[this.direction];
  }

  moveForward(grid: Grid): void {
    const move = MOVES[this.direction];
    const newX = this.x + move.x;
    const newY = this.y + move.y;

    if (grid.isOutOfBounds(newX, newY)) {
      // if the robot moves off the grid and there is scent at the current position, ignore the instruction
      if (grid.hasScent(this.x, this.y)) return;
      grid.addScent(this.x, this.y);
      this.lost = true;
      return;
    }

    this.x = newX;
    this.y = newY;
  }

  lose(): void {
    this.lost = true;
  }

  getPosition(): string {
    return `${this.x} ${this.y} ${this.direction} ${this.lost ? "LOST" : ""}`.trim();
  }
}
