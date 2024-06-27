import { BeepSound } from "./BeepSound";
import { CollisionDetector } from "./CollisionDetector";
import { Grid } from "./Grid";
import { TetrisBlock } from "./TetrisBlock";
import { TetrisBlockGenerator } from "./TetrisBlockGenerator";
import { View } from "./View";

export class Service {
  grid: Grid;
  tetrisBlocks: TetrisBlock[];
  movingTetrisBlock: TetrisBlock;
  drawInterval: any;
  fallingDownInterval: any;
  isHitBottom = false;
  dropDownIntervalTime: number;
  isStart = false;
  winScore: number;
  score: number;
  beepSound = new BeepSound();
  callback: ({ score, isWin }: { score: number; isWin: boolean }) => void;

  constructor(
    grid: Grid,
    winScore: number,
    score: number,
    dropDownIntervalTime: number,
    callback: ({ score, isWin }: { score: number; isWin: boolean }) => void
  ) {
    this.grid = grid;
    this.winScore = winScore;
    this.score = score;
    this.movingTetrisBlock = this.getNewTetrisBlock();
    View.drawPreview(this.movingTetrisBlock);
    this.tetrisBlocks = [...new Array(3)].map((__) => this.getNewTetrisBlock());
    this.grid.drawBlock(this.movingTetrisBlock);
    this.dropDownIntervalTime = dropDownIntervalTime;
    this.callback = callback;
  }

  start() {
    this.startDrawInterval();
    this.isStart = true;
    this.fallingDownInterval = this.getFallingDownInterval();
    View.drawPreview(this.tetrisBlocks[0]);
  }

  dropBlock() {
    if (!this.isStart) return;
    BeepSound.beepMove();
    while (
      !CollisionDetector.detectCollisionOnBottom(
        this.grid,
        this.movingTetrisBlock
      )
    ) {
      this.grid.eraseBlock(this.movingTetrisBlock);
      this.movingTetrisBlock.moveDown();
      this.grid.drawBlock(this.movingTetrisBlock);
      View.draw(this.grid);
    }
    this.next();
  }

  moveBlockLeft() {
    if (!this.isStart) return;

    if (
      CollisionDetector.detectCollisionOnLeft(this.grid, this.movingTetrisBlock)
    ) {
      BeepSound.beepDeny();
      return;
    }

    BeepSound.beepMove();
    this.grid.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveLeft();
    this.grid.drawBlock(this.movingTetrisBlock);
  }

  moveBlockRight() {
    if (!this.isStart) return;

    if (
      CollisionDetector.detectCollisionOnRight(
        this.grid,
        this.movingTetrisBlock
      )
    ) {
      BeepSound.beepDeny();
      return;
    }

    BeepSound.beepMove();
    this.grid.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveRight();
    this.grid.drawBlock(this.movingTetrisBlock);
  }

  moveBlockDown() {
    if (!this.isStart) return;

    if (
      CollisionDetector.detectCollisionOnBottom(
        this.grid,
        this.movingTetrisBlock
      )
    ) {
      BeepSound.beepDeny();
      return;
    }

    BeepSound.beepMove();
    this.grid.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveDown();
    this.grid.drawBlock(this.movingTetrisBlock);
  }

  rotateBlock() {
    if (!this.isStart) return;

    this.grid.eraseBlock(this.movingTetrisBlock);
    BeepSound.beepMove();

    // 제자리 회전 충돌 확인
    if (
      !CollisionDetector.detectCollisionOnRotation(
        this.grid,
        this.movingTetrisBlock
      )
    ) {
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 오른쪽 한번 이동후 회전 충돌 확인
    let tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 횐쫀 한번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 왼쪽 한번 위쪽 한번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.moveUp();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.moveUp();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //오른쪽 한번 휘쪽 한번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.moveUp();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.moveUp();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //오른쪽 두번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //왼쪽 두번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //아래 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //아래 한번 왼쪽 한번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //아래 한번 오른쪽 한번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //아래 한번 왼쪽 두번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //아래 한번 오른쪽 두번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.moveRight();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.moveRight();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 회전 불가능일시
    BeepSound.beepDeny();
    this.grid.drawBlock(this.movingTetrisBlock);
    return;
  }

  private getNewTetrisBlock() {
    return TetrisBlockGenerator.getNewBlock();
  }

  private startDrawInterval() {
    this.drawInterval = setInterval(() => {
      View.draw(this.grid);
    }, 16);
  }

  private clearDrawInterval() {
    clearInterval(this.drawInterval);
  }

  private clearFallingDownInterval() {
    this.isHitBottom = false;
    clearInterval(this.fallingDownInterval);
  }

  private getFallingDownInterval() {
    const fallingDownInterval = setInterval(() => {
      if (
        !CollisionDetector.detectCollisionOnBottom(
          this.grid,
          this.movingTetrisBlock
        )
      ) {
        this.grid.eraseBlock(this.movingTetrisBlock);
        this.movingTetrisBlock.moveDown();
        this.grid.drawBlock(this.movingTetrisBlock);
      }

      if (
        CollisionDetector.detectCollisionOnBottom(
          this.grid,
          this.movingTetrisBlock
        )
      ) {
        if (this.isHitBottom) {
          this.next();
        }
        this.isHitBottom = true;
        return;
      }

      this.isHitBottom = false;
    }, this.dropDownIntervalTime);

    return fallingDownInterval;
  }

  private next() {
    this.score += 100;
    this.clearFallingDownInterval();
    this.score += this.grid.clearRow();
    View.draw(this.grid);
    View.writeScore(this.score);

    console.log(this.score, this.winScore);
    if (this.score >= this.winScore) {
      console.log("win!");
      this.win();
      return;
    }

    this.setNextBlock();

    if (
      CollisionDetector.detectCollisionOnStart(
        this.grid,
        this.movingTetrisBlock
      )
    ) {
      console.log("lose!");
      this.lose();
      return;
    }

    this.grid.drawBlock(this.movingTetrisBlock);
    this.fallingDownInterval = this.getFallingDownInterval();
  }

  private setNextBlock() {
    const nextMovingTetrisBlock = this.tetrisBlocks.shift();
    if (!nextMovingTetrisBlock) throw Error("there is no next block");
    View.drawPreview(this.tetrisBlocks[0]);
    this.tetrisBlocks.push(this.getNewTetrisBlock());
    this.movingTetrisBlock = nextMovingTetrisBlock;
  }

  private lose() {
    this.clearDrawInterval();
    this.clearFallingDownInterval();
    this.isStart = false;
    this.callback({ score: this.score, isWin: false });
  }

  private win() {
    this.clearDrawInterval();
    this.clearFallingDownInterval();
    this.isStart = false;
    this.callback({ score: this.score, isWin: true });
  }
}
