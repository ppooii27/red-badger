export class Grid {
  readonly maxX: number;
  readonly maxY: number;
  private scents: Set<string>;

  constructor(maxX: number, maxY: number) {
    this.maxX = Math.min(maxX, 50);
    this.maxY = Math.min(maxY, 50);
    this.scents = new Set();
  }

  // Todo: check boundary
  isOutOfBounds(x: number, y: number): boolean {
    return false;
  }
  // Todo: check scent
  hasScent(x: number, y: number): boolean {
    return false;
  }

  addScent(x: number, y: number): void {
    this.scents.add(`${x},${y}`);
  }
}
