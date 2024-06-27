import { BeepSound } from "./BeepSound";
import { COLUMN_COUNTS, ROW_COUNTS } from "./Constants";
import { TetrisBlock } from "./TetrisBlock";

export class Grid {
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

        if (
          tetrisBlock.position.x - 1 + j < 0 ||
          tetrisBlock.position.x - 1 + j > this.grid[0].length - 1 ||
          tetrisBlock.position.y - 1 + i < 0 ||
          tetrisBlock.position.y - 1 + i > this.grid.length - 1
        )
          continue;

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

        if (
          movingBlock.position.x - 1 + j < 0 ||
          movingBlock.position.x - 1 + j > this.grid[0].length - 1 ||
          movingBlock.position.y - 1 + i < 0 ||
          movingBlock.position.y - 1 + i > this.grid.length - 1
        ) {
          continue;
        }

        this.grid[movingBlock.position.y - 1 + i][
          movingBlock.position.x - 1 + j
        ] = movingBlock.shape[i][j];
      }
    }
  }

  public clearRow() {
    let score = 0;
    for (let i = this.grid.length - 1; i > 0; i--) {
      let bonus = 0;
      if (!this.grid[i].includes(0)) {
        while (!this.grid[i].includes(0)) {
          bonus++;
          BeepSound.beepClearRow(bonus);
          for (let j = i - 1; j >= 0; j--) {
            this.grid[j + 1] = this.grid[j];
          }

          this.grid[0] = new Array(this.grid[0].length).fill(0); // 가장 위 행은 포문에서 설정되지 않아 따로 설정함'
        }
      }
      score += 1000 * bonus * bonus;
    }

    return score;
  }

  public isEmptyCell({ x, y }: { x: number; y: number }) {
    if (x < 0 || x > this.grid[0].length - 1) return false; // 블럭이 있는거처럼 표현
    if (y < 0 || y > this.grid.length - 1) return false; // 블럭이 있는거처럼 표현
    if (this.grid[y][x] !== 0) return false;

    return true;
  }

  public printGrid() {
    console.log(JSON.parse(JSON.stringify(this.grid)));
  }

  public getDeepCopy() {
    const gridCopy = this.grid.map((row) => [...row]);
    return new Grid(gridCopy);
  }
}
