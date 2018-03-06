@import SceneSubject from "./sceneSubjects/SceneSubject";

/*
  This file is responsible for high level actions

  1. create Scene, Renderer, and Camera
  2. Initialize SceneSubjects
  3. Update everything every frame
*/

var scene, camera, renderer;

function SceneManager(canvas){
  buildScene();
  buildRenderer();
  buildCamera();
  createSceneSubjects();

  this.buildScene = function(){
    scene = new THREE.Scene();
  }

  this.buildRenderer = function(){
    renderer = new THREE.WebGLRenderer(
      {
        'antialias': true,
        'alpha': true
      }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  this.buildCamera = function(){
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );
  }

  this.createSceneSubjects = function(){

  }

  this.update = function(){
    for(let i=0; i < sceneSubjects.length; i++){
      sceneSubjects[i].update();
    }

    renderer.render(scene, camera);
  }

  this.onWindowResize = function(){
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }
}
