import * as THREE from "three";
import asFeedbackManager from "./utils/asFeedbackManager";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

import CylinderGrid from "./sceneSubjects/CylinderGrid";

let gui, manager, debug, capturer;
let grid;

const setup = () => {
  gui     = new dat.GUI();
  manager = new asFeedbackManager(gui);
  manager.camera.cam.zoom = 6.4;
  manager.camera.cam.updateProjectionMatrix();

  grid = new CylinderGrid(manager.scene,manager.eventBus,gui,manager.clock);

  manager.subjects = [
    grid
  ];

  debug    = new asDebug();
  capturer = new asCapture(gui, {
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
  manager.update();
  debug.stats.end();

  capturer.capture( manager.canvas );
}

const bindEventListeners = () => {
  window.addEventListener( 'resize', manager.onWindowResize.bind(manager), false );
}

setup();
bindEventListeners();
render();
