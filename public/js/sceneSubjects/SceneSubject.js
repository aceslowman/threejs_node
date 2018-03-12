import * as THREE from "three";

const SceneSubject = function(scene, eventBus, gui){
  this.params = {
    'scale': 1,
    'speed': 0.009
  }

  const geometry = new THREE.BoxBufferGeometry( 1,1,1 );

  const material = new THREE.MeshNormalMaterial({
    'wireframe': false
  });

  const rotateMesh = () => {
    // publish mesh rotation as an event
    //eventBus.publish('rotation',mesh.rotation);

    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  }

  this.update = function(){
    rotateMesh();
  }

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
}

export default SceneSubject;
