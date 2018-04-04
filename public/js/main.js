import * as THREE from "three";

import asStandardManager from "./system/asStandardManager";
import asCapture from "./utilities/asCapture";
import asDebug from "./utilities/asDebug";
import Box from "./entities/Box";
import Camera from "./entities/Camera";

let manager, debug, capturer, controls, box, camera;

const setup = () => {

  manager = new asStandardManager();

  box = new Box(manager);

  debug = new asDebug(manager, {
    stats: true,
    grid: true
  });

  capturer = new asCapture(manager, {
    verbose: false,
    display: true,
    framerate: 100,
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
