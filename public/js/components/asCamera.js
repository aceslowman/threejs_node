import * as THREE from "three";
import asOrbitControls from "../utilities/asOrbitControls.js";

export default class asCamera {
  constructor(manager, {
    zoom = 1,
    ortho = false,
    orbitControls = false,
    focalLength = 19.588356831048795
  } = {}){
    this.manager = manager;
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
    this.focalLength = focalLength
    console.log(this.focalLength);
    this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
    this.cam.position.z = 2;
    this.cam.zoom = this.zoom;
    this.cam.updateProjectionMatrix();

    this.gui = this.manager.gui;
    // this.setupGUI();

    if(this.useControls) this.setupControls();

    this.manager.addEntity(this);
  }



  setupControls(){
    this.orbitControls = new asOrbitControls( this.cam, this.manager.renderer.domElement );
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
