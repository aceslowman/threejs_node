import * as THREE from "three";
import asManager from "./utils/asManager";
import asFeedbackManager from "./utils/asFeedbackManager";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

import Polyline from "./sceneSubjects/Polyline";
import PointLight from "./sceneSubjects/PointLight";

let gui, manager, debug, capturer;
let lines;

const setup = () => {
  gui      = new dat.GUI();
  manager = new asManager(gui);

  lines = new Polyline(manager.scene,manager.eventBus,gui);

  manager.addSubject(lines);

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
  window.addEventListener(
    'resize',
    manager.onWindowResize.bind(manager),
    false
  );
}

setup();
bindEventListeners();
render();
