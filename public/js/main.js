import * as THREE from "three";
import asSceneManager from "./utils/asSceneManager";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

const gui      = new dat.GUI();
const sceneManager = new asSceneManager(gui);
const debug    = new asDebug();
const capturer = new asCapture(gui, {
  verbose: true,
  display: true,
  framerate: 30,
  format: 'png',
  workersPath: 'js/utils/'
});

const render = () => {
  requestAnimationFrame(render);

  if ( debug.stats ) debug.stats.begin();
  sceneManager.update();
  if ( debug.stats ) debug.stats.end();

  if( capturer ) capturer.capture( sceneManager.canvas );
}

const bindEventListeners = () => {
  window.addEventListener(
    'resize',
    sceneManager.onWindowResize.bind(sceneManager),
    false
  );
}

bindEventListeners();
render();
