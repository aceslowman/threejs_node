import * as THREE from "three";
import SceneSubject from "./sceneSubjects/SceneSubject";

import BoundBox from "./sceneSubjects/BoundBox";
import PointLight from "./sceneSubjects/PointLight";

/*
  This file is responsible for high level actions

  1. create Scene, Renderer, and Camera
  2. Initialize SceneSubjects
  3. Update everything every frame
*/

const SceneManager = function(){
  const scene         = buildScene();
  const renderer      = buildRenderer();
  const camera        = buildCamera();
  const sceneSubjects = createSceneSubjects();

  function buildScene(){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 );

    return scene;
  }

  function buildRenderer(){
    const renderer = new THREE.WebGLRenderer(
      {
        'antialias': true,
        'alpha': true
      }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    return renderer;
  }

  function buildCamera(){
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      1,
      1000
    );
    camera.position.z = 2;

    return camera;
  }

  function createSceneSubjects(){
    const sceneSubjects = [];
    sceneSubjects.push(new PointLight(scene));
    sceneSubjects.push(new BoundBox(scene));

    return sceneSubjects;
  }

  this.update = function(){
    for(let i=0; i < sceneSubjects.length; i++){
      sceneSubjects[i].update();
    }

    renderer.render(scene, camera);
  }

  this.onWindowResize = function(){
    const width  = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }
}

export default SceneManager;
