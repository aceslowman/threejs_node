import * as THREE from "three";

export default class Polyline {
  constructor(scene, eventBus, gui){
    this.points = [
      new THREE.Vector3( -1.0, 0.0, 0.0),
      new THREE.Vector3( 0.0, 0.0, 0.0),
      new THREE.Vector3( 1.0, 0.0, 0.0)
    ];

    this.eventBus = eventBus;
    this.gui = gui;
    this.debug = true;
    this.scene = scene;
    this.subdivisions = 2;
    this.debug = {
      points: new Array()
    };

    this.build();
    this.setupGUI();
  }

  build(){
    this.geometry = new THREE.Geometry().setFromPoints( this.points );
    this.subdivide(this.subdivisions);

    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1
    });

    this.mesh = new THREE.Line(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  destroy(){
    for(let i = 0; i < this.debug.points.length; i++){
      this.scene.remove(this.debug.points[i]);
    }
    this.scene.remove(this.mesh);
  }

  setupGUI(){
    this.gui = this.gui.addFolder('Lines');
    this.gui.add(this,'subdivisions',1,10).step(1).onFinishChange(()=>{
      this.destroy();
      this.build();
    });
  }

  update(){ }

  drawPoints(){
    for(let i = 0; i < this.geometry.vertices.length; i++){
      let geo = new THREE.Geometry();
      geo.vertices.push(this.geometry.vertices[i]);
      let mat = new THREE.PointsMaterial({
        size: 0.1
      });
      let dot = new THREE.Points( geo, mat );
      this.scene.add( dot );
      this.debug.points.push(dot);
    }
  }

  subdivide(levels){
    this.geometry.mergeVertices();

    let new_verts;
    let verts = this.geometry.vertices;

    while(levels -- > 0){
      new_verts = new Array();
      new_verts.push(verts[0]);

      for(let j = 1; j < verts.length; j++){
        let current = verts[j];
        let previous = verts[j-1];

        let midpoint = new THREE.Vector3();
        midpoint.x = (current.x + previous.x) / 2.0;
        midpoint.y = (current.y + previous.y) / 2.0;
        midpoint.z = (current.z + previous.z) / 2.0;

        // console.log("PREV", previous);
        // console.log("MIDPOINT", midpoint);
        // console.log("CURRENT", current);

        new_verts.push(midpoint);
        new_verts.push(verts[j]);
      }

      verts = new_verts;
    }

    this.geometry.vertices = new_verts;
    this.geometry.verticesNeedUpdate = true;
    this.geometry.facesNeedUpdate = true;
    if(this.debug) this.drawPoints();
  }
}
