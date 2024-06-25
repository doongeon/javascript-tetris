import { Controller } from "./Controller";
import { Map } from "./Map";
import { Service } from "./Service";
import { Timer } from "./Timer";
import { View } from "./View";

export class Game {
  service: Service;
  controller: Controller;
  round = 1;
  startTime: any;
  timer: Timer;

  constructor() {
    this.serviceCallback = this.serviceCallback.bind(this);

    this.timer = new Timer();
    this.service = new Service(
      new Map(),
      this.getWinScore(),
      0,
      this.getDropDownIntervalTime(),
      this.serviceCallback
    );
    this.controller = new Controller(this.service);
  }

  private serviceCallback({ isWin }: { isWin: boolean }) {
    if (isWin) {
      this.round++;
      View.writeRound(this.round);
      this.setRound();
      this.startRound();
      return;
    }

    this.timer.clearDrawTimeInterval();
  }

  startRound() {
    this.startTime = Date.now();
    this.service.start();
    this.timer.start();
    View.writeRound(this.round);
  }

  private setRound() {
    this.service = new Service(
      this.service.map,
      this.getWinScore(),
      0,
      this.getDropDownIntervalTime(),
      this.serviceCallback
    );
    this.controller = new Controller(this.service);
  }

  getDropDownIntervalTime() {
    if (this.round < 3) return 1000;
    if (this.round < 4) return 700;
    if (this.round < 5) return 500;
    if (this.round < 6) return 500;
    if (this.round < 7) return 300;
    return 200;
  }

  getWinScore() {
    return 5000 + this.round * this.round * 1000;
  }
}
