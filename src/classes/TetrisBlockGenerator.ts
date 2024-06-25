import { TetrisBlock } from "./TetrisBlock";

export class TetrisBlockGenerator {
  public static getNewBlock() {
    const randomNumber = Math.floor(Math.random() * 10);

    if (randomNumber < 2) {
      return this.getTBlock();
    } else if (randomNumber < 4) {
      return this.getLBlock();
    } else if (randomNumber < 6) {
      return this.getSquareBlock();
    } else if (randomNumber < 8) {
      return this.getOppositeLBlock();
    } else {
      return this.getIBlock();
    }
  }

  private static getTBlock() {
    return new TetrisBlock(
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      { x: 4, y: 2 },
      "red"
    );
  }

  private static getLBlock() {
    return new TetrisBlock(
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
      { x: 4, y: 2 },
      "red"
    );
  }

  private static getOppositeLBlock() {
    return new TetrisBlock(
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      { x: 4, y: 2 },
      "red"
    );
  }

  private static getSquareBlock() {
    return new TetrisBlock(
      [
        [1, 1],
        [1, 1],
      ],
      { x: 4, y: 2 },
      "red"
    );
  }

  private static getIBlock() {
    return new TetrisBlock(
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      { x: 4, y: 2 },
      "red"
    );
  }
}
