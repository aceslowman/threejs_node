import * as THREE from "three";

//------------------------------------------------------------------------------
const Camera = function(scene, eventBus, gui){
  this.setup = () => {
    this.cam = new THREE.PerspectiveCamera(
      75,                                       // fov
      window.innerWidth/window.innerHeight,     // aspect
      0.1,                                      // near
      1000                                      // far
    );

    this.cam.position.z = 2;
  }

  this.setupGUI = () => {
    this.focalLength = 25;
    this.zoom        = 1;

    this.gui = gui.addFolder('Camera');
    this.control_focalLength = this.gui.add(this,'focalLength',0,200);
    this.control_zoom = this.gui.add(this,'zoom',0,10);

    this.control_focalLength.onChange((value)=>{
      this.cam.setFocalLength(value);
      this.cam.updateProjectionMatrix();
    });

    this.control_zoom.onChange((value)=>{
      this.cam.zoom = value;
      this.cam.updateProjectionMatrix();
    });

    this.gui.open();
  }

  this.update = () => {}

  this.setupGUI();
  this.setup();
}

export default Camera;
