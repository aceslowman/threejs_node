import * as THREE from "three";

const PointLight = function(scene, eventBus, gui){
  const light = new THREE.PointLight( 0xffffff, 1.5 );

  const onRotate = (amount) => {
    console.log('event subscription: '+amount.x);
  }

  // subscribe to the 'rotation' event, and call the onRotate()
  // method whenever a change is found.
  eventBus.subscribe('rotation', onRotate );

  light.position.set( 1, 1, 1 );
  scene.add(light);

  this.update = () => {
    // do something
  }
}

export default PointLight;
