import * as THREE from "three";
import SceneSubject from "./sceneSubjects/SceneSubject";

/* ENTITIES */
import Box from "./sceneSubjects/Box";
import PointLight from "./sceneSubjects/PointLight";
import Camera from "./Camera";

/* UTILITY */
import EventBus from "./utils/EventBus";

/*
  This file is responsible for high level actions

  1. create Scene, Renderer, Camera, and the dat.gui
  2. Initialize SceneSubjects
  3. Update everything every frame

  SceneSubjects are the objects that represent a single
  entity in the scene.
*/

const SceneManager = function(gui){
  const eventBus = new EventBus();
  const clock = new THREE.Clock();

  this.buildScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );
  }

  this.buildRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
        'antialias': true,
        'alpha': true
    });

    this.renderer.setClearColor(0x000000, 0);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( this.renderer.domElement );
  }

  this.buildCamera = () => {
    this.camera = new Camera(this.mainScene, eventBus, gui);
  }

  this.createSceneSubjects = () => {
    this.sceneSubjects = [];
    this.sceneSubjects.push(new PointLight(this.scene,eventBus,gui));
    this.sceneSubjects.push(new Box(this.scene,eventBus,gui));
  }

  this.update = () => {
    for(let i=0; i < this.sceneSubjects.length; i++){
      this.sceneSubjects[i].update();
    }

    this.renderer.render(this.scene, this.camera.cam);
  }

  this.onWindowResize = () => {
    const width  = window.innerWidth;
    const height = window.innerHeight;

    this.camera.cam.aspect = width / height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  this.getCanvas = () => {
    return this.renderer.domElement;
  }

  this.buildScene();
  this.buildRenderer();
  this.buildCamera();
  this.createSceneSubjects();
}

export default SceneManager;
