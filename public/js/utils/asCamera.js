import * as THREE from "three";
import asOrbitControls from "./asOrbitControls.js";

export default class asCamera {
  constructor(template, {
    zoom = 1,
    ortho = false,
    controls = false
  } = {}){
    this.template = template;
    this.aspect = window.innerWidth / window.innerHeight;
    this.useControls = controls;

    this.ortho_cam = new THREE.OrthographicCamera(
      this.aspect / - 2,
      this.aspect / 2,
      this.aspect / 2,
      this.aspect / - 2,
      0,
      1000
    );

    this.perspective_cam = new THREE.PerspectiveCamera(
      75,           // fov
      this.aspect,  // aspect
      0.1,          // near
      1000          // far
    );

    this.zoom        = zoom;
    this.ortho       = ortho;
    this.focalLength = this.perspective_cam.getFocalLength();

    this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
    this.cam.position.z = 2;
    this.cam.zoom = this.zoom;
    this.cam.updateProjectionMatrix();

    this.gui = this.template.gui;
    this.setupGUI();

    if(this.useControls) this.setupControls();
  }

  setupGUI(){
    this.gui.camera = this.gui.addFolder('Camera');
    this.gui.camera.position = this.gui.addFolder('Position');

    this.gui.camera.position.add(this.cam.position,'x',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.position.add(this.cam.position,'y',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.position.add(this.cam.position,'z',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'focalLength',0,150).onChange((value)=>{
      if(this.cam.isPerspectiveCamera){
        this.cam.setFocalLength(value);
      }
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'zoom',0,10).onChange((value)=>{
      this.cam.zoom = value;
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'ortho').onChange((value)=>{
      this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'useControls').onChange((value)=>{
      if(this.controls){
        this.controls.enabled = value;
      }else if(value){
        this.setupControls();
      }
    });

    this.gui.camera.close();
  }

  setupControls(){
    this.controls = new asOrbitControls( this.cam, this.template.renderer.domElement );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.8;
    this.controls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
    this.controls.minDistance = 0.01;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.autoRotate = true;
  }

  update(){
    this.controls.update();
  }
}
