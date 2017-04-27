import loop from './lib/loop';

export default class Controller {
  constructor() {
    this.observabler = this.getObservabler();
  }

  start() {
    this.subscription = this.observabler.subscribe((x) => {
      console.log(x);
    });
  }

  stop() {
    this.subscription.unsubscribe();
  }

  getObservabler() {
    return loop(["http://nullprogram.com/feed/", "https://www.raspberrypi.org/feed/"]);
  }
}
