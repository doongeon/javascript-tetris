import { Controller, Grid, Service, Timer, View } from ".";
import { ServiceCallbackProps } from "./Types";
import {
  renderRestartBtn,
  renderRoundPopup,
  removeRoundPopup,
} from "../components/index";

export default class Game {
  service?: Service;
  controller?: Controller;
  round = 1;
  roundSkipCount = 0;
  startTime?: number;
  timer: Timer;
  score = 0;

  constructor() {
    this.serviceCallback = this.serviceCallback.bind(this);
    this.timer = new Timer();
  }

  private serviceCallback({ score, isWin }: ServiceCallbackProps) {
    if (isWin) {
      this.roundSkipCount = 0;
      this.round++;
      this.roundSkipCount++;
      this.score = score;
      while (this.score > this.getWinScore()) {
        this.round++;
        this.roundSkipCount++;
        View.writeRound(this.round);
      }

      View.writeRound(this.round);
      this.nextRound();
      return;
    }

    this.timer.clearDrawTimeInterval();
    renderRestartBtn();
  }

  start() {
    this.nextRound();
    View.writeRound(this.round);
  }

  nextRound() {
    this.setNextRound();
    if (this.service?.grid) View.draw(this.service.grid);
    renderRoundPopup(this.round, this.roundSkipCount);
    setTimeout(() => {
      if (!this.startTime) {
        this.startTime = Date.now();
        this.timer.start();
      }
      removeRoundPopup();
      if (this.service) this.service.start();
    }, 2000);
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

  getDropDownIntervalTime() {
    const dropDownIntervalTime = 1000 - 100 * this.round;
    return Math.max(dropDownIntervalTime, 400);
  }

  getWinScore() {
    return 1500 + this.round * this.round * 200;
  }
}
