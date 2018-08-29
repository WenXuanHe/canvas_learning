import StopWatch from './stopWatch'
export default class AnimationTimer{
  constructor(duration){
    super();
    this.duration = duration;
  }
  
  stopWatch(){
    return new StopWatch();
  }

  start(){
    this.stopWatch.start()
  }

  stop(){
    this.stopWatch.stop();
  }

  getElapsedTime(){
    var elapsedTime = this.stopWatch.getElapsedTime();

    if(this.stopWatch.running){
      return elapsedTime;
    }
  }

  isRunning(){
    return this.stopWatch.isRunning();
  }

  isOver(){
    return this.stopWatch.getElapsedTime() > this.duration
  }
}
