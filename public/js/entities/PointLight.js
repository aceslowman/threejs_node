import * as THREE from "three";
import StandardEntity from "./StandardEntity";

/*
  PointLight Entity
*/

export default class PointLight extends StandardEntity{

  setup(){
    this.intensity = 1;
    this.mesh = new THREE.PointLight( 0xffffff, this.intensity );
    this.mesh.position.set(1,1,1);
    this.setupGUI();
    this.setupHelpers();
  }

  update(){}

  setupGUI(){
    this.gui.light = this.gui.addFolder("Light");
    this.gui.light.add(this.mesh,"intensity");
    this.gui.light.transform = this.gui.light.addFolder("Transform");
    this.gui.light.transform.add(this.mesh.position,"x");
    this.gui.light.transform.add(this.mesh.position,"y");
    this.gui.light.transform.add(this.mesh.position,"z");
  }

  setupHelpers(){
    this.lighthelper = new THREE.PointLightHelper( this.mesh, 0.1 );
    this.scene.add( this.lighthelper );
  }

}
