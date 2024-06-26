export class BeepSound {
  static AudioContext = window.AudioContext;
  static audioCtx = new this.AudioContext();

  // constructor() {
  //   const AudioContext = window.AudioContext;
  //   this.audioCtx = new AudioContext();
  // }

  private static getOscillator(freq: number) {
    const oscillator = this.audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    oscillator.connect(this.audioCtx.destination);

    return oscillator;
  }

  private static beep(freq: number) {
    const oscillator = this.getOscillator(freq);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 100);
  }

  public static beepMove() {
    this.beep(300);
    this.beep(300);
    this.beep(300);
  }

  public static beepDeny() {
    this.beep(100);
    this.beep(100);
    this.beep(100);
  }

  public static beepClearRow(bonus: number) {
    this.beep(600);
    this.beep(600);
    this.beep(600);
  }
}
