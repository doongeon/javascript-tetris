import { TetrisBlock } from "./TetrisBlock";

export class TetrisBlockGenerator {
  public static getNewBlock() {
    const randomNumber = Math.floor(Math.random() * 10);

    if (randomNumber < 4) {
      return this.getTBlock();
    } else {
      return this.getLBlock();
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
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
      ],
      { x: 4, y: 2 },
      "red"
    );
  }
}
