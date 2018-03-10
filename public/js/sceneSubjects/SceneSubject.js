import * as THREE from "three";

const SceneSubject = function(scene, eventBus, gui){
  this.params = {
    'scale': 1,
    'speed': 0.009
  }

  const setGeometry = () => {
    const geometry = new THREE.BoxBufferGeometry( 1,1,1 );

    return geometry;
  }

  const setMaterial = () => {
    const material = new THREE.MeshNormalMaterial({
      'wireframe': false
    });

    return material;
  }

  const rotateMesh = () => {
    // publish mesh rotation as an event
    eventBus.publish('rotation',mesh.rotation);

    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  }

  this.update = function(){
    rotateMesh();
  }

  const geometry = setGeometry();
  const material = setMaterial();

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
}

export default SceneSubject;
