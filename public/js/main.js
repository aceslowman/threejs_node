import * as THREE from "three";
import SceneManager from "./SceneManager";

const canvas = document.getElementById('canvas');
const sceneManager = new SceneManager(canvas);

const render = ()=>{
  requestAnimationFrame(render);
  sceneManager.update();
}

const bindEventListeners = ()=>{
  window.addEventListener( 'resize', sceneManager.onWindowResize, false );
}

bindEventListeners();
render();
