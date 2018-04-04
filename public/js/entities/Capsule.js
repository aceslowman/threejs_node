import * as THREE from "three";
import CapsuleGeometry from "../utils/geometry/asCapsuleGeometry.js";

export default class Capsule{
  constructor(template){
    this.template = template;

    this.width_segments = 16;
    this.height_segments = 16;
    this.geometry = new CapsuleGeometry(1,this.width_segments,this.height_segments);
    this.material = new THREE.MeshNormalMaterial({wireframe: true});

    this.mesh = new THREE.Mesh(this.geometry,this.material);

    this.template.scene.add(this.mesh);
    this.template.addSubject(this);
  }

  update(){}
}
