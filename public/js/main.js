import * as THREE from "three";
import asStandardTemplate from "./templates/asStandardTemplate";
import asFeedbackTemplate from "./templates/asFeedbackTemplate";
import asOrbitControls from "./utils/asOrbitControls.js";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

import CylinderGrid from "./sceneSubjects/CylinderGrid";

let gui, manager, debug, capturer, controls;
let grid;

const setup = () => {
  gui      = new dat.GUI();
  manager = new asFeedbackTemplate(gui, {
    camera: {
      zoom: 3
    }
  });
  grid = new CylinderGrid(manager.scene,manager.eventBus,gui,manager.clock);

  manager.addSubject(grid);
  manager.camera.zoom = 3;

  debug    = new asDebug(manager, gui, {
    stats: true
  });

  capturer = new asCapture(gui, {
    verbose: false,
    display: true,
    framerate: 100,
    format: 'png',
    workersPath: 'js/utils/'
  });
}

const render = () => {
  controls.update();
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
