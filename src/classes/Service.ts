import { CollisionDetector } from "./CollisionDetector";
import { Map } from "./Map";
import { TetrisBlock } from "./TetrisBlock";
import { TetrisBlockGenerator } from "./TetrisBlockGenerator";
import { View } from "./View";

export class Service {
  map: Map;
  tetrisBlocks: TetrisBlock[];
  movingTetrisBlock: TetrisBlock;
  drawInterval: any;
  fallingDownInterval: any;
  isHitBottom = false;
  dropDownIntervalTime: number;
  isStart = false;
  winScore: number;
  score: number;
  callback: ({ score, isWin }: { score: number; isWin: boolean }) => void;

  constructor(
    map: Map,
    winScore: number,
    score: number,
    dropDownIntervalTime: number,
    callback: ({ score, isWin }: { score: number; isWin: boolean }) => void
  ) {
    this.map = map;
    this.winScore = winScore;
    this.score = score;
    this.movingTetrisBlock = this.getNewTetrisBlock();
    View.drawPreview(this.movingTetrisBlock);
    this.tetrisBlocks = [...new Array(3)].map((__) => this.getNewTetrisBlock());
    this.map.drawBlock(this.movingTetrisBlock);
    View.drawPreview(this.tetrisBlocks[0]);
    this.dropDownIntervalTime = dropDownIntervalTime;
    this.callback = callback;
  }

  start() {
    this.drawInterval = setInterval(() => {
      View.draw(this.map);
    }, 16);
    this.isStart = true;
    this.fallingDownInterval = this.getFallingDownInterval();
  }

  dropBlock() {
    if (!this.isStart) return;
    while (
      !CollisionDetector.detectCollisionOnBottom(
        this.map,
        this.movingTetrisBlock
      )
    ) {
      this.moveBlockDown();
      View.draw(this.map);
    }
    this.next();
  }

  moveBlockLeft() {
    if (!this.isStart) return;

    if (
      CollisionDetector.detectCollisionOnLeft(this.map, this.movingTetrisBlock)
    )
      return;
    this.map.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveLeft();
    this.map.drawBlock(this.movingTetrisBlock);
  }

  moveBlockRight() {
    if (!this.isStart) return;

    if (
      CollisionDetector.detectCollisionOnRight(this.map, this.movingTetrisBlock)
    )
      return;
    this.map.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveRight();
    this.map.drawBlock(this.movingTetrisBlock);
  }

  moveBlockDown() {
    if (!this.isStart) return;

    if (
      CollisionDetector.detectCollisionOnBottom(
        this.map,
        this.movingTetrisBlock
      )
    )
      return;
    this.map.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveDown();
    this.map.drawBlock(this.movingTetrisBlock);
  }

  rotateBlock() {
    if (!this.isStart) return;

    this.map.eraseBlock(this.movingTetrisBlock);

    // 제자리 회전
    if (
      !CollisionDetector.detectCollisionOnRotation(
        this.map,
        this.movingTetrisBlock
      )
    ) {
      this.movingTetrisBlock.rotate();
      this.map.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 오른쪽 한번 이동후 회전
    let tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
    ) {
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.rotate();
      this.map.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 횐쫀 한번 이동후 회전
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
    ) {
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.rotate();
      this.map.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 왼쪽 한번 위쪽 한번 이동후 회전
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.moveUp();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
    ) {
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.moveUp();
      this.movingTetrisBlock.rotate();
      this.map.drawBlock(this.movingTetrisBlock);
      return;
    }

    //오른쪽 한번 휘쪽 한번 이동후 회전
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.moveUp();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
    ) {
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.moveUp();
      this.movingTetrisBlock.rotate();
      this.map.drawBlock(this.movingTetrisBlock);
      return;
    }

    this.map.drawBlock(this.movingTetrisBlock);
    return;
  }

  getNewTetrisBlock() {
    return TetrisBlockGenerator.getNewBlock();
  }

  clearFallingDownInterval() {
    this.isHitBottom = false;
    clearInterval(this.fallingDownInterval);
  }

  clearDrawInterval() {
    clearInterval(this.drawInterval);
  }

  getFallingDownInterval() {
    const fallingDownInterval = setInterval(() => {
      this.moveBlockDown();
      if (
        CollisionDetector.detectCollisionOnBottom(
          this.map,
          this.movingTetrisBlock
        )
      ) {
        if (this.isHitBottom) {
          this.next();
        }
        console.log("다내려왔거등");
        this.isHitBottom = true;
        return;
      }

      this.isHitBottom = false;
    }, this.dropDownIntervalTime);

    return fallingDownInterval;
  }

  next() {
    this.score += 100;
    this.clearFallingDownInterval();
    this.score += this.map.clearRow();
    View.draw(this.map);
    View.writeScore(this.score);

    console.log(this.score, this.winScore);
    if (this.score >= this.winScore) {
      console.log("win!");
      this.win();
      return;
    }

    this.setNextBlock();

    if (
      CollisionDetector.detectCollisionOnStart(this.map, this.movingTetrisBlock)
    ) {
      console.log("lose!");
      this.lose();
      return;
    }

    this.map.drawBlock(this.movingTetrisBlock);
    this.fallingDownInterval = this.getFallingDownInterval();
  }

  setNextBlock() {
    const nextMovingTetrisBlock = this.tetrisBlocks.shift();
    if (!nextMovingTetrisBlock) throw Error("there is no next block");
    View.drawPreview(this.tetrisBlocks[0]);
    this.tetrisBlocks.push(this.getNewTetrisBlock());
    this.movingTetrisBlock = nextMovingTetrisBlock;
  }

  lose() {
    this.clearDrawInterval();
    this.clearFallingDownInterval();
    this.isStart = false;
    this.callback({ score: this.score, isWin: false });
  }

  win() {
    this.clearDrawInterval();
    this.clearFallingDownInterval();
    this.isStart = false;
    this.callback({ score: this.score, isWin: true });
  }
}
