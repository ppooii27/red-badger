import { Direction } from "../types";

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

  // todo: turn left
  turnLeft(): void {}

  // todo: turn right
  turnRight(): void {}

  // todo: move forward
  moveForward(): void {}

  // todo: lose the robot
  lose(): void {
    this.lost = true;
  }
}
