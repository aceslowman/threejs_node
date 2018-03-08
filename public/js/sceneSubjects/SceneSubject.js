import * as THREE from "three";

const SceneSubject = function(scene){
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  this.update = function(){
    // do something
  }
}

export default SceneSubject;
