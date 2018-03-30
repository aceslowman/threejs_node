import * as THREE from "three";
import asManager from "./utils/asManager";
import asFeedbackManager from "./utils/asFeedbackManager";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";
import dat from "dat.gui";

import Box from "./sceneSubjects/Box";
import PointLight from "./sceneSubjects/PointLight";

let gui, manager, debug, capturer;
let box;

const setup = () => {
  gui      = new dat.GUI();
  // manager = new asFeedbackManager(gui);
  manager = new asManager(gui);


  box = new Box(manager.scene,manager.eventBus,gui);

  // manager.subjects = [
  //   box
  // ];
  manager.addSubject(box);

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
