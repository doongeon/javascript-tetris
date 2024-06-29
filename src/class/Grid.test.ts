import { Grid, TetrisBlock } from ".";
import { COLUMN_COUNTS, ROW_COUNTS } from "../Constants";
import { test, expect } from "vitest";

test("파라미터와 Grid 클래스 생성 ", () => {
  try {
    let grid = new Grid([
      [0, 0],
      [0, 0],
    ]);
    expect(grid.getGrid()).toStrictEqual([
      [0, 0],
      [0, 0],
    ]);

    grid = new Grid([
      [0, 0],
      [0, 1],
    ]);

    expect(grid.getGrid()).toStrictEqual([
      [0, 0],
      [0, 1],
    ]);
  } catch (error) {
    console.log(error);
  }
});

test("파라미터 없이 Grid 클래스 생성", () => {
  const grid = new Grid();

  expect(grid.getGrid()).toStrictEqual(
    new Array(ROW_COUNTS).fill(new Array(COLUMN_COUNTS).fill(0))
  );
});

test("isEmptyCell 메서드", () => {
  const grid = new Grid();

  expect(grid.isEmptyCell({ x: 0, y: 0 })).toBe(true);
  expect(grid.isEmptyCell({ x: -1, y: 0 })).toBe(false);
});

test("drawBlock 메서드", () => {
  let grid = new Grid([
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
    { x: 1, y: 1 }
  );

  grid.drawBlock(tetrisBlock);

  expect(grid.getGrid()).toStrictEqual([
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]);
});

test("eraseBlock 메서드", () => {
  const grid = new Grid([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const tetrisBlock = new TetrisBlock(
    [
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    { x: 1, y: 2 }
  );

  grid.drawBlock(tetrisBlock);
  grid.eraseBlock(tetrisBlock);

  expect(grid.getGrid()).toStrictEqual([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
});

test("움직이는 블럭을 그려내는 로직", () => {
  const grid = new Grid([
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
    { x: 1, y: 1 }
  );

  grid.drawBlock(tetrisBlock);
  grid.eraseBlock(tetrisBlock);
  tetrisBlock.moveLeft();
  grid.drawBlock(tetrisBlock);

  expect(grid.getGrid()).toStrictEqual([
    [1, 0, 0],
    [1, 0, 0],
    [0, 0, 0],
  ]);
});

test("clearRow 매서드의 행을 지우는 로직", () => {
  const grid = new Grid([
    [0, 0, 0],
    [0, 0, 0],
    [3, 3, 0],
  ]);

  grid.clearRow();

  expect(grid.getGrid()).toStrictEqual([
    [0, 0, 0],
    [0, 0, 0],
    [3, 3, 0],
  ]);
});

test("clearRow 메서드의 점수 계산 로직", () => {
  const grid = new Grid([
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
  ]);

  expect(grid.clearRow()).toBe(1000);
});
