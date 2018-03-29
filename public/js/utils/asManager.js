import * as THREE from "three";

/* ENTITIES */
import asCamera from "./asCamera";

/* UTILITY */
import asEventBus from "./asEventBus";

/*
  This file is responsible for high level actions

  1. create Scene, Renderer, Camera, and the dat.gui
  2. Initialize SceneSubjects
  3. Update everything every frame

  SceneSubjects are the objects that represent a single
  entity in the scene.
*/

export default class asManager{
  constructor(gui){
    this.eventBus = new asEventBus();
    this.clock = new THREE.Clock();

    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
        'antialias': true,
        'alpha': true
    });

    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );

    this.camera = new asCamera(this.mainScene, this.eventBus, gui);

    this._subjects = [];
  }

  update(){
    for(let i=0; i < this._subjects.length; i++){
      this._subjects[i].update();
    }

    this.renderer.render(this.scene, this.camera.cam);
  }

  onWindowResize(){
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.cam.aspect = this.width / this.height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  set subjects(subjects){
    this._subjects = subjects;
  }

  get canvas(){
    return this.renderer.domElement;
  }
}
