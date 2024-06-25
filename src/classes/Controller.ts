import { Service } from "./Service";

export class Controller {
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
        break;
      case "ArrowRight":
        this.service.moveBlockRight();
        break;
      case "ArrowDown":
        this.service.moveBlockDown();
        break;
      case "ArrowUp":
        this.service.rotateBlock();
        break;
      case " ":
        this.service.dropBlock();
        break;
    }
  }
}
