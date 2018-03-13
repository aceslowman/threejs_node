import * as THREE from "three";

import Cylinder from "./Cylinder";
import Box from "./Box";

//------------------------------------------------------------------------------
const CylinderGrid = function(scene, eventBus, gui){
  this.setup = () => {
    this.group = new THREE.Group();

    this.cylinders  = [];
    this.resolution = 3;
    this.scale      = 1.7;
    this.drawBox    = true;

    this.generateGrid();

    if(this.drawBox){
      this.generateBox();
    }

    scene.add(this.group);
  }

  this.setupGUI = () => {
    this.gui = gui.addFolder('Cylinder Grid');
    this.scale_ctrl = this.gui.add(this,'scale',0,2);
    this.res_ctrl   = this.gui.add(this,'resolution',0,10).step(1);
    this.box_ctrl   = this.gui.add(this,'drawBox');

    this.scale_ctrl.onChange(()=>{
      this.group.scale.set(this.scale,this.scale,this.scale);
    });

    this.res_ctrl.onChange(()=>{
      for(let i = 0; i < this.cylinders.length; i++){
        this.group.remove(this.cylinders[i].mesh);
      }
      this.generateGrid();
    });

    this.box_ctrl.onChange((value)=>{
      if(value){
        this.generateBox();
      }else{
        scene.remove(this.bounding_box);
      }
    });

    this.gui.open();
  }

  this.generateGrid = () => {
    this.cylinders = [];

    for(let x = 0; x < this.resolution; x++){
      for(let y = 0; y < this.resolution; y++){
        let cylinder = new Cylinder(scene, eventBus, gui);
        let circum = this.scale / (this.resolution - 1);

        cylinder.mesh.scale.set(circum/2,circum/2,circum/2);

        cylinder.mesh.position.x = (circum * x) - (this.scale / 2);
        cylinder.mesh.position.y = (circum * y) - (this.scale / 2);

        this.group.add(cylinder.mesh);
        this.cylinders.push(cylinder);
      }
    }
  }

  this.generateBox = () => {
    const geometry = new THREE.BoxBufferGeometry(
      this.scale,
      this.scale,
      this.scale
    );

    const material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });

    this.bounding_box = new THREE.Mesh(geometry, material);

    this.group.add(this.bounding_box);
  }

  this.update = () => {}

  this.setup();
  this.setupGUI();
}

export default CylinderGrid;
