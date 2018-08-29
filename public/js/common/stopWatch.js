class StopWatch {

  constructor() {
    super();
  }

  running = false
  startTime = 0
  elapsed = undefined

  start() {
    this.startTime = + new Date();
    this.elapsedTime = undefined;
    this.running = false;
  }

  stop() {
    this.elapsed = (+new Date()) - this.startTime;
    this.running = false;
  }

  getElapsedTime() {
    if (this.running) {
      return (+new Date()) - this.startTime
    } else {
      return this.elapsed;
    }
  }

  isRunning() {
    return this.running;
  }

  reset() {
    this.elapsed = 0;
  }
}