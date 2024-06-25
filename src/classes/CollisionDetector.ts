import { Map } from "./Map";
import { TetrisBlock } from "./TetrisBlock";
import { CellPosition } from "./Types";

export class CollisionDetector {
  public static detectCollisionOnLeft(map: Map, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(map, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlockCopy);
    tetrisBlockCopy.moveLeft();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnRight(map: Map, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(map, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlock);
    tetrisBlockCopy.moveRight();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnBottom(map: Map, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(map, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlock);
    tetrisBlockCopy.moveDown();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnRotation(map: Map, tetrisBlock: TetrisBlock) {
    const { mapCopy, tetrisBlockCopy } = this.getDeepCopy(map, tetrisBlock);
    mapCopy.eraseBlock(tetrisBlock);
    tetrisBlockCopy.rotate();
    const cells = tetrisBlockCopy.getCells();
    return this.checkCollision(cells, mapCopy);
  }

  public static detectCollisionOnStart(map: Map, newTetrisBLock: TetrisBlock) {
    return this.checkCollision(newTetrisBLock.getCells(), map);
  }

  private static getDeepCopy(map: Map, tetrisBlock: TetrisBlock) {
    const mapCopy = map.getDeepCopy();
    const tetrisBlockCopy = tetrisBlock.getDeepCopy();

    return { mapCopy, tetrisBlockCopy };
  }

  static checkCollision(cells: CellPosition[], mapCopy: Map) {
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
