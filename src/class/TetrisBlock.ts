import { BlockPosition, BlockShape } from "./Types";

export default class TetrisBlock {
  shape: BlockShape;
  position: BlockPosition;

  constructor(blockShape: BlockShape, position: BlockPosition) {
    if (blockShape.length !== blockShape[0].length)
      throw Error("only sqaure matrix");

    this.shape = blockShape;
    this.position = position;
  }

  getDeepCopy() {
    const shapeCopy = this.shape.map((row) => [...row]);
    const positionCopy = { ...this.position };
    return new TetrisBlock(shapeCopy, positionCopy);
  }

  getCells() {
    const cells = [];
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[0].length; j++) {
        if (this.shape[i][j] === 0) continue;

        cells.push({ x: this.position.x - 1 + j, y: this.position.y - 1 + i });
      }
    }

    return cells;
  }

  rotate() {
    const newShape = [];
    for (let i = 0; i < this.shape.length; i++) {
      const newRow = [];
      for (let j = this.shape[0].length - 1; j >= 0; j--) {
        newRow.push(this.shape[j][i]);
      }
      newShape.push(newRow);
    }
    this.shape = newShape;
  }

  moveUp() {
    this.position = { ...this.position, y: this.position.y + -1 };
  }

  moveDown() {
    this.position = { ...this.position, y: this.position.y + 1 };
  }

  moveRight() {
    this.position = { ...this.position, x: this.position.x + 1 };
  }

  moveLeft() {
    this.position = { ...this.position, x: this.position.x - 1 };
  }

  print() {
    console.log(this);
  }

  getHeight() {
    return this.shape.length;
  }

  getWidth() {
    return this.shape[0].length;
  }
}
