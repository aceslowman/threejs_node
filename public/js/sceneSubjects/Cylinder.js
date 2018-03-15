import * as THREE from "three";

const Cylinder = function(scene, eventBus, gui){
  this.setup = () => {
    this.geometry = new THREE.CylinderGeometry(1,1,1,32,4);

    this.material = new THREE.MeshNormalMaterial({
      'wireframe': false
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.rotation.x = Math.PI/2;
  }

  this.update = () => {}

  this.setup();
}

export default Cylinder;
