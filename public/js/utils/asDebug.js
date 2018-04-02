import * as THREE from "three";
import Stats from "stats-js";

export default class asDebug{
  constructor(template, options){
    this.template = template;
    this.options = options;

    this.showStats = this.options.stats ? true : false;
    this.showGrid = this.options.grid ? true : false;

    if(this.showStats) this.assembleStats();
    if(this.showGrid)  this.assembleGrid();

    this.gui = this.template.gui;
    this.setupGUI();
  }

  setupGUI(){
    this.gui.debug = this.gui.addFolder("Debug");
    this.gui.debug.add(this,"showStats").onChange((value)=>{
      value ? this.assembleStats() : this.stats.domElement.style.display = 'hidden';
    });

    this.gui.debug.add(this,"showGrid").onChange((value)=>{
      value ? this.assembleGrid() : this.template.scene.remove(this.grid.helper);
    });
  }

  assembleStats(){
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.bottom = '0px';
    this.stats.domElement.style.display = 'visible';
    document.body.appendChild( this.stats.domElement );
  }

  assembleGrid(){
    this.grid = new Object();
    this.grid.size = this.options.grid.size || 10;
    this.grid.divisions = this.options.grid.divisions || 10;

    this.grid.helper = new THREE.GridHelper( this.grid.size, this.grid.divisions );
    this.template.scene.add( this.grid.helper );
  }
}
