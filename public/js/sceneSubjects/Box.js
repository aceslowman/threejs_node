import * as THREE from "three";

const Box = function(scene){
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
    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  }

  scene.add(mesh);
}

export default Box;
