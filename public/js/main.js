import * as THREE from "three";

import StandardManager from "./system/StandardManager";
import Capture from "./utilities/Capture";
import Debug from "./utilities/Debug";
import Box from "./entities/Box";
import Capsule from "./entities/Capsule";
import Camera from "./entities/Camera";
import PointLight from "./entities/PointLight";

let manager, debug, capturer, box, camera, capsule, light;

const setup = () => {
  manager = new StandardManager();

  // box = new Box(manager);
  capsule = new Capsule(manager);
  light = new PointLight(manager);

  debug = new Debug(manager, {
    stats: true,
    grid: false
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
