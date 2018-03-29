import * as THREE from "three";

import asManager from "./asManager";

import * as feedback from '../shaders/feedback';

export default class asFeedbackManager extends asManager{
  constructor(gui){
    super(gui);

    // override background and set renderer clear color for feedback
    this.scene.background = null;
    this.renderer.setClearColor(0x000000, 0);

    /*
      Setup an orthographic camera for rendering-to-texture
    */
    const setupCamera = () => {
      this.orthoCamera = new THREE.OrthographicCamera(
          this.width / - 2,
          this.width / 2,
          this.height / 2,
          this.height / -2,
          1,
          1000
      );

      this.orthoCamera.position.z = 1;
    }

    /*

    */
    const setupTargets = () => {
      this.mainTarget   = new THREE.WebGLRenderTarget( this.width, this.height, {
        format: THREE.RGBAFormat
      });
      this.interTarget  = new THREE.WebGLRenderTarget( this.width, this.height, {
        format: THREE.RGBAFormat
      });
      this.outputTarget = new THREE.WebGLRenderTarget( this.width, this.height, {
        format: THREE.RGBAFormat
      });

      setupFeedbackScene();
      setupOutputScene();
    }

    /*
      The feedback scene is to allow us to render-to-texture.
    */
    const setupFeedbackScene = () => {
      this.feedbackScene = new THREE.Scene();

      this.feedbackUniforms = {
          tex0: { value: this.interTarget.texture },
          tex1: { value: this.mainTarget.texture },
          feedback: { value: 1.0 },
          scale: { value: 1.02 },
          vPoint: { value: [0.5,0.5] }
      };

      this.feedback_gui = gui.addFolder('Feedback Shader');

      this.feedback_gui.add(this.feedbackUniforms.feedback,'value',0,1).name('Amount');
      this.feedback_gui.add(this.feedbackUniforms.scale,'value',0,2).name('Scale');
      this.feedback_gui.open();

      const geometry = new THREE.PlaneBufferGeometry( 2., 2.);
      const material = new THREE.ShaderMaterial({
        uniforms: this.feedbackUniforms,
        vertexShader: feedback.vert,
        fragmentShader: feedback.frag,
        transparent: true
      });

      const quad = new THREE.Mesh( geometry, material );
      this.feedbackScene.add( quad );
    }

    /*
      The output scene is the final view, upon which we render all
      prior output upon a simple plane buffer object.
    */
    const setupOutputScene = () => {
      this.outputScene = new THREE.Scene();
      this.outputScene.background = new THREE.Color( 0x000000 );

      const geometry = new THREE.PlaneBufferGeometry( this.width, this.height );
      const material = new THREE.MeshBasicMaterial({
        map: this.outputTarget.texture,
        transparent: true
      });

      this.outputQuad = new THREE.Mesh( geometry, material );
      this.outputScene.add( this.outputQuad );
    }

    setupCamera();
    setupTargets();
  }

  update(){
    for(let i=0; i < this._subjects.length; i++){
      this._subjects[i].update();
    }

    this.camera.update();

    //render the main scene to the main target
    this.renderer.render(this.scene, this.camera.cam, this.mainTarget);
    //render the feedback to the output target
    this.renderer.render(this.feedbackScene, this.orthoCamera, this.outputTarget);

    //target pingpong
    let tempTarget = this.interTarget;
    this.interTarget = this.outputTarget;
    this.outputTarget = tempTarget;

    this.feedbackUniforms.tex0.value = this.interTarget.texture;
    this.outputQuad.material.map = this.outputTarget.texture;

    this.renderer.render(this.outputScene, this.orthoCamera);
  }
}
