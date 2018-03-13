import * as THREE from "three";

import Cylinder from "./Cylinder";
import Box from "./Box";

//------------------------------------------------------------------------------
const CylinderGrid = function(scene, eventBus, gui){
  this.setup = () => {
    this.group = new THREE.Group();

    this.cylinders  = [];
    this.resolution = this.params.resolution;
    this.scale      = this.params.scale;

    this.generateGrid();

    if(this.params.drawBox){
      this.generateBox();
    }

    scene.add(this.group);
  }

  this.setupGUI = () => {
    this.params = {
      'scale': 1,
      'resolution': 6,
      'drawBox': true
    }

    this.gui = gui.addFolder('Cylinder Grid');
    this.scale_ctrl = this.gui.add(this,'scale',0,2);
    this.res_ctrl   = this.gui.add(this.params,'resolution',0,10).step(1);
    this.box_ctrl   = this.gui.add(this.params,'drawBox');

    this.scale_ctrl.onChange((value)=>{
      this.scale = value;

      this.group.scale.set(this.scale,this.scale,this.scale);
    });

    this.res_ctrl.onChange(()=>{
      for(let i = 0; i < this.cylinders.length; i++){
        scene.remove(this.cylinders[i].getMesh());
      }
      this.resolution = this.params.resolution;
      this.generateGrid();
    });

    this.box_ctrl.onChange((value)=>{
      if(value){
        this.generateBox();
      }else{
        scene.remove(this.bounding_box);
      }
    });
  }

  this.generateGrid = () => {
    this.cylinders = [];

    for(let x = 0; x < this.resolution; x++){
      for(let y = 0; y < this.resolution; y++){
        let cylinder = new Cylinder(scene, eventBus, gui);
        let circum = this.scale / (this.resolution - 1);

        cylinder.getMesh().scale.set(circum/2,circum/2,circum/2);

        cylinder.getMesh().position.x = (circum * x) - (this.scale / 2);
        cylinder.getMesh().position.y = (circum * y) - (this.scale / 2);

        this.group.add(cylinder.getMesh());
        this.cylinders.push(cylinder);
      }
    }
  }

  this.generateBox = () => {
    const geometry = new THREE.BoxBufferGeometry(
      this.params.scale,
      this.params.scale,
      this.params.scale
    );

    const material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });

    this.bounding_box = new THREE.Mesh(geometry, material);

    scene.add(this.bounding_box);
  }

  this.update = () => {}

  this.setupGUI();
  this.setup();
}

export default CylinderGrid;
