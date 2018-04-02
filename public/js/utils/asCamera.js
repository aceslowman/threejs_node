import * as THREE from "three";

/*
class myClass {
  constructor({a = 'default a value', b = 'default b value', c = 'default c value'} = {a:'default option a', b:'default option b', c:'default option c'}) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
var v = new myClass({a:'a value', b: 'b value'});
console.log(v.toSource());
var w = new myClass();
console.log(w.toSource());
*/

/*
  This camera helper needs a few things.

  for the base functionality...
    scene, eventBus, gui

  for the camera...
    cam, ortho, zoom, position, focalLength
*/

class Base {
  constructor({scene, eventBus, gui}){
    this.scene = scene;
    this.eventBus = eventBus;
    this.gui = gui;
  }
}

export default class asCamera extends Base{
  constructor({
    scene,
    eventBus,
    gui,
    zoom = '1',
    ortho = false,
    orbit = false,
    focalLength,
  }){
    super({scene, eventBus, gui});
    this.aspect = window.innerWidth / window.innerHeight;
    this.cam = new THREE.PerspectiveCamera(
      75,           // fov
      this.aspect,  // aspect
      0.1,          // near
      1000          // far
    );

    this.focalLength = this.cam.getFocalLength();
    this.cam.position.z = 2;
    this.cam.updateProjectionMatrix();
    //
    if(this.orbit) this.setupOrbit();
    this.setupGUI();
  }

  set zoom(v){
    this.cam.zoom = v;
    this.cam.updateProjectionMatrix();
  }

  set ortho(v){
    if(v){
      this.cam = new THREE.OrthographicCamera(
        this.aspect / - 2,
        this.aspect / 2,
        this.aspect / 2,
        this.aspect / - 2,
        0,
        1000
      );
    }else{
      this.cam = new THREE.PerspectiveCamera(
        75,           // fov
        this.aspect,  // aspect
        0.1,          // near
        1000          // far
      );
    }
  }

  set orbit(v){
    if(v) this.setupOrbit();
  }

  set focalLength(v){
    if(this.cam.isPerspectiveCamera){
      this.cam.setFocalLength(v);
    }
    this.cam.updateProjectionMatrix();
  }

  setupOrbit(){
    this.controls = new asOrbitControls( manager.camera.cam, manager.renderer.domElement );
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.8;
    this.controls.panningMode = THREE.HorizontalPanning; // default is THREE.ScreenSpacePanning
    this.controls.minDistance = 0.01;
    this.controls.maxDistance = 10;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.autoRotate = true;
  }

  setupGUI(){
    this.gui = this.gui.addFolder('Camera');
    this.gui.position = this.gui.addFolder('Position');

    this.gui.position.add(this.cam.position,'x',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.position.add(this.cam.position,'y',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.position.add(this.cam.position,'z',-10,10).onChange(()=>{
      this.cam.updateProjectionMatrix();
    });

    this.gui.add(this,'focalLength',0,150);
    this.gui.add(this,'zoom',0,10);
    this.gui.add(this,'ortho');
    this.gui.add(this,"orbit");

    this.gui.close();
  }

  update(){}
}
