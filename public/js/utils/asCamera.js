import * as THREE from "three";
import asOrbitControls from "./asOrbitControls.js";

export default class asCamera {
  constructor(template, {
    zoom = 1,
    ortho = false,
    orbitControls = false,
    focalLength = 19.588356831048795
  } = {}){
    this.template = template;
    this.aspect = window.innerWidth / window.innerHeight;
    this.useControls = orbitControls;
    console.log(orbitControls);

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
    console.log(this.focalLength);
    this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
    this.cam.position.z = 2;
    this.cam.zoom = this.zoom;
    this.cam.updateProjectionMatrix();

    this.gui = this.template.gui;
    this.setupGUI();

    if(this.useControls) this.setupControls();

    this.template.addSubject(this);
  }

  setupGUI(){
    this.gui.camera = this.gui.addFolder('Camera');
    this.gui.camera.transform = this.gui.camera.addFolder('Transform');
    this.gui.camera.transform.position = this.gui.camera.transform.addFolder('Position');

    this.gui.camera.transform.position.add(this.cam.position,'x').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.cam.position,'y').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.cam.position,'z').onChange(()=>{
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
      if(this.orbitControls){
        this.orbitControls.enabled = value;
      }else if(value){
        this.setupControls();
      }
    });

    this.gui.camera.close();
  }

  setupControls(){
    this.orbitControls = new asOrbitControls( this.cam, this.template.renderer.domElement );
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.8;
    this.orbitControls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
    this.orbitControls.minDistance = 0.01;
    this.orbitControls.maxDistance = 10;
    this.orbitControls.maxPolarAngle = Math.PI / 2;
    // this.orbitControls.autoRotate = true;
  }

  update(){
    if(this.orbitControls) this.orbitControls.update();
  }
}
