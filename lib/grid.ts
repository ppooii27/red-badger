export class Grid {
  readonly maxX: number;
  readonly maxY: number;
  private scents: Set<string>;

  constructor(maxX: number, maxY: number) {
    this.maxX = Math.min(maxX, 50);
    this.maxY = Math.min(maxY, 50);
    this.scents = new Set();
  }

  isOutOfBounds(x: number, y: number): boolean {
    return x < 0 || x > this.maxX || y < 0 || y > this.maxY;
  }

  hasScent(x: number, y: number): boolean {
    return this.scents.has(`${x},${y}`);
  }

  addScent(x: number, y: number): void {
    this.scents.add(`${x},${y}`);
  }
}
