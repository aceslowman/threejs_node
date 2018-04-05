import * as THREE from "three";
import StandardEntity from "./StandardEntity";
import CapsuleGeometry from "../components/geometry/CapsuleGeometry.js";

/*
  Box Entity
*/

export default class Capsule extends StandardEntity{

  setup(){
    this.width_segments = 8;
    this.height_segments = 8;
    this.geometry = new CapsuleGeometry(
      1,
      this.width_segments,
      this.height_segments
    );
    this.material = new THREE.MeshNormalMaterial({wireframe: false});

    this.mesh = new THREE.Mesh(this.geometry,this.material);
  }

  update(){}

  setupGUI(){}

}
