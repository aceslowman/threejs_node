import * as THREE from "three";

const SceneSubject = function(scene, eventBus, gui){
  this.params = {
    'scale': 1,
    'speed': 0.009
  }

  const rotateMesh = () => {
    // publish mesh rotation as an event
    //eventBus.publish('rotation',mesh.rotation);

    mesh.rotation.x += 0.009;
    mesh.rotation.y += 0.009;
  }

  this.setupGUI = () => {

  }

  this.setup = () => {
    const geometry = new THREE.BoxBufferGeometry( 1,1,1 );

    const material = new THREE.MeshNormalMaterial({
      'wireframe': false
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  }

  this.update = function(){
    rotateMesh();
  }

  this.setupGUI();
  this.setup();
}

export default SceneSubject;
