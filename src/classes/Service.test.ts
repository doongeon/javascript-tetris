import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import { Service } from "./Service";
import { Grid } from "./Grid";
import { TetrisBlock } from "./TetrisBlock";

/**
 * @jest-environment jsdom
 */

describe("Service 클래스", () => {
  let originalAudioContext: any;

  beforeEach(() => {
    originalAudioContext = window.AudioContext;
    window.AudioContext = vi.fn().mockImplementation(() => ({
      createOscillator: vi.fn().mockReturnValue({
        type: "",
        frequency: {
          setValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      }),
      currentTime: 0,
      destination: {},
    }));
  });

  afterEach(() => {
    window.AudioContext = originalAudioContext;
  });

  test("L스핀 로직", () => {
    const grid = new Grid([
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 0],
      [1, 0, 1, 1],
    ]);
    const tetrisBlock = new TetrisBlock(
      [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ],
      { x: 1, y: 1 }
    );
    const service = new Service(new Grid(), 9999, 0, 9999, () => {});
    service.grid = grid;
    service.movingTetrisBlock = tetrisBlock;
    service.isStart = true;
    service.grid.drawBlock(tetrisBlock);

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 2, 0, 0],
      [0, 2, 1, 1],
      [0, 2, 2, 0],
      [1, 0, 1, 1],
    ]);

    service.rotateBlock();

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 2, 2, 2],
      [1, 2, 1, 1],
    ]);
  });

  test("S스핀 로직 - 1", () => {
    const grid = new Grid([
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 0, 1, 1],
    ]);
    const tetrisBlock = new TetrisBlock(
      [
        [0, 2, 2],
        [2, 2, 0],
        [0, 0, 0],
      ],
      { x: 2, y: 1 }
    );
    const service = new Service(new Grid(), 9999, 0, 9999, () => {});
    service.grid = grid;
    service.movingTetrisBlock = tetrisBlock;
    service.isStart = true;
    service.grid.drawBlock(tetrisBlock);

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 2, 2],
      [0, 2, 2, 1],
      [1, 0, 0, 1],
      [0, 0, 1, 1],
    ]);

    service.rotateBlock();
    service.rotateBlock();

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [1, 2, 2, 1],
      [2, 2, 1, 1],
    ]);
  });

  test("S스핀 로직 - 2", () => {
    const grid = new Grid([
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 0, 1, 1],
    ]);
    const tetrisBlock = new TetrisBlock(
      [
        [0, 2, 2],
        [2, 2, 0],
        [0, 0, 0],
      ],
      { x: 1, y: 1 }
    );
    const service = new Service(new Grid(), 9999, 0, 9999, () => {});
    service.grid = grid;
    service.movingTetrisBlock = tetrisBlock;
    service.isStart = true;
    service.grid.drawBlock(tetrisBlock);

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 2, 2, 0],
      [2, 2, 0, 1],
      [1, 0, 0, 1],
      [0, 0, 1, 1],
    ]);

    service.rotateBlock();
    service.rotateBlock();

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [1, 2, 2, 1],
      [2, 2, 1, 1],
    ]);
  });

  test("I스핀 로직", () => {
    const grid = new Grid([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1],
    ]);
    const tetrisBlock = new TetrisBlock(
      [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      { x: 2, y: 2 }
    );
    const service = new Service(new Grid(), 9999, 0, 9999, () => {});
    service.grid = grid;
    service.movingTetrisBlock = tetrisBlock;
    service.isStart = true;
    service.grid.drawBlock(tetrisBlock);

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 2, 2, 2, 2],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1],
    ]);

    service.rotateBlock();

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 2, 0],
      [0, 0, 0, 2, 0],
      [1, 1, 1, 2, 1],
      [0, 0, 0, 2, 1],
    ]);

    service.rotateBlock();

    expect(service.grid.getGrid()).toStrictEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 0, 1],
      [2, 2, 2, 2, 1],
    ]);
  });
});
