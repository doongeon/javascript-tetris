import { Grid } from "./Grid";
import { TetrisBlock } from "./TetrisBlock";
import { CellPosition } from "./Types";

export class CollisionDetector {
  public static detectCollisionOnLeft(grid: Grid, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(grid, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlockCopy);
    tetrisBlockCopy.moveLeft();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnRight(grid: Grid, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(grid, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlock);
    tetrisBlockCopy.moveRight();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnBottom(grid: Grid, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(grid, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlock);
    tetrisBlockCopy.moveDown();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnRotation(
    grid: Grid,
    tetrisBlock: TetrisBlock
  ) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(grid, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlock);
    tetrisBlockCopy.rotate();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnStart(
    grid: Grid,
    newTetrisBLock: TetrisBlock
  ) {
    return this.checkCollision(newTetrisBLock.getCells(), grid);
  }

  private static getDeepCopy(grid: Grid, tetrisBlock: TetrisBlock) {
    const mapCopy = grid.getDeepCopy();
    const tetrisBlockCopy = tetrisBlock.getDeepCopy();

    return { mapCopy, tetrisBlockCopy };
  }

  static checkCollision(cells: CellPosition[], mapCopy: Grid) {
    let collision = false;

    cells.forEach((cell) => {
      if (collision) return;

      if (!mapCopy.isEmptyCell(cell)) {
        collision = true;
      }
    });

    return collision;
  }
}
