import { Service } from "./Service";

export class Controller {
  // map: Map;
  // tetrisBlock: TetrisBlock;
  service: Service;

  constructor(service: Service) {
    this.service = service;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        this.service.moveBlockLeft();
        this.service.map.printGrid();
        break;
      case "ArrowRight":
        this.service.moveBlockRight();
        this.service.map.printGrid();
        break;
      case "ArrowDown":
        this.service.moveBlockDown();
        this.service.map.printGrid();
        break;
      case "ArrowUp":
        this.service.rotateBlock();
        this.service.map.printGrid();
        break;
      case " ":
        this.service.dropBlock();
        this.service.map.printGrid();
        break;
    }
  }

  // dropBlock() {
  //   while (
  //     !CollisionDetector.detectCollisionOnBottom(this.map, this.tetrisBlock)
  //   ) {
  //     this.moveBlockDown();
  //   }
  //   this.map.clearRow();
  //   this.setNewTetrisBlock();
  // }

  // moveBlockLeft() {
  //   if (CollisionDetector.detectCollisionOnLeft(this.map, this.tetrisBlock))
  //     return;
  //   this.map.eraseBlock(this.tetrisBlock);
  //   this.tetrisBlock.moveLeft();
  //   this.map.drawBlock(this.tetrisBlock);
  // }

  // moveBlockRight() {
  //   if (CollisionDetector.detectCollisionOnRight(this.map, this.tetrisBlock))
  //     return;
  //   this.map.eraseBlock(this.tetrisBlock);
  //   this.tetrisBlock.moveRight();
  //   this.map.drawBlock(this.tetrisBlock);
  // }

  // moveBlockDown() {
  //   if (CollisionDetector.detectCollisionOnBottom(this.map, this.tetrisBlock))
  //     return;
  //   this.map.eraseBlock(this.tetrisBlock);
  //   this.tetrisBlock.moveDown();
  //   this.map.drawBlock(this.tetrisBlock);
  // }

  // rotateBlock() {
  //   this.map.eraseBlock(this.tetrisBlock);

  //   // 제자리 회전
  //   if (
  //     !CollisionDetector.detectCollisionOnRotation(this.map, this.tetrisBlock)
  //   ) {
  //     this.tetrisBlock.rotate();
  //     this.map.drawBlock(this.tetrisBlock);
  //     return;
  //   }

  //   // 오른쪽 한번 이동후 회전
  //   let tetrisBlockCopy = this.tetrisBlock.getDeepCopy();
  //   tetrisBlockCopy.moveRight();
  //   tetrisBlockCopy.rotate();

  //   if (
  //     !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
  //   ) {
  //     this.tetrisBlock.moveRight();
  //     this.tetrisBlock.rotate();
  //     this.map.drawBlock(this.tetrisBlock);
  //     return;
  //   }

  //   // 횐쫀 한번 이동후 회전
  //   tetrisBlockCopy = this.tetrisBlock.getDeepCopy();
  //   tetrisBlockCopy.moveLeft();
  //   tetrisBlockCopy.rotate();

  //   if (
  //     !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
  //   ) {
  //     this.tetrisBlock.moveLeft();
  //     this.tetrisBlock.rotate();
  //     this.map.drawBlock(this.tetrisBlock);
  //     return;
  //   }

  //   // 왼쪽 한번 위쪽 한번 이동후 회전
  //   tetrisBlockCopy = this.tetrisBlock.getDeepCopy();
  //   tetrisBlockCopy.moveLeft();
  //   tetrisBlockCopy.moveUp();
  //   tetrisBlockCopy.rotate();

  //   if (
  //     !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
  //   ) {
  //     this.tetrisBlock.moveLeft();
  //     this.tetrisBlock.moveUp();
  //     this.tetrisBlock.rotate();
  //     this.map.drawBlock(this.tetrisBlock);
  //     return;
  //   }

  //   //오른쪽 한번 휘쪽 한번 이동후 회전
  //   tetrisBlockCopy = this.tetrisBlock.getDeepCopy();
  //   tetrisBlockCopy.moveRight();
  //   tetrisBlockCopy.moveUp();
  //   tetrisBlockCopy.rotate();

  //   if (
  //     !CollisionDetector.checkCollision(tetrisBlockCopy.getCells(), this.map)
  //   ) {
  //     this.tetrisBlock.moveRight();
  //     this.tetrisBlock.moveUp();
  //     this.tetrisBlock.rotate();
  //     this.map.drawBlock(this.tetrisBlock);
  //     return;
  //   }

  //   this.map.drawBlock(this.tetrisBlock);
  //   return;
  // }

  // setNewTetrisBlock() {
  //   this.tetrisBlock = TetrisBlockGenerator.getNewBlock();
  //   this.map.drawBlock(this.tetrisBlock);
  // }
}
