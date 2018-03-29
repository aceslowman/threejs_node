import * as THREE from "three";
import asFeedbackManager from "./utils/asFeedbackManager";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

const gui          = new dat.GUI();
const feedbackManager = new asFeedbackManager(gui);
const debug        = new asDebug();
const capturer     = new asCapture(gui, {
  verbose: true,
  display: true,
  framerate: 30,
  format: 'png',
  workersPath: 'js/utils/'
});

const render = () => {
  requestAnimationFrame(render);

  if ( debug.stats ) debug.stats.begin();
  feedbackManager.update();
  if ( debug.stats ) debug.stats.end();

  if( capturer ) capturer.capture( feedbackManager.canvas );
}

const bindEventListeners = () => {
  window.addEventListener(
    'resize',
    feedbackManager.onWindowResize.bind(feedbackManager),
    false
  );
}

bindEventListeners();
render();
