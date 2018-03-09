import * as THREE from "three";

const Box = function(scene, eventBus){
  const geometry = setGeometry();
  const material = setMaterial();

  const mesh = new THREE.Mesh(geometry, material);

  function setGeometry(){
    const geometry = new THREE.BoxBufferGeometry( 1,1,1 );

    return geometry;
  }

  function setMaterial(){
    const material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });

    return material;
  }

  this.update = function(){
    rotateBox();
  }

  function rotateBox(){
    //while updating, publish changes to the 'rotation' event type
    eventBus.publish( 'rotation' , mesh.rotation );

    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  }

  scene.add(mesh);
}

export default Box;
