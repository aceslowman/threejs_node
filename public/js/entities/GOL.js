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

    this.raycaster = new THREE.Raycaster();

    window.addEventListener('click', (e)=>this.onClick(e), false);
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
    this.mesh = new THREE.Mesh(geometry, this.automata_debug_material);
    this.manager.scene.add(this.mesh);
  }

  update(){
    let now = performance.now();
    let delta = (now - this.last) / 1000;

    if(delta > 1) delta = 1;
    this.last = now;

    this.automata_texture = this.gpuCompute.getCurrentRenderTarget(
      this.automataVariable).texture;
    this.automata_debug_material.map = this.automata_texture;

    this.automata_alt_texture = this.gpuCompute.getAlternateRenderTarget(
      this.automataVariable).texture;

    this.automataUniforms['time'].value = now;
    this.automataUniforms['delta'].value = delta;
    this.automataUniforms['state'].value = this.automata_texture;

    this.gpuCompute.compute();
  }

  poke(x,y){
    let canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;

    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(256,0,0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    console.log('mouse position', [x,y]);
    this.gl = this.manager.renderer.getContext();

    let textureProperties = this.manager.renderer.properties.get(this.automata_alt_texture);
    if(!textureProperties.__webglTexture) console.error('failed to get texture properties');

    let activeTexture = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, textureProperties.__webglTexture);
    this.gl.texSubImage2D(
      this.gl.TEXTURE_2D,
      0,
      x - (canvas.width/2.0),
      y - (canvas.height/2.0),
      this.gl.RGBA,
      this.gl.FLOAT,
      canvas
    );

    this.gl.generateMipmap(this.gl.TEXTURE_2D);
    this.gl.bindTexture(this.gl.TEXTURE_2D, activeTexture);
  }

  onClick(e){
    e.preventDefault();
    let camera = this.manager.camera.getCamera();
    let mouse = new THREE.Vector2();

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera(mouse, camera);

    let intersects = this.raycaster.intersectObject(this.mesh);

    let v = intersects[0].uv.multiplyScalar(this.GPUWIDTH);

    this.poke(v.x,v.y);
  }
}
