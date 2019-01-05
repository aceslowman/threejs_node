import * as THREE from "three";
import StandardEntity from "./StandardEntity";
import OrbitControls from "../utilities/OrbitControls.js";

/*
  Camera Entity
*/

export default class Camera{
  constructor(manager){
    this.manager = manager;
    this.setup();
  }

  setup(){
    this.aspect = this.manager.width / this.manager.height;
    this.useControls = true;

    this.camera = new THREE.PerspectiveCamera(
      75,           // fov
      this.aspect,  // aspect
      0.01,          // near
      2000          // far
    );

    this.zoom        = 2;
    this.focalLength = this.camera.getFocalLength();

    this.camera.position.z = 999;
    this.camera.zoom = this.zoom;
    this.camera.updateProjectionMatrix();

    // this.setupGUI();
    this.setupOrbit();
  }

  update(){
    if(this.orbitControls) this.orbitControls.update();
  }

  setupGUI(){
    this.gui.camera = this.gui.addFolder('Camera');
    this.gui.camera.transform = this.gui.camera.addFolder('Transform');
    this.gui.camera.transform.position = this.gui.camera.transform.addFolder('Position');

    this.gui.camera.transform.position.add(this.camera.position,'x').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.camera.position,'y').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.camera.position,'z').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'focalLength',0,150).onChange((value)=>{
      if(this.camera.isPerspectiveCamera){
        this.camera.setFocalLength(value);
      }
      this.camera.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'zoom',0,10).onChange((value)=>{
      this.camera.zoom = value;
      this.camera.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'useControls').onChange((value)=>{
      if(this.orbitControls){
        this.orbitControls.enabled = value;
      }else if(value){
        this.setupControls();
      }
    });

    this.gui.camera.close();
  }

  setupOrbit(){
    this.orbitControls = new OrbitControls(
      this.camera,
      this.manager.renderer.domElement
    );
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.8;
    // this.orbitControls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
    this.orbitControls.minDistance = 0.1;
    this.orbitControls.maxDistance = 1000;
    // this.orbitControls.maxPolarAngle = Math.PI / 2;
    // this.orbitControls.autoRotate = true;
  }

  getCamera(){
    return this.camera;
  }
}
