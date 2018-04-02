import * as THREE from "three";

/* ENTITIES */
import asCamera from "../utils/asCamera";

/* UTILITY */
import asEventBus from "../utils/asEventBus";
import dat from "dat.gui";

/*
  The StandardTemplate is responsible for maintaining some core elements of
  Three.

  These include:

  gui
  eventbus
  clock
  scene
  camera
  renderer
  subjects
*/

export default class asStandardTemplate{
  constructor({
    scene = {
      background: 0x000000
    },
    camera = {
      zoom: 1,
      ortho: false,
      orbitControls: true,
      focalLength: 19.588356831048795
    },
    renderer = {
      antialias: true,
      alpha: true
    }
  }={}){
    this.subjects = [];
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.gui = new dat.GUI();
    this.eventBus = new asEventBus();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();

    this.scene.background = new THREE.Color( scene.background );
    this.renderer = new THREE.WebGLRenderer( renderer );
    this.renderer.setSize(this.width, this.height);
    this.camera = new asCamera(this, camera);

    document.body.appendChild( this.renderer.domElement );
  }

  updateSubjects(){
    for(let i=0; i < this.subjects.length; i++){
      this.subjects[i].update();
    }
  }

  update(){
    this.updateSubjects();
    this.renderer.render(this.scene, this.camera.cam);
  }

  addSubject(subject){
    this.subjects.push(subject);
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
