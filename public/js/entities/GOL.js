import * as THREE from 'three';
import GPUComputationRenderer from '../utilities/GPUComputationRenderer';
import * as automataShader from '../shaders/automataShader';

export default class GOL {
  constructor(manager){
    this.manager = manager;

    this.GPUWIDTH = 128;

    this.last = 0;

    this.manager.addEntity(this);

    this.initComputeRenderer();
    this.setupDebug();
  }

  fillAutomataTexture(texture){
    let theArray = texture.image.data;
    let width = Math.sqrt(theArray.length);

    for (let k = 0, kl = theArray.length; k < kl; k += 4) {
      let x = 0;

      if(k % width == (width/2) && ~~(k / width) < (width/2)){
        x = 1;
      }

      theArray[k + 0] = x;
      theArray[k + 1] = 0;
      theArray[k + 2] = 0;
      theArray[k + 3] = 1;
    }
  }

  initComputeRenderer(){
    /*
      the GPUComputationRenderer has two render targets.

      this.gpuCompute.getCurrentRenderTarget(variable)
      this.gpuCompute.getAlternateRenderTarget(variable)
    */

    this.gpuCompute = new GPUComputationRenderer(this.GPUWIDTH, this.GPUWIDTH,
      this.manager.renderer);

    let dtautomata = this.gpuCompute.createTexture();
    this.fillAutomataTexture(dtautomata);

    this.automataVariable = this.gpuCompute.addVariable('textureautomata',
      automataShader.frag, dtautomata);

    this.automataUniforms = this.automataVariable.material.uniforms;

    this.automataUniforms['time'] = { value: 0.0 };
    this.automataUniforms['delta'] = { value: 0.0 };
    this.automataUniforms['state'] = { value: null };

    this.automataVariable.wrapS = THREE.RepeatWrapping;
    this.automataVariable.wrapT = THREE.RepeatWrapping;

    let error = this.gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
  }

  setupDebug(){
    this.automata_debug_material = new THREE.MeshBasicMaterial();
    let geometry = new THREE.PlaneBufferGeometry(500, 500, 1);
    let a_mesh = new THREE.Mesh(geometry, this.automata_debug_material);
    this.manager.scene.add(a_mesh);

    // this.automata_alt_debug_material = new THREE.MeshBasicMaterial();
    // let a_alt_mesh = new THREE.Mesh(geometry, this.automata_alt_debug_material);
    // this.manager.scene.add(a_alt_mesh);

    // a_mesh.position.x = - 135;
    // a_alt_mesh.position.x = 135;
  }

  update(){
    let now = performance.now();
    let delta = (now - this.last) / 1000;

    if(delta > 1) delta = 1;
    this.last = now;

    let automata_texture = this.gpuCompute.getCurrentRenderTarget(
      this.automataVariable).texture;
    this.automata_debug_material.map = automata_texture;

    let automata_alt_texture = this.gpuCompute.getAlternateRenderTarget(
      this.automataVariable).texture;
    // this.automata_alt_debug_material.map = automata_alt_texture;

    this.automataUniforms['time'].value = now;
    this.automataUniforms['delta'].value = delta;
    this.automataUniforms['state'].value = automata_texture;

    this.gpuCompute.compute();
  }
}
