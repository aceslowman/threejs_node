import * as THREE from "three";

const PointLight = function(scene){
  const light = new THREE.PointLight( 0xffffff, 1.5 );
  light.position.set( 1, 1, 1 );

  this.update = function(){
    // do something
  }

  scene.add(light);
}

export default PointLight;
