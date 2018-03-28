import * as THREE from "three";

const Box = function(scene, eventBus, gui){
  this.setupGUI = () => {
    this.gui = gui.addFolder('Box');

    this.gui.scale = this.gui.addFolder('Scale');
    this.gui.scale.add(this.mesh.scale,'x',-10,10);
    this.gui.scale.add(this.mesh.scale,'y',-10,10);
    this.gui.scale.add(this.mesh.scale,'z',-10,10);

    this.gui.add(this, 'speed', 0.001, 0.5);
  }

  //---------------------------------
  this.setup = () => {
    this.speed = 0.01;

    this.geometry = new THREE.BoxBufferGeometry();

    this.material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    scene.add(this.mesh);
  }

  //---------------------------------

  this.update = function(){
    // eventBus.publish('rotation', mesh.rotation);

    this.mesh.rotation.x += this.speed;
    this.mesh.rotation.y += this.speed;
  }

  this.setup();
  this.setupGUI();
}

export default Box;
