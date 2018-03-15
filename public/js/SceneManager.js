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

  this.setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      'antialias': true,
      'alpha': true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( this.renderer.domElement );
  }

  this.setupScenes = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );
  }

  this.setupCameras = () => {
    this.camera = new Camera(this.scene, eventBus, gui);
  }

  this.setupSceneSubjects = () => {
    this.sceneSubjects = [
      new PointLight(this.scene, eventBus, gui),
      new CylinderGrid(this.scene, eventBus, gui)
    ];
  }

  this.update = () => {
    for(let i=0; i < this.sceneSubjects.length; i++){
      this.sceneSubjects[i].update();
    }

    this.camera.update();
    this.renderer.render(this.scene, this.camera.cam);
  }

  this.onWindowResize = () => {
    const width  = window.innerWidth;
    const height = window.innerHeight;

    this.camera.cam.aspect = width / height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  this.setupRenderer();
  this.setupScenes();
  this.setupCameras();
  this.setupSceneSubjects();
}

export default SceneManager;
