import * as THREE from "three";
import Camera from "../entities/Camera";
import EventBus from "../utilities/EventBus";
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
    default camera is used, unless separate camera is passed using setCamera()
  renderer
  entities
*/

export default class asStandardManager{
  constructor({
    scene = {
      background:  	0x999999
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
    this.eventBus = new EventBus();
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( scene.background );
    this.renderer = new THREE.WebGLRenderer( renderer );
    this.renderer.setSize(this.width, this.height);
    this.camera = new Camera(this);

    document.body.appendChild( this.renderer.domElement );
  }

  setCamera(camera){
    this.camera = camera;
    this.camera.updateProjectionMatrix();
  }

  updateEntities(){
    for(let i=0; i < this.entities.length; i++){
      this.entities[i].update();
    }
  }

  update(){
    this.updateEntities();
    this.renderer.render(this.scene, this.camera.getCamera());
  }

  addEntity(entity){
    this.entities.push(entity);
  }

  onWindowResize(){
    this.width  = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.getCamera().aspect = this.width / this.height;
    this.camera.getCamera().updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  }

  get canvas(){
    return this.renderer.domElement;
  }
}
