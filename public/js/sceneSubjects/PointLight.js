import * as THREE from "three";

const PointLight = function(scene, eventBus, gui){
  this.light = new THREE.PointLight( 0xffffff, 1.5 );

  this.onRotate = (amount) => {
    // console.log('event subscription: '+amount.x);
  }

  this.setup = () => {
    // subscribe to the 'rotation' event, and call the onRotate()
    // method whenever a change is found.
    // eventBus.subscribe('rotation', this.onRotate );

    this.light.position.set( 1, 1, 1 );
    scene.add(light);
  }

  this.update = () => {
    // do something
  }
}

export default PointLight;
