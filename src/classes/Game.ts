import { Controller } from "./Controller";
import { Grid } from "./Grid";
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
      new Grid(),
      this.getWinScore(),
      0,
      this.getDropDownIntervalTime(),
      this.serviceCallback
    );
    this.controller = new Controller(this.service);
  }

  private serviceCallback({ isWin }: { isWin: boolean }) {
    if (this.round === 5) {
      this.timer.clearDrawTimeInterval();
      return;
    }
    if (isWin) {
      this.round++;
      View.writeRound(this.round);
      this.nextRound();
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

  private nextRound() {
    this.service.dropDownIntervalTime = this.getDropDownIntervalTime();
    this.service.winScore = this.getWinScore();
    this.service.start();
  }

  getDropDownIntervalTime() {
    if (this.round < 2) return 1000;
    if (this.round < 4) return 700;
    if (this.round < 5) return 500;
    return 200;
  }

  getWinScore() {
    return 5000 + this.round * this.round * 1000;
  }
}
