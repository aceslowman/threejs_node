import * as THREE from "three";

const SceneSubject = function(scene, eventBus){
  const geometry = setGeometry();
  const material = setMaterial();

  const mesh = new THREE.Mesh(geometry, material);

  function setGeometry(){
    const geometry = new THREE.BoxBufferGeometry( 1,1,1 );

    return geometry;
  }

  function setMaterial(){
    const material = new THREE.MeshNormalMaterial({
      'wireframe': false
    });

    return material;
  }

  this.update = function(){
    rotateMesh();
  }

  function rotateMesh(){
    // publish mesh rotation as an event
    eventBus.publish('rotation',mesh.rotation);

    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  }

  scene.add(mesh);
}

export default SceneSubject;
