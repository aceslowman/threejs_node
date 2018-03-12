import * as THREE from "three";

//------------------------------------------------------------------------------
const Camera = function(scene, eventBus, gui){
  this.params = {
    'focalLength': 25,
    'zoom': 1
  };

  this.gui = gui.addFolder('Camera');
  const control_focalLength = this.gui.add(this.params,'focalLength',0,200);
  const control_zoom = this.gui.add(this.params,'zoom',0,10);

  const camera = new THREE.PerspectiveCamera(
    75,                                       // fov
    window.innerWidth/window.innerHeight,     // aspect
    0.1,                                        // near
    1000                                      // far
  );

  camera.position.z = 2;

  this.getCamera = () => camera;

  control_focalLength.onChange((value)=>{
    camera.setFocalLength(value);
    camera.updateProjectionMatrix();
  });

  control_zoom.onChange((value)=>{
    camera.zoom = value;
    camera.updateProjectionMatrix();
  });

  this.update = () => {

  }
}

export default Camera;
