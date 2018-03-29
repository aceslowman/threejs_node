import * as THREE from "three";

export default class asCamera {
  constructor(scene, eventBus, gui){
    this.aspect = window.innerWidth / window.innerHeight;

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

    this.zoom        = 1;
    this.ortho       = false;
    this.focalLength = this.perspective_cam.getFocalLength();

    this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
    this.cam.position.z = 2;
    this.cam.zoom = this.zoom;
    this.cam.updateProjectionMatrix();

    this.setupGUI(gui);
  }

  setupGUI(gui){
    this.gui = gui.addFolder('Camera');
    this.gui.position = this.gui.addFolder('Position');

    this.gui.position.add(this.cam.position,'x',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.position.add(this.cam.position,'y',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.position.add(this.cam.position,'z',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.add(this,'focalLength',0,150).onChange((value)=>{
      if(this.cam.isPerspectiveCamera){
        this.cam.setFocalLength(value);
      }
      this.cam.updateProjectionMatrix();
    });

    this.gui.add(this,'zoom',0,10).onChange((value)=>{
      this.cam.zoom = value;
      this.cam.updateProjectionMatrix();
    });

    this.gui.add(this,'ortho').onChange((value)=>{
      this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
      this.cam.updateProjectionMatrix();
    });

    this.gui.close();
  }

  update(){}
}
