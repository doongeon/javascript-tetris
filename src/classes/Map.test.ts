import { Map } from "./Map";
import { test, expect } from "vitest";
import { TetrisBlock } from "./TetrisBlock";
import { COLUMN_COUNTS, ROW_COUNTS } from "./Constants";

test("파라미터와 Map 클래스 생성 ", () => {
  let map = new Map([
    [0, 0],
    [0, 0],
  ]);

  expect(map.getGrid()).toStrictEqual([
    [0, 0],
    [0, 0],
  ]);

  map = new Map([
    [0, 0],
    [0, 1],
  ]);

  expect(map.getGrid()).toStrictEqual([
    [0, 0],
    [0, 1],
  ]);
});

test("파라미터 없이 Map 클래스 생성", () => {
  const map = new Map();

  expect(map.getGrid()).toStrictEqual(
    new Array(ROW_COUNTS).fill(new Array(COLUMN_COUNTS).fill(0))
  );
});

test("isEmptyCell 메서드", () => {
  const map = new Map();

  expect(map.isEmptyCell({ x: 0, y: 0 })).toBe(true);
  expect(map.isEmptyCell({ x: -1, y: 0 })).toBe(false);
});

test("drawBlock 메서드", () => {
  let map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  let tetrisBlock = new TetrisBlock(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  map.drawBlock(tetrisBlock);

  expect(map.getGrid()).toStrictEqual([
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);
});

test("eraseBlock 메서드", () => {
  const map = new Map([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const tetrisBlock = new TetrisBlock(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    { x: 1, y: 1 },
    "red"
  );

  map.drawBlock(tetrisBlock);
  map.eraseBlock(tetrisBlock);

  expect(map.getGrid()).toStrictEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test("움직이는 블럭을 그려내는 로직", () => {
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

  map.drawBlock(tetrisBlock);
  map.eraseBlock(tetrisBlock);
  tetrisBlock.moveLeft();
  map.drawBlock(tetrisBlock);

  expect(map.getGrid()).toStrictEqual([
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
  ]);
});

test("clearRow 메서드", () => {
  const map = new Map([
    [1, 0, 0],
    [1, 1, 1],
    [1, 1, 1],
  ]);

  map.clearRow();

  expect(map.getGrid()).toStrictEqual([
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ]);
});
