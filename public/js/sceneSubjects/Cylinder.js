import * as THREE from "three";

const Cylinder = function(scene, eventBus, gui){
  const geometry = new THREE.CylinderGeometry( 1,1,1 );

  const material = new THREE.MeshNormalMaterial({
    'wireframe': false
  });

  const mesh = new THREE.Mesh(geometry, material);

  this.getMesh = () => mesh;

  mesh.rotation.x = Math.PI/2;

  scene.add(mesh);

  this.update = function(){

  }
}

export default Cylinder;
