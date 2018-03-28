import CCapture from "ccapture.js";

const Capture = function(gui){
  this.format = 'gif';
  this.framerate = '30';
  this.quality = 99;
  this.verbose = true;
  this.display = true;
  this.motionblur = false;

  this.init = () => {
    this.capturer = new CCapture({
      verbose: this.verbose,
      display: this.display,
      framerate: this.framerate,
      motionBlurFrames: ( 960 / this.framerate ) * this.motionblur ? 1 : 0,
      quality: this.quality,
      format: this.format,
      workersPath: 'js/utils/'
    });
  }

  this.setupGUI = () => {
    this.gui = gui.addFolder("Capture");
    this.gui.add(this.capturer, "start");
    this.gui.add(this.capturer, "stop");
    this.gui.add(this.capturer, "save");
    this.gui.add(this, "framerate", [10,30,60,120]).onChange(()=>this.init());
    this.gui.add(this, "format", ['png','jpg','webm','gif']).onChange(()=>this.init());
    this.gui.add(this, "quality", 0, 100).onChange(()=>this.init());
    this.gui.add(this, "motionblur").onChange(()=>this.init());
    this.gui.add(this, "display").onChange(()=>this.init());
    this.gui.add(this, "verbose").onChange(()=>this.init());
  }

  this.init();
  this.setupGUI();
}

export default Capture;
