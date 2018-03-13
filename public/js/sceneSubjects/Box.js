import * as THREE from "three";

const Box = function(scene, eventBus, gui){
  this.setupGUI = () => {
    this.params = {
      'scale': 1,
      'speed': 0.009
    }

    this.gui = gui.addFolder('Bounding Box');
    this.scale_control = this.gui.add(this.params,'scale',0,2);

    this.scale_control.onChange(()=>{
      mesh.scale.set(
        this.params.scale,
        this.params.scale,
        this.params.scale
      );
    })
  }

  this.setup = () => {
    const geometry = new THREE.BoxBufferGeometry(
      this.params.scale,
      this.params.scale,
      this.params.scale
    );

    const material = new THREE.MeshNormalMaterial({
      'wireframe': true
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
  }

  this.update = () => {}

  this.setupGUI();
  this.setup();
}

export default Box;
