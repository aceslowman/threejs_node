import * as THREE from "three";

const Box = function(scene, eventBus, gui){
  this.params = {
    'scale': 1,
    'speed': 0.009
  }

  this.gui = gui.addFolder('Bounding Box');
  this.gui.add(this.params,'scale',0,2);

  const geometry = new THREE.BoxBufferGeometry(
    this.params.scale,
    this.params.scale,
    this.params.scale
  );

  const material = new THREE.MeshNormalMaterial({
    'wireframe': true
  });

  //---------------------------------

  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  //---------------------------------

  this.update = function(){
    mesh.scale.set(
      this.params.scale,
      this.params.scale,
      this.params.scale
    );
  }
}

export default Box;
