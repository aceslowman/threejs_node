import * as THREE from "three";
import SceneManager from "./SceneManager";

import Stats from "stats-js";

const canvas = document.getElementById('canvas');
const sceneManager = new SceneManager(canvas);

const stats = new Stats();
stats.setMode(0);

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

const render = ()=>{
  // setTimeout( function() {

      requestAnimationFrame( render );
  //
  // }, 1000 / 30 );

  stats.begin();
  sceneManager.update();
  stats.end();
}

const bindEventListeners = ()=>{
  window.addEventListener( 'resize', sceneManager.onWindowResize, false );
}

bindEventListeners();


render();
