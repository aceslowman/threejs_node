import CCapture from "ccapture.js";

export default class asCapture {
  constructor (gui, options) {
    this._capturer = new CCapture(options);
    this.gui = gui.addFolder("Capture");
    this.setup();
  }

  capture (canvas) {
    this._capturer.capture(canvas);
  }

  setup () {
    this.gui.add(this._capturer, "start");
    this.gui.add(this._capturer, "stop");
    this.gui.add(this._capturer, "save");
  }
}
