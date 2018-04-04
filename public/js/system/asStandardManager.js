import * as THREE from "three";

/* ENTITIES */
import asCamera from "../components/asCamera";

/* UTILITY */
import asEventBus from "../utilities/asEventBus";
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
  entities
*/

export default class asStandardManager{
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
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.entities = [];

    this.gui = new dat.GUI();
    this.eventBus = new asEventBus();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( scene.background );
    this.renderer = new THREE.WebGLRenderer( renderer );
    this.renderer.setSize(this.width, this.height);
    this.camera = new asCamera(this, camera); // TODO: remove camera

    document.body.appendChild( this.renderer.domElement );
  }

  updateEntities(){
    for(let i=0; i < this.entities.length; i++){
      this.entities[i].update();
    }
  }

  update(){
    this.updateEntities();
    this.renderer.render(this.scene, this.camera.cam);
  }

  addEntity(entity){
    this.entities.push(entity);
  }

  onWindowResize(){
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.cam.aspect = this.width / this.height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  get canvas(){
    return this.renderer.domElement;
  }
}
