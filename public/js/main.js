import * as THREE from "three";
import $ from 'jquery';

import StandardManager from "./system/StandardManager";
import OrthographicCamera from './entities/OrthographicCamera';
import Capture from "./utilities/Capture";
import Debug from "./utilities/Debug";
import Box from "./entities/Box";
import Capsule from "./entities/Capsule";
import PointLight from "./entities/PointLight";
import GOL from "./entities/GOL";

let manager, debug, capturer, box, camera, capsule, light;

let gol;

let framerate = 30;

const setup = () => {
  manager = new StandardManager();

  manager.setCamera(new OrthographicCamera(manager));
  manager.gui.__proto__.constructor.toggleHide();

  gol = new GOL(manager);

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

  $('.clearbutton').click(()=>{
    gol.clear();
  });

  $('.togglepause').click(()=>{
    if(gol.playing){
      gol.pause();
      $('.togglepause').html('play');
    }else{
      gol.resume();
      $('.togglepause').html('pause');
    }
  });

  $('.sizerange').on('input', ()=>{
    let v = $('.sizerange').val();
    gol.brush.width = v;
    gol.brush.height = v;
    gol.brush.setupCanvas();
  });

  $('.speedrange').on('input', ()=>{
    let v = $('.speedrange').val();
    framerate = v;
  });

  $('.typeselect').on('change', ()=>{
    gol.brush.type = $('.typeselect').val();
    gol.brush.setupCanvas();
  });

  $('.resolutionselect').on('change', ()=>{
    let v = $('.resolutionselect').val();
    gol.setResolution(v);
  });

  $('.togglegrid').click(()=>{
    if(gol.grid.visible){
      gol.grid.visible = false;
      $('.togglegrid').html('show grid');
    }else{
      gol.grid.visible = true;
      $('.togglegrid').html('hide grid');
    }
  });
}

const render = () => {
  setTimeout(()=>{
    requestAnimationFrame(render);
  },1000/framerate);

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
