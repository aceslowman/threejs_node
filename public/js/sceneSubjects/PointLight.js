import * as THREE from "three";

const PointLight = function(scene, eventBus){
  const light = new THREE.PointLight( 0xffffff, 1.5 );
  light.position.set( 1, 1, 1 );

  // subscribe to the 'rotation' event, and call the onRotate()
  // method whenever a change is found.
  eventBus.subscribe('rotation', onRotate );

  function onRotate(amount){
    console.log('event subscription: '+amount.x);
  }

  this.update = function(){
    // do something
  }

  scene.add(light);
}

export default PointLight;
