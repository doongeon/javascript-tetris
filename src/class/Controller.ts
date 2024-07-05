import { Service } from ".";

export default class Controller {
  service: Service;

  constructor(service: Service) {
    this.service = service;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        this.service.moveBlockLeft();
        break;
      case "ArrowRight":
        event.preventDefault();
        this.service.moveBlockRight();
        break;
      case "ArrowDown":
        event.preventDefault();
        this.service.moveBlockDown();
        break;
      case "ArrowUp":
        event.preventDefault();
        this.service.rotateBlock();
        break;
      case " ":
        event.preventDefault();
        this.service.dropBlock();
        break;
    }
  }
}
