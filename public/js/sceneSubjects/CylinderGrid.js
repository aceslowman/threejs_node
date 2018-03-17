import * as THREE from "three";

import Cylinder from "./Cylinder";
import Box from "./Box";

//------------------------------------------------------------------------------
const CylinderGrid = function(scene, eventBus, gui){
  this.setup = () => {
    this.group = new THREE.Group();

    this.cylinders  = [];
    this.resolution = 5;
    this.scale      = 0.5;
    this.gridspace  = 2.8;
    this.wireframe  = false;

    this.generateGrid();

    if(this.drawBox){
      this.generateBox();
    }

    this.group.scale.set(this.scale,this.scale,this.scale);
    this.group.position.z = -2;

    scene.add(this.group);
  }

  this.setupGUI = () => {
    this.gui = gui.addFolder('Cylinder Grid');

    this.gui.add(this,'scale',0,10).onChange(()=>{
      this.group.scale.set(this.scale,this.scale,this.scale);
    });

    this.gui.add(this,'resolution',0,20).step(1).onChange(()=>{
      for(let i = 0; i < this.cylinders.length; i++){
        this.group.remove(this.cylinders[i].mesh);
      }
      this.generateGrid();
    });

    this.gui.add(this,'gridspace',0,5).onChange(()=>{
      for(let x = 0, i = 0; x < this.resolution; x++){
        for(let y = 0; y < this.resolution; y++, i++){
          let circum = this.scale / (this.resolution - 1);

          this.cylinders[i].mesh.position.x =
            (circum * x - this.scale / 2) * (1 + this.gridspace);
          this.cylinders[i].mesh.position.y =
            (circum * y - this.scale / 2) * (1 + this.gridspace);
        }
      }
    });

    this.gui.add(this,'wireframe').onChange((value)=>{
      for(let i = 0; i < this.cylinders.length; i++){
        this.cylinders[i].material.wireframe = value;
      }
    });

    this.gui.add(this.group.rotation,'x',-Math.PI*2,Math.PI*2).step(0.01);
    this.gui.add(this.group.rotation,'y',-Math.PI*2,Math.PI*2).step(0.01);
    this.gui.add(this.group.rotation,'z',-Math.PI*2,Math.PI*2).step(0.01);

    this.gui.open();
  }

  this.generateGrid = () => {
    this.cylinders = [];

    for(let x = 0; x < this.resolution; x++){
      for(let y = 0; y < this.resolution; y++){
        let cylinder = new Cylinder(scene, eventBus, gui);
        let circum = this.scale / (this.resolution - 1);

        cylinder.mesh.scale.set(circum/2,this.scale,circum/2);

        cylinder.mesh.position.x =
          (circum * x - this.scale / 2) * (1 + this.gridspace);
        cylinder.mesh.position.y =
          (circum * y - this.scale / 2) * (1 + this.gridspace);

        cylinder.material.wireframe = this.wireframe;

        this.group.add(cylinder.mesh);
        this.cylinders.push(cylinder);
      }
    }
  }

  this.update = () => {}

  this.setup();
  this.setupGUI();
}

export default CylinderGrid;
