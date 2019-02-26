import * as THREE from "three";
import Stats from "stats-js";

export default class Debug{
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
      if(value){
        this.assembleStats()
      }else{
        this.stats.domElement.style.display = 'hidden';
      }
    });

    this.gui.debug.add(this,"showGrid").onChange((value)=>{
      if(value){
        this.assembleGrid()
      }else{
        this.template.scene.remove(this.grid_x.helper);
        this.template.scene.remove(this.grid_y.helper);
        this.template.scene.remove(this.grid_z.helper);
      }
    });
  }

  assembleStats(){
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.bottom = '0px';
    this.stats.domElement.style.display = 'visible';
    this.stats.domElement.style.top = '';
    document.body.appendChild( this.stats.domElement );
  }

  // TODO: allow for boolean (x,y,z)
  assembleGrid(){
    this.grid_x = new Object();
    this.grid_x.size = this.options.grid.size || 10;
    this.grid_x.divisions = this.options.grid.divisions || 10;

    this.grid_x.helper = new THREE.GridHelper(
      this.grid_x.size,
      this.grid_x.divisions,
      new THREE.Color("orange"),
      new THREE.Color("red")
    );
    this.grid_x.helper.rotation.x = Math.PI / 2;
    this.template.scene.add( this.grid_x.helper );

    this.grid_y = new Object();
    this.grid_y.size = this.options.grid.size || 10;
    this.grid_y.divisions = this.options.grid.divisions || 10;

    this.grid_y.helper = new THREE.GridHelper(
      this.grid_y.size,
      this.grid_y.divisions,
      new THREE.Color("orange"),
      new THREE.Color("green")
    );
    this.grid_y.helper.rotation.y = Math.PI / 2;
    this.template.scene.add( this.grid_y.helper );

    this.grid_z = new Object();
    this.grid_z.size = this.options.grid.size || 10;
    this.grid_z.divisions = this.options.grid.divisions || 10;

    this.grid_z.helper = new THREE.GridHelper(
      this.grid_z.size,
      this.grid_z.divisions,
      new THREE.Color("orange"),
      new THREE.Color("blue")
    );
    this.grid_z.helper.rotation.z = Math.PI / 2;
    this.template.scene.add( this.grid_z.helper );
  }
}
