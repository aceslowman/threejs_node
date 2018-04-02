import * as THREE from "three";

export default class Box {
  constructor(template, {
    wireframe = false
  }={}){
    this.template = template
    this.geometry = new THREE.BoxBufferGeometry();
    this.material = new THREE.MeshNormalMaterial({ 'wireframe': wireframe });
    this.mesh     = new THREE.Mesh(this.geometry, this.material);

    this.template.scene.add(this.mesh);
    this.template.addSubject(this);

    this.gui = template.gui;
    this.setupGUI();
  }

  setupGUI(){
    this.gui.box = this.gui.addFolder('Box');
    this.gui.box.transform = this.gui.box.addFolder('Transform');
    this.gui.box.transform.scale = this.gui.box.transform.addFolder('Scale');
    this.gui.box.transform.scale.add(this.mesh.scale,'x');
    this.gui.box.transform.scale.add(this.mesh.scale,'y');
    this.gui.box.transform.scale.add(this.mesh.scale,'z');
    this.gui.box.transform.position = this.gui.box.transform.addFolder('Position');
    this.gui.box.transform.position.add(this.mesh.position,'x');
    this.gui.box.transform.position.add(this.mesh.position,'y');
    this.gui.box.transform.position.add(this.mesh.position,'z');
    this.gui.box.transform.rotation = this.gui.box.transform.addFolder('Rotation');
    this.gui.box.transform.rotation.add(this.mesh.rotation,'x');
    this.gui.box.transform.rotation.add(this.mesh.rotation,'y');
    this.gui.box.transform.rotation.add(this.mesh.rotation,'z');
    this.gui.box.add(this.material,"wireframe");
  }

  update(){
    // this.eventBus.publish('rotation', this.mesh.rotation);
  }
}
