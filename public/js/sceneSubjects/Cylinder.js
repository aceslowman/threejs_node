import * as THREE from "three";

export default class Cylinder{
  constructor(scene, eventBus, gui){
    this.geometry = new THREE.CylinderGeometry(1,1,1,32,4);
    this.material = new THREE.MeshNormalMaterial({
      'wireframe': false
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.x = Math.PI/2;
  }

  update(){}
}
