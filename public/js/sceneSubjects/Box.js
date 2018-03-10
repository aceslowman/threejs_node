import * as THREE from "three";

const Box = function(scene, eventBus, gui){
  this.params = {
    'scale': 1,
    'speed': 0.009
  }

  const setGeometry = () => {
    const geometry = new THREE.BoxBufferGeometry(
      this.params.scale,
      this.params.scale,
      this.params.scale
    );

    return geometry;
  }

  const setMaterial = () => {
    const material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });

    return material;
  }

  //---------------------------------

  const geometry = setGeometry();
  const material = setMaterial();

  const mesh = new THREE.Mesh(geometry, material);

  gui.add(this.params, 'speed', 0.001, 0.5);
  gui.add(this.params, 'scale', 0.1, 2);

  scene.add(mesh);

  //---------------------------------

  this.update = function(){
    eventBus.publish('rotation', mesh.rotation);

    mesh.rotation.x += this.params.speed;
    mesh.rotation.y += this.params.speed;

    mesh.scale.set(
      this.params.scale,
      this.params.scale,
      this.params.scale
    );
  }
}

export default Box;
