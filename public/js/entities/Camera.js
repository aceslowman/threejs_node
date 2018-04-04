import * as THREE from "three";
import StandardEntity from "./StandardEntity";

/*
  Camera Entity

  @param manager - the associated scene/renderer manager
  @param options -
*/
export default class Camera extends StandardEntity{
  constructor( manager ){
    super( manager );
  }

  setup(){

  }

  update(){

  }

  setupGUI(){
    this.gui.camera = this.gui.addFolder('Camera');
    this.gui.camera.transform = this.gui.camera.addFolder('Transform');
    this.gui.camera.transform.position = this.gui.camera.transform.addFolder('Position');

    this.gui.camera.transform.position.add(this.cam.position,'x').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.cam.position,'y').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.transform.position.add(this.cam.position,'z').onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'focalLength',0,150).onChange((value)=>{
      if(this.cam.isPerspectiveCamera){
        this.cam.setFocalLength(value);
      }
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'zoom',0,10).onChange((value)=>{
      this.cam.zoom = value;
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'ortho').onChange((value)=>{
      this.ortho ? this.cam = this.ortho_cam : this.cam = this.perspective_cam;
      this.cam.updateProjectionMatrix();
    });

    this.gui.camera.add(this,'useControls').onChange((value)=>{
      if(this.orbitControls){
        this.orbitControls.enabled = value;
      }else if(value){
        this.setupControls();
      }
    });

    this.gui.camera.close();
  }
}
