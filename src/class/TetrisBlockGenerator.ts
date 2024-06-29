import { TetrisBlock } from ".";
import { START_POSITION_X, START_POSITION_Y } from "../Constants";

export default class TetrisBlockGenerator {
  public static getNewBlock() {
    const randomNumber = Math.floor(Math.random() * 14);

    if (randomNumber < 2) {
      return this.getOBlock();
    } else if (randomNumber < 4) {
      return this.getLBlock();
    } else if (randomNumber < 6) {
      return this.getJBlock();
    } else if (randomNumber < 8) {
      return this.getTBlock();
    } else if (randomNumber < 10) {
      return this.getZBlock();
    } else if (randomNumber < 12) {
      return this.getSBlock();
    } else {
      return this.getIBlock();
    }
  }

  private static getSBlock() {
    const n = this.getRandomColor();
    return new TetrisBlock(
      [
        [0, n, n],
        [n, n, 0],
        [0, 0, 0],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getZBlock() {
    const n = this.getRandomColor();
    return new TetrisBlock(
      [
        [n, n, 0],
        [0, n, n],
        [0, 0, 0],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getTBlock() {
    const n = this.getRandomColor();
    return new TetrisBlock(
      [
        [0, n, 0],
        [n, n, n],
        [0, 0, 0],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getLBlock() {
    const n = this.getRandomColor();

    return new TetrisBlock(
      [
        [0, 0, n],
        [n, n, n],
        [0, 0, 0],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getJBlock() {
    const n = this.getRandomColor();

    return new TetrisBlock(
      [
        [n, 0, 0],
        [n, n, n],
        [0, 0, 0],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getOBlock() {
    const n = this.getRandomColor();

    return new TetrisBlock(
      [
        [n, n],
        [n, n],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getIBlock() {
    const n = this.getRandomColor();

    return new TetrisBlock(
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [n, n, n, n],
        [0, 0, 0, 0],
      ],
      { x: START_POSITION_X, y: START_POSITION_Y }
    );
  }

  private static getRandomColor() {
    const randomNumber = Math.floor(Math.random() * 5 + 1);

    return randomNumber;
  }
}
