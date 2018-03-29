import * as THREE from "three";

export default class Box {
  constructor(scene, eventBus, gui){
    this.speed = 0.01;
    this.geometry = new THREE.BoxBufferGeometry();
    this.material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    scene.add(this.mesh);

    this.eventBus = eventBus;
    this.setupGUI(gui);
  }

  setupGUI(gui){
    this.gui = gui.addFolder('Box');
    this.gui.scale = this.gui.addFolder('Scale');
    this.gui.scale.add(this.mesh.scale,'x',-10,10);
    this.gui.scale.add(this.mesh.scale,'y',-10,10);
    this.gui.scale.add(this.mesh.scale,'z',-10,10);
    this.gui.add(this, 'speed', 0.001, 0.5);
  }

  update(){
    // this.eventBus.publish('rotation', this.mesh.rotation);
    this.mesh.rotation.x += this.speed;
    this.mesh.rotation.y += this.speed;
  }
}
