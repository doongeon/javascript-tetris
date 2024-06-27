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

  public start() {
    this.startDrawInterval();
    this.fallingDownInterval = this.getFallingDownInterval();
    this.isStart = true;
    View.drawPreview(this.tetrisBlocks[0]);
  }

  public dropBlock() {
    if (!this.isStart) return;

    BeepSound.beepDrop();
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

  public moveBlockLeft() {
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

  public moveBlockRight() {
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

  public moveBlockDown() {
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

  /**
   * 1. 움직이는 블록을 그리드에서 지운다.
   * 2. 움직이는 블록을 지운 그리드의 복사본을 생성한다.
   * 3. 움직이는 블록의 복사본을 생성한다.
   * 4. 블록의 복사본을 이동 시킨후 회전하여 충동이 있는지 확인한다.
   * 5. 충돌이 있는지 확인은 그리드 복사본에서 한다.
   * 6. 복사복에서 충돌이 없는 경우 원래 블록을 같은 방식으로 이동시킨후 회전한다.
   * 7. 원래 그리드에서 그린다.
   *
   *  블록 복사본을 이동하는 경우마다 주석을 적기.
   */
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

    //아래 한번 왼쪽 한번 이동후 회전 충돌 확인\
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

    //아래 두번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    //아래 두번 왼쪽 한번 이동후 회전 충돌 확인
    tetrisBlockCopy = this.movingTetrisBlock.getDeepCopy();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveDown();
    tetrisBlockCopy.moveLeft();
    tetrisBlockCopy.rotate();

    if (
      !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.grid)
    ) {
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveDown();
      this.movingTetrisBlock.moveLeft();
      this.movingTetrisBlock.rotate();
      this.grid.drawBlock(this.movingTetrisBlock);
      return;
    }

    // 회전 불가능일시
    this.grid.drawBlock(this.movingTetrisBlock);
    BeepSound.beepDeny();
    return;
  }

  /**
   * this.dropDownIntervalTime 마다 블록을 하래로 한칸 내린다.
   * 더이상 아래로 이동할 수 없는 경우 isHitBottom은 true으로 세팅.
   * 다음 인터벌에도 아래로 이동할 수 없는 경우 다음 블럭으로 진행.
   * 다음 인터벌에 아래로 이동할 수 있는경우 isHitBottom은 false으로 세팅.
   */
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

  /**
   * 다음 블럭으로 이동할때 항상 호출하는 로직
   *
   */
  private next() {
    this.isStart = false; // 다음 블록이 설정 된 후에 컨트롤이 가능하도록 함
    this.score += 5;
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

    // 패배 조건
    // 새로 나온 블럭과 기존 블록이 충돌할 때
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
    this.isStart = true; // 다음 블록이 설정 된 후에 컨트롤이 가능하도록 함
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
