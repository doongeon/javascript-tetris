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
  score = 0;
  callback: () => void;

  constructor(callback: () => void) {
    this.serviceCallback = this.serviceCallback.bind(this);
    this.callback = callback;
    this.timer = new Timer();
    this.service = new Service(
      new Grid(),
      this.getWinScore(),
      this.score,
      this.getDropDownIntervalTime(),
      this.serviceCallback
    );
    this.controller = new Controller(this.service);
  }

  private serviceCallback({ score, isWin }: { score: number; isWin: boolean }) {
    if (isWin) {
      this.round++;
      this.score = score;
      while (this.score > this.getWinScore()) {
        this.round++;
        View.writeRound(this.round);
      }

      View.writeRound(this.round);
      this.nextRound();
      return;
    }

    this.timer.clearDrawTimeInterval();
    this.callback();
  }

  startRound() {
    this.startTime = Date.now();
    this.service.start();
    this.timer.start();
    View.writeRound(this.round);
  }

  nextRound() {
    setTimeout(() => {
      this.setNextRound();
      this.startNextRound();
    }, 1000);
  }

  private setNextRound() {
    this.service = new Service(
      new Grid(),
      this.getWinScore(),
      this.score,
      this.getDropDownIntervalTime(),
      this.serviceCallback
    );
    this.controller = new Controller(this.service);
  }

  private startNextRound() {
    this.service.start();
  }

  getDropDownIntervalTime() {
    const dropDownIntervalTime = 1000 - 100 * this.round;
    return Math.max(dropDownIntervalTime, 400);
  }

  getWinScore() {
    return 3000 + this.round * this.round * 1000;
  }
}
