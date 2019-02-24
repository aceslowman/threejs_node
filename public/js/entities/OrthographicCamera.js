import * as THREE from "three";
import StandardEntity from "./StandardEntity";
import OrbitControls from "../utilities/OrbitControls.js";

/*
  Camera Entity
*/

export default class OrthoCamera{
  constructor(manager){
    this.manager = manager;
    this.gui = manager.gui;
    this.setup();
    this.active = true;
  }

  setup(){
    this.useControls = true;

    this.camera = new THREE.OrthographicCamera(
      this.manager.width / - 2,
      this.manager.width / 2,
      this.manager.height / 2,
      this.manager.height / - 2,
      1,
      2000
    );

    this.zoom = 1;

    this.camera.position.z = 500;
    this.camera.zoom = this.zoom;
    this.camera.updateProjectionMatrix();

    this.setupGUI();
    this.setupOrbit();
  }

  update(){
    if(this.orbitControls) this.orbitControls.update();
  }

  setupGUI(){
    this.gui.camera = this.gui.addFolder('OrthoCamera');
    this.gui.camera.transform = this.gui.camera.addFolder('Transform');
    this.gui.camera.transform.position = this.gui.camera.transform.addFolder('Position');

    this.gui.camera.transform.position.add(this.camera.position,'x').onChange(()=>{
      this.camera.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.camera.position,'y').onChange(()=>{
      this.camera.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.camera.position,'z').onChange(()=>{
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
    // this.orbitControls = new OrbitControls(
    //   this.camera,
    //   this.manager.renderer.domElement
    // );
    // this.orbitControls.enableDamping = true;
    // this.orbitControls.dampingFactor = 0.8;
    // this.orbitControls.minDistance = 0.01;
    // this.orbitControls.maxDistance = 1000;
    // this.orbitControls.enableRotate = false;

  }

  getCamera(){
    return this.camera;
  }

  disableOrbitControls(){
    this.orbitControls = null;
  }
}
