import { CollisionDetector } from "./CollisionDetector";
import { Map } from "./Map";
import { TetrisBlock } from "./TetrisBlock";
import { TetrisBlockGenerator } from "./TetrisBlockGenerator";

export class Service {
  map: Map;
  tetrisBlocks: TetrisBlock[];
  movingTetrisBlock: TetrisBlock;
  fallingDownInterval: any;
  isHitBottom = false;

  constructor(map: Map) {
    this.map = map;
    this.movingTetrisBlock = this.getNewTetrisBlock();
    this.tetrisBlocks = [...new Array(3)].map((__) => this.getNewTetrisBlock());
    this.map.drawBlock(this.movingTetrisBlock);
    this.fallingDownInterval = this.getFallingDownInterval();
  }

  dropBlock() {
    while (
      !CollisionDetector.detectCollisionOnBottom(
        this.map,
        this.movingTetrisBlock
      )
    ) {
      this.moveBlockDown();
    }
    this.map.clearRow();
    this.setMovingTetrisBlock();
  }

  moveBlockLeft() {
    if (
      CollisionDetector.detectCollisionOnLeft(this.map, this.movingTetrisBlock)
    )
      return;
    this.map.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveLeft();
    this.map.drawBlock(this.movingTetrisBlock);
  }

  moveBlockRight() {
    if (
      CollisionDetector.detectCollisionOnRight(this.map, this.movingTetrisBlock)
    )
      return;
    this.map.eraseBlock(this.movingTetrisBlock);
    this.movingTetrisBlock.moveRight();
    this.map.drawBlock(this.movingTetrisBlock);
  }

  moveBlockDown() {
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
          this.setMovingTetrisBlock();
        }
        console.log("다내려왔거등");
        this.isHitBottom = true;
        return;
      }

      this.isHitBottom = false;
    }, 1000);

    return fallingDownInterval;
  }

  setMovingTetrisBlock() {
    const nextMovingTetrisBlock = this.tetrisBlocks.shift();
    if (!nextMovingTetrisBlock) return;
    this.clearFallingDownInterval();
    this.movingTetrisBlock = nextMovingTetrisBlock;
    this.tetrisBlocks.push(this.getNewTetrisBlock());
    this.map.drawBlock(this.movingTetrisBlock);
    this.fallingDownInterval = this.getFallingDownInterval();
  }
}
