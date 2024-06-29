export default class BeepSound {
  static AudioContext =
    (typeof window !== "undefined" && window.AudioContext) || null;
  static audioCtx = this.AudioContext ? new this.AudioContext() : null;

  private static getOscillator(freq: number) {
    const oscillator = this.audioCtx?.createOscillator();
    const gainNode = this.audioCtx?.createGain();

    if (oscillator && this.audioCtx?.destination && gainNode) {
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime || 0);
      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      gainNode.gain.setValueAtTime(0.05, this.audioCtx.currentTime); // 볼륨을 낮춤 (0.1은 원래 볼륨의 10%)
    }
    return oscillator;
  }

  private static beep(freq: number) {
    const oscillator = this.getOscillator(freq);
    if (oscillator) {
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, 100);
    }
  }

  public static beepMove() {
    [...new Array(1)].forEach(() => {
      this.beep(210);
    });
  }

  public static beepDrop() {
    [...new Array(1)].forEach(() => {
      this.beep(310);
    });
  }

  public static beepDeny() {
    [...new Array(3)].forEach(() => {
      this.beep(105);
    });
  }

  public static beepClearRow(bonus: number) {
    setTimeout(() => {
      [...new Array(3)].forEach(() => {
        this.beep(400 + 50 * bonus);
      });
    }, 0 + 100 * bonus);
  }
}
