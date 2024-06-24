import { COLUMN_COUNTS, ROW_COUNTS } from "./Constants";
import { TetrisBlock } from "./TetrisBlock";

export class Map {
  private rowCounts = ROW_COUNTS;
  private columnCounts = COLUMN_COUNTS;
  grid: number[][] = [];

  constructor(grid?: number[][]) {
    if (grid) {
      this.grid = grid;
    } else {
      this.grid = this.createEmptyGrid();
    }
  }

  getGrid() {
    return this.grid;
  }

  private createEmptyGrid() {
    const newGrid = [];
    for (let i = 0; i < this.rowCounts; i++) {
      const newRow = [];
      for (let j = 0; j < this.columnCounts; j++) {
        newRow.push(0);
      }
      newGrid.push(newRow);
    }
    return newGrid;
  }

  public eraseBlock(tetrisBlock: TetrisBlock) {
    const blockHeight = tetrisBlock.shape.length;
    const blockWidth = tetrisBlock.shape[0].length;
    for (let i = 0; i < blockHeight; i++) {
      for (let j = 0; j < blockWidth; j++) {
        if (tetrisBlock.shape[i][j] === 0) continue;

        this.grid[tetrisBlock.position.y - 1 + i][
          tetrisBlock.position.x - 1 + j
        ] = 0;
      }
    }
  }

  public drawBlock(movingBlock: TetrisBlock) {
    const blockHeight = movingBlock.shape.length;
    const blockWidth = movingBlock.shape[0].length;
    for (let i = 0; i < blockHeight; i++) {
      for (let j = 0; j < blockWidth; j++) {
        if (movingBlock.shape[i][j] === 0) continue;

        this.grid[movingBlock.position.y - 1 + i][
          movingBlock.position.x - 1 + j
        ] = 1;
      }
    }
  }

  public clearRow() {
    let isRowClear = false;

    for (let i = this.grid.length - 1; i > 0; i--) {
      if (this.grid[i].reduce((a, b) => a + b) === this.grid[0].length) {
        isRowClear = true;
        while (this.grid[i].reduce((a, b) => a + b) === this.grid[0].length) {
          for (let j = i - 1; j >= 0; j--) {
            this.grid[j + 1] = this.grid[j];
          }
        }
      }
    }

    if (isRowClear) this.grid[0] = new Array(this.grid[0].length).fill(0); // 가장 위 행은 포문에서 설정되지 않아 따로 설정함
  }

  public isEmptyCell({ x, y }: { x: number; y: number }) {
    if (x < 0 || x >= this.grid[0].length) return false; // 블럭이 있는거처럼 표현
    if (y < 0 || y > this.grid.length - 1) return false; // 블럭이 있는거처럼 표현
    if (this.grid[y][x] === 1) return false;

    return true;
  }

  public printGrid() {
    console.log(JSON.parse(JSON.stringify(this.grid)));
  }

  public getDeepCopy() {
    const gridCopy = this.grid.map((row) => [...row]);
    return new Map(gridCopy);
  }
}
