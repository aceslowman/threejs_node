import * as THREE from "three";
import asStandardTemplate from "./templates/asStandardTemplate";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";

import Box from "./sceneSubjects/Box";
import PointLight from "./sceneSubjects/PointLight";

let template, debug, capturer, controls, box;

const setup = () => {
  template = new asStandardTemplate({
    camera: {
      zoom: 1,
      ortho: false,
      orbitControls: true
    }
  });

  box = new Box(template, {
    wireframe: true
  });

  debug = new asDebug(template, {
    grid: {
      size: 10,
      divisions: 20
    },
    stats: true
  });

  capturer = new asCapture(template, {
    verbose: false,
    display: true,
    framerate: 30,
    format: 'png',
    workersPath: 'js/utils/'
  });
}

const render = () => {
  requestAnimationFrame(render);

  debug.stats.begin();
  template.update();
  debug.stats.end();

  capturer.capture( template.canvas );
}

const bindEventListeners = () => {
  window.addEventListener(
    'resize',
    template.onWindowResize.bind(template),
    false
  );
}

setup();
bindEventListeners();
render();
