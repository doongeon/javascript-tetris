import { expect, test } from "vitest";
import { TetrisBlock } from "./TetrisBlock";

test("TetrisBlock 클래스 getCopy 메서드의 깊은 복사", () => {
  const tetrisBlock = new TetrisBlock(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    { x: 4, y: 2 },
    "red"
  );
  const tetrisBlockCopy = tetrisBlock.getDeepCopy();
  tetrisBlockCopy.moveLeft();

  expect(tetrisBlock.position.x).toBe(4);
});
