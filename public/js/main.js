import * as THREE from "three";

import StandardManager from "./system/StandardManager";
import OrthographicCamera from './entities/OrthographicCamera';
import Capture from "./utilities/Capture";
import Debug from "./utilities/Debug";
import Box from "./entities/Box";
import Capsule from "./entities/Capsule";
import PointLight from "./entities/PointLight";
import GOL from "./entities/GOL";

import GUI from './GUI';

let manager, debug, capturer, box, camera, capsule, light;

let gol;

const setup = () => {
  manager = new StandardManager();

  manager.setCamera(new OrthographicCamera(manager));
  manager.gui.__proto__.constructor.toggleHide();

  gol = new GOL(manager);

  let gui = new GUI(manager, gol);

  if(process.env.DEVELOPMENT){
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
}

const render = () => {
  setTimeout(()=>{
    requestAnimationFrame(render);
  },1000/15);

  if(process.env.DEVELOPMENT) debug.stats.begin();
  manager.update();
  manager.render();
  if(process.env.DEVELOPMENT) debug.stats.end();

  if(process.env.DEVELOPMENT) capturer.capture( manager.canvas );
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
