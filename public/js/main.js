import * as THREE from "three";
import asStandardTemplate from "./templates/asStandardTemplate";
import asFeedbackTemplate from "./templates/asFeedbackTemplate";
import asOrbitControls from "./utils/asOrbitControls.js";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

import Box from "./sceneSubjects/Box";
import PointLight from "./sceneSubjects/PointLight";

let gui, manager, debug, capturer, controls;
let box;

const setup = () => {
  gui      = new dat.GUI();
  manager = new asStandardTemplate(gui);

  box = new Box(manager.scene,manager.eventBus,gui);
  manager.addSubject(box);

  debug    = new asDebug(manager, gui, {
    grid: {
      size: 10,
      divisions: 10
    },
    stats: true
  });

  capturer = new asCapture(gui, {
    verbose: true,
    display: true,
    framerate: 30,
    format: 'png',
    workersPath: 'js/utils/'
  });

  controls = new asOrbitControls( manager.camera.cam, manager.renderer.domElement );
	controls.enableDamping = true;
	controls.dampingFactor = 0.8;
	controls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
	controls.minDistance = 0.01;
	controls.maxDistance = 10;
	controls.maxPolarAngle = Math.PI / 2;
  // controls.autoRotate = true;
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
  window.addEventListener(
    'resize',
    manager.onWindowResize.bind(manager),
    false
  );
}

setup();
bindEventListeners();
render();
