import * as THREE from "three";
import asStandardTemplate from "./templates/asStandardTemplate";
import asFeedbackTemplate from "./templates/asFeedbackTemplate";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";

import Box from "./sceneSubjects/Box";
import PointLight from "./sceneSubjects/PointLight";

let template, debug, capturer, controls;
let box;

const setup = () => {
  template = new asStandardTemplate();

  box = new Box(template);

  debug    = new asDebug(template, {
    grid: {
      size: 10,
      divisions: 10
    },
    stats: true
  });

  capturer = new asCapture(template, {
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
