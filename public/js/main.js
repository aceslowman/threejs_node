import * as THREE from "three";
import asFeedbackManager from "./utils/asFeedbackManager";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

let gui = '';
let feedbackManager = '';
let debug = '';
let capturer = '';

const setup = () => {
  gui             = new dat.GUI();
  feedbackManager = new asFeedbackManager(gui);
  debug           = new asDebug();
  capturer        = new asCapture(gui, {
    verbose: true,
    display: true,
    framerate: 30,
    format: 'png',
    workersPath: 'js/utils/'
  });
}

const render = () => {
  requestAnimationFrame(render);

  debug.stats.begin();
  feedbackManager.update();
  debug.stats.end();

  capturer.capture( feedbackManager.canvas );
}

const bindEventListeners = () => {
  window.addEventListener( 'resize', feedbackManager.onWindowResize.bind(feedbackManager), false );
}

setup();
bindEventListeners();
render();
