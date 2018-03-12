import * as THREE from "three";
import Cylinder from "./Cylinder";

//------------------------------------------------------------------------------
const CylinderGrid = function(scene, eventBus, gui){
  this.params = {
    'scale': 1,
    'resolution': 6
  }

  this.previous_params = this.params;

  this.gui = gui.addFolder('Cylinder Grid');
  const scale_ctrl = this.gui.add(this.params,'scale',0,2);
  const res_ctrl = this.gui.add(this.params,'resolution',0,10).step(1);

  this.cylinders  = [];
  this.resolution = this.params.resolution;
  this.scale      = this.params.scale;

  const generateGrid = () => {
    this.cylinders = [];

    for(let x = 0; x < this.resolution; x++){
      for(let y = 0; y < this.resolution; y++){
        let cylinder = new Cylinder(scene, eventBus, gui);
        let circum = this.scale / (this.resolution - 1);

        cylinder.getMesh().scale.set(circum/2,circum/2,circum/2);

        cylinder.getMesh().position.x = (circum * x) - (this.scale / 2);
        cylinder.getMesh().position.y = (circum * y) - (this.scale / 2);

        this.cylinders.push(cylinder);
      }
    }
  }

  generateGrid();


  //control.onChange() will be triggered whenever a change is detected
  res_ctrl.onChange(()=>{
    for(let i = 0; i < this.cylinders.length; i++){
      scene.remove(this.cylinders[i].getMesh());
    }
    this.resolution = this.params.resolution;
    generateGrid();
  });

  this.update = () => {

  }
}

export default CylinderGrid;
