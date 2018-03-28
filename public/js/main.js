import * as THREE from "three";
import SceneManager from "./SceneManager";

import Stats from "stats-js";
import dat from "dat.gui";

import CCapture from "ccapture.js/src/CCapture.js";

// const capturer = new CCapture( { format: 'png' } );
// TODO: contribute a fix to CCapture to allow for gif.js without external worker
const capturer = new CCapture( { format: 'gif', workersPath: 'js/' } );

const gui = new dat.GUI();
const capture_gui = gui.addFolder("Capture");
capture_gui.add(capturer, "start");
capture_gui.add(capturer, "stop");
capture_gui.add(capturer, "save");

const sceneManager = new SceneManager(gui);

const stats = new Stats();
stats.setMode(0);

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

const render = () => {
  requestAnimationFrame(render);

  stats.begin();
  sceneManager.update();
  stats.end();

  capturer.capture( sceneManager.getCanvas() );
}

const bindEventListeners = ()=>{
  window.addEventListener( 'resize', sceneManager.onWindowResize, false );
}

bindEventListeners();
render();
