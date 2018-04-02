import * as THREE from "three";
import asStandardTemplate from "./templates/asStandardTemplate";
import asFeedbackTemplate from "./templates/asFeedbackTemplate";
import asCapture from "./utils/asCapture";
import asDebug from "./utils/asDebug";

import CylinderGrid from "./sceneSubjects/CylinderGrid";

let template, debug, capturer, controls, grid;

const setup = () => {
  template = new asFeedbackTemplate({
    camera: {
      zoom: 3,
      ortho: false,
      orbitControls: true
    }
  });

  grid = new CylinderGrid(template);
  template.addSubject(grid);

  debug = new asDebug(template, {
    stats: true
  });

  capturer = new asCapture(template, {
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
