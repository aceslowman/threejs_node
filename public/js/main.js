import * as THREE from "three";
import SceneManager from "./SceneManager";

const canvas = document.getElementById('canvas');
const sceneManager = new SceneManager(canvas);

bindEventListeners();
render();

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}

function bindEventListeners(){
  window.addEventListener( 'resize', sceneManager.onWindowResize, false );
}
