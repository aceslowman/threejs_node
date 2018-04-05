import CCapture from "ccapture.js";

export default class Capture {
  constructor (template, options) {
    this.capturer = new CCapture(options);
    this.gui = template.gui.addFolder("Capture");
    this.setup();
  }

  capture (canvas) {
    this.capturer.capture(canvas);
  }

  setup () {
    this.gui.add(this.capturer, "start");
    this.gui.add(this.capturer, "stop");
    this.gui.add(this.capturer, "save");
  }
}
