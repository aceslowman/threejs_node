import * as THREE from "three";
import SceneSubject from "./sceneSubjects/SceneSubject";

/* ENTITIES */
import Box from "./sceneSubjects/Box";
import PointLight from "./sceneSubjects/PointLight";
import asCamera from "./asCamera";

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

export default class SceneManager{
  constructor(gui){
    this.eventBus = new EventBus();
    this.clock = new THREE.Clock();

    const buildScene = () => {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color( 0x000000 );
    }

    const buildRenderer = () => {
      this.renderer = new THREE.WebGLRenderer({
          'antialias': true,
          'alpha': true
      });

      this.renderer.setClearColor(0x000000, 0);

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild( this.renderer.domElement );
    }

    const buildCamera = () => {
      this.camera = new asCamera(this.mainScene, this.eventBus, gui);
    }

    const createSceneSubjects = () => {
      this.sceneSubjects = [];
      this.sceneSubjects.push(new PointLight(this.scene,this.eventBus,gui));
      this.sceneSubjects.push(new Box(this.scene,this.eventBus,gui));
    }

    buildScene();
    buildRenderer();
    buildCamera();
    createSceneSubjects();
  }

  update(){
    for(let i=0; i < this.sceneSubjects.length; i++){
      this.sceneSubjects[i].update();
    }

    this.renderer.render(this.scene, this.camera.cam);
  }

  onWindowResize(){
    const width  = window.innerWidth;
    const height = window.innerHeight;

    this.camera.cam.aspect = width / height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  get canvas(){
    return this.renderer.domElement;
  }
}
