import * as THREE from "three";

import StandardManager from "./system/StandardManager";
import Capture from "./utilities/Capture";
import Debug from "./utilities/Debug";
import Box from "./entities/Box";
import Camera from "./entities/Camera";

let manager, debug, capturer, controls, box, camera;

const setup = () => {
  manager = new StandardManager();

  box = new Box(manager);

  debug = new Debug(manager, {
    stats: true,
    grid: true
  });

  capturer = new Capture(manager, {
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
