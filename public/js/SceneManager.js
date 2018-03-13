import * as THREE from "three";
import SceneSubject from "./sceneSubjects/SceneSubject";

/* ENTITIES */
import CylinderGrid from "./sceneSubjects/CylinderGrid";
import PointLight from "./sceneSubjects/PointLight";
import Camera from "./sceneSubjects/Camera";

/* UTILITY */
import EventBus from "./EventBus";
import dat from "dat.gui";

//------------------------------------------------------------------------------
const SceneManager = function(){
  const eventBus = new EventBus();
  const gui = new dat.GUI();

  /* SETUP SCENE */
  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 );

  /* SETUP RENDERER */
  const renderer = new THREE.WebGLRenderer({
    'antialias': true,
    'alpha': true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );

  /* SETUP CAMERA */
  const camera = new Camera(scene, eventBus, gui);

  /* SETUP SCENE SUBJECTS */
  const sceneSubjects = [
    new PointLight(scene, eventBus, gui),
    new CylinderGrid(scene, eventBus, gui),
  ];

  this.update = function(){
    for(let i=0; i < sceneSubjects.length; i++){
      sceneSubjects[i].update();
    }

    camera.update();
    renderer.render(scene, camera.cam);
  }

  this.onWindowResize = function(){
    const width  = window.innerWidth;
    const height = window.innerHeight;

    camera.cam.aspect = width / height;
    camera.cam.updateProjectionMatrix();

    renderer.setSize(width, height);
  }
}

export default SceneManager;
