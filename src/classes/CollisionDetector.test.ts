import { expect, test } from "vitest";
import { CollisionDetector } from "./CollisionDetector";
import { Map } from "./Map";
import { TetrisBlock } from "./TetrisBlock";

test("왼쪽 벽 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnLeft(map, tetrisBlock)).toBe(false);
  tetrisBlock.moveLeft();
  expect(CollisionDetector.detectCollisionOnLeft(map, tetrisBlock)).toBe(true);
});

test("왼쪽 블록 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnLeft(map, tetrisBlock)).toBe(false);
  tetrisBlock.moveLeft();
  expect(CollisionDetector.detectCollisionOnLeft(map, tetrisBlock)).toBe(true);
});

test("오른쪽 벽 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnRight(map, tetrisBlock)).toBe(
    false
  );
  tetrisBlock.moveRight();
  expect(CollisionDetector.detectCollisionOnRight(map, tetrisBlock)).toBe(true);
});

test("오른쪽 블록 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 1],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnRight(map, tetrisBlock)).toBe(
    false
  );
  tetrisBlock.moveRight();
  expect(CollisionDetector.detectCollisionOnRight(map, tetrisBlock)).toBe(true);
});

test("왼쪽 블록 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnLeft(map, tetrisBlock)).toBe(false);
  tetrisBlock.moveLeft();
  expect(CollisionDetector.detectCollisionOnLeft(map, tetrisBlock)).toBe(true);
});

test("아래쪽 벽 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnBottom(map, tetrisBlock)).toBe(
    false
  );
  tetrisBlock.moveDown();
  expect(CollisionDetector.detectCollisionOnBottom(map, tetrisBlock)).toBe(
    true
  );
});

test("아래쪽 블록 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  expect(CollisionDetector.detectCollisionOnBottom(map, tetrisBlock)).toBe(
    false
  );
  tetrisBlock.moveDown();
  expect(CollisionDetector.detectCollisionOnBottom(map, tetrisBlock)).toBe(
    true
  );
});

test("회전시 벽 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  tetrisBlock.rotate();
  expect(CollisionDetector.detectCollisionOnBottom(map, tetrisBlock)).toBe(
    true
  );
});

test("회전시 블록 충돌 감지", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 1],
  ]);
  const tetrisBlock = new TetrisBlock(
    [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  tetrisBlock.rotate();
  expect(CollisionDetector.detectCollisionOnBottom(map, tetrisBlock)).toBe(
    true
  );
});
