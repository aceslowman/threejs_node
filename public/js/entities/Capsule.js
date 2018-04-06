import * as THREE from "three";
import StandardEntity from "./StandardEntity";
import CapsuleGeometry from "../components/geometry/CapsuleGeometry.js";

/*
  Box Entity
*/

export default class Capsule extends StandardEntity{

  setup(){
    this.radius = 1;
    this.height = 1;
    this.N = 32;
    this.middleSegments = 5;

    this.geometry = new CapsuleGeometry(this.radius,this.height,this.N, this.middleSegments);
    // this.material = new THREE.MeshNormalMaterial({wireframe:true, side: THREE.DoubleSide});
    this.material = new THREE.MeshPhongMaterial({});

    this.mesh = new THREE.Mesh(this.geometry,this.material);

    // this.facehelper = new THREE.FaceNormalsHelper( this.mesh, 0.1, 0xffffff, 1 );
    // this.vertexhelper = new THREE.VertexNormalsHelper( this.mesh, 0.1, 0x33ff44, 1 );
    // this.scene.add(this.facehelper);
    // this.scene.add(this.vertexhelper);

    this.setupGUI();
  }

  update(){}

  setupGUI(){
    this.gui.capsule = this.gui.addFolder("Capsule");
    this.gui.capsule.add(this.material,"wireframe");
  }

}
