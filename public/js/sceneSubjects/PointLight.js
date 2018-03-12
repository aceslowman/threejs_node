import * as THREE from "three";

const PointLight = function(scene, eventBus, gui){
  const light = new THREE.PointLight( 0xffffff, 1.5 );

  light.position.set( 1, 1, 1 );
  scene.add(light);

  this.update = () => {
    // do something
  }
}

export default PointLight;
