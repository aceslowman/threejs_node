import * as THREE from 'three';
import GPUComputationRenderer from '../utilities/GPUComputationRenderer';
import * as automataShader from '../shaders/automataShader';

export default class GOL {
  constructor(manager){
    this.manager = manager;

    this.aspect = this.manager.width / this.manager.height;

    this.resolution = 256;

    this.GPUWIDTH = this.resolution;
    this.GPUHEIGHT = this.resolution / this.aspect;

    this.last = 0;

    this.manager.addEntity(this);

    this.setupInitialState();
    this.initComputeRenderer();
    this.setupDebug();

    this.raycaster = new THREE.Raycaster();

    this.brush_size = 50;

    window.addEventListener('click', (e)=>this.onClick(e), false);
    window.addEventListener('resize',(e)=>this.onResize(e), false);

    this.playing = true;
  }

  setupDebug(){
    this.automata_debug_material = new THREE.MeshBasicMaterial();
    let geometry = new THREE.PlaneBufferGeometry(this.manager.width, this.manager.height, 1);
    this.mesh = new THREE.Mesh(geometry, this.automata_debug_material);
    this.manager.scene.add(this.mesh);
  }

  setupInitialState(state){
    this.initialState = new Float32Array((this.GPUWIDTH * this.GPUHEIGHT)*4);

    let width = this.GPUWIDTH;
    let height = this.GPUHEIGHT;

    switch (state) {
      case 'clear':
        for (let k = 0, kl = this.initialState.length; k < kl; k += 4) {
          let x = 0;

          if(k % width > ~~(k/width) && k % height < ~~(k/height)){
            x = 1;
          }

          this.initialState[k + 0] = 0;
          this.initialState[k + 1] = 0;
          this.initialState[k + 2] = 0;
          this.initialState[k + 3] = 1;
        }

        break;
      default:
        for (let k = 0, kl = this.initialState.length; k < kl; k += 4) {
          let x = 0;

          if(k % width > ~~(k/width) && k % height < ~~(k/height)){
            x = 1;
          }

          this.initialState[k + 0] = x;
          this.initialState[k + 1] = x;
          this.initialState[k + 2] = x;
          this.initialState[k + 3] = 1;
        }
    }
  }

  initComputeRenderer(){
    this.gpuCompute = new GPUComputationRenderer(this.GPUWIDTH, this.GPUHEIGHT,
      this.manager.renderer);

    this.dtautomata = this.gpuCompute.createTexture();
    this.dtautomata.image.data = this.initialState;

    this.automataVariable = this.gpuCompute.addVariable('textureautomata',
      automataShader.frag, this.dtautomata);

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

  update(){
    let now = performance.now();
    let delta = (now - this.last) / 1000;

    if(delta > 1) delta = 1;
    this.last = now;

    this.automata_texture = this.gpuCompute.getCurrentRenderTarget(
      this.automataVariable).texture;

    this.automata_alt_texture = this.gpuCompute.getAlternateRenderTarget(
      this.automataVariable).texture;

    this.automata_debug_material.map = this.automata_texture;

    this.automataUniforms['time'].value = now;
    this.automataUniforms['delta'].value = delta;
    this.automataUniforms['state'].value = this.automata_texture;

    if(this.playing){
      this.gpuCompute.compute();
    }
  }

  //----------------------------------------------------------------------------

  poke(x,y){
    let canvas = document.createElement('canvas');
    canvas.width = this.brush_size;
    canvas.height = this.brush_size;

    let ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgb(256,0,0)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    this.gl = this.manager.renderer.getContext();

    // first, draw to the alt texture
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

    // then, draw to primary. this is so that we can poke while paused.
    textureProperties = this.manager.renderer.properties.get(this.automata_texture);
    if(!textureProperties.__webglTexture) console.error('failed to get texture properties');

    activeTexture = this.gl.getParameter(this.gl.TEXTURE_BINDING_2D);
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

  //----------------------------------------------------------------------------

  clear(){
    console.log('clearing');
    this.setupInitialState('clear');
    this.initComputeRenderer();
  }

  pause(){
    console.log('pausing');
    this.playing = false;
  }

  resume(){
    console.log('resuming');
    this.playing = true;
  }

  //----------------------------------------------------------------------------
  onClick(e){
    e.preventDefault();
    let camera = this.manager.camera.getCamera();
    let mouse = new THREE.Vector2();

    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera(mouse, camera);

    let intersects = this.raycaster.intersectObject(this.mesh);

    let v = intersects[0].uv;
    v.multiply(new THREE.Vector2(this.GPUWIDTH, this.GPUHEIGHT));

    this.poke(v.x,v.y);
  }

  onResize(e){
    // TODO: not sure how I want to go about this, but likely necessary

    // this.mesh.
  }
}
