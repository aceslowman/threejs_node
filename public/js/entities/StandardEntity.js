import * as THREE from "three";

/*
  Standard Entity
*/

export default class StandardEntity{
  constructor(manager){
    this.manager = manager;
    this.clock = manager.clock;
    this.scene = manager.scene;
    this.gui = manager.gui;

    this.material = new THREE.MeshBasicMaterial();
    this.geometry = new THREE.Geometry();
    this.mesh = new THREE.Mesh();

    this.components = [];

    this.setup();
    this.addToScene();
  }

  setup(){}

  update(){}

  addToScene(){
    this.scene.add(this.mesh);
    this.manager.addEntity(this);
  }
}
