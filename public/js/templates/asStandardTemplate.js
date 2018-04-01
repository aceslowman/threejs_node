import * as THREE from "three";

/* ENTITIES */
import asCamera from "../utils/asCamera";

/* UTILITY */
import asEventBus from "../utils/asEventBus";

/*
  This file is responsible for high level actions

  1. create Scene, Renderer, Camera, and the dat.gui
  2. Initialize SceneSubjects
  3. Update everything every frame

  SceneSubjects are the objects that represent a single
  entity in the scene.
*/

export default class asStandardTemplate{
  constructor(gui){
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.eventBus = new asEventBus();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );

    this.camera = new asCamera(this.scene, this.eventBus, gui);
    this.renderer = new THREE.WebGLRenderer({
        'antialias': true,
        'alpha': true
    });

    this.renderer.setSize(this.width, this.height);
    document.body.appendChild( this.renderer.domElement );

    this._subjects = [];
  }

  updateSubjects(){
    for(let i=0; i < this._subjects.length; i++){
      this._subjects[i].update();
    }
  }

  update(){
    this.updateSubjects();
    this.renderer.render(this.scene, this.camera.cam);
  }

  set subjects(subjects){
    this._subjects = subjects;
  }

  addSubject(subject){
    this._subjects.push(subject);
  }

  get canvas(){
    return this.renderer.domElement;
  }

  onWindowResize(){
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.cam.aspect = this.width / this.height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }
}
