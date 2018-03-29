import * as THREE from "three";
import SceneManager from "./SceneManager";
import Capture from "./utils/Capture";
import Debug from "./utils/Debug";
import dat from "dat.gui";

const debug        = new Debug();
const gui          = new dat.GUI();
const capturer     = new Capture(gui).capturer;
const sceneManager = new SceneManager(gui);

const render = () => {
  requestAnimationFrame(render);

  if ( debug.stats ) debug.stats.begin();
  sceneManager.update();
  if ( debug.stats ) debug.stats.end();

  if( capturer ) capturer.capture( sceneManager.getCanvas() );
}

const bindEventListeners = () => {
  window.addEventListener( 'resize', sceneManager.onWindowResize, false );
}

bindEventListeners();
render();
