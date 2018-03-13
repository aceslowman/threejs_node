import * as THREE from "three";

const Cylinder = function(scene, eventBus, gui){
  this.setup = () => {
    const geometry = new THREE.CylinderGeometry( 1,1,1 );

    const material = new THREE.MeshNormalMaterial({
      'wireframe': false
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.rotation.x = Math.PI/2;
  }

  this.update = () => {}

  this.setup();
}

export default Cylinder;
