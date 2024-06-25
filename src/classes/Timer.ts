import { View } from "./View";

export class Timer {
  private startTime: null | number = null;
  private drawTimeInterval: any;

  constructor() {}

  start() {
    this.startTime = Date.now();
    this.drawTime();
  }

  clearDrawTimeInterval() {
    clearInterval(this.drawTimeInterval);
  }

  getTime() {
    if (!this.startTime) return;
    const elapsedTime = Date.now() - this.startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  drawTime() {
    this.drawTimeInterval = setInterval(() => {
      const time = this.getTime();
      if (time) View.writeTime(time);
    }, 1000);
  }
}
