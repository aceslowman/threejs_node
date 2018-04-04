import * as THREE from "three";
import StandardEntity from "./StandardEntity";

/*
  Box Entity

  @param manager - the associated scene/renderer manager
  @param options -
*/
export default class Box extends StandardEntity{

  setup(){
    this.geometry = new THREE.BoxBufferGeometry();
    this.material = new THREE.MeshNormalMaterial( { 'wireframe': true } );
    this.mesh     = new THREE.Mesh( this.geometry, this.material );

    this.setupGUI();
  }

  update(){

  }

  setupGUI(){
    this.gui.box = this.gui.addFolder("Box");
    this.gui.box.transform = this.gui.box.addFolder("Transform");
    this.gui.box.transform.add(this.mesh.position,"x").step(0.1);
    this.gui.box.transform.add(this.mesh.position,"y").step(0.1);
    this.gui.box.transform.add(this.mesh.position,"z").step(0.1);
  }

}
