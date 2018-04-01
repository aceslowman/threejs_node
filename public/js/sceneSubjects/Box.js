import * as THREE from "three";

export default class Box {
  constructor(template){
    this.template = template
    this.speed = 0.01;
    this.geometry = new THREE.BoxBufferGeometry();
    this.material = new THREE.MeshNormalMaterial({ 'wireframe': true });
    this.mesh     = new THREE.Mesh(this.geometry, this.material);

    this.template.scene.add(this.mesh);
    this.template.addSubject(this);

    this.gui = template.gui;
    this.setupGUI();
  }

  setupGUI(){
    this.gui.box = this.gui.addFolder('Box');
    this.gui.box.scale = this.gui.addFolder('Scale');
    this.gui.box.scale.add(this.mesh.scale,'x',-10,10);
    this.gui.box.scale.add(this.mesh.scale,'y',-10,10);
    this.gui.box.scale.add(this.mesh.scale,'z',-10,10);
    this.gui.box.add(this, 'speed', 0.001, 0.5);
  }

  update(){
    // this.eventBus.publish('rotation', this.mesh.rotation);
    // this.mesh.rotation.x += this.speed;
    // this.mesh.rotation.y += this.speed;
  }
}
