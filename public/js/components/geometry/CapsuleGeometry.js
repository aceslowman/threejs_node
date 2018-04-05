import * as THREE from "three";

/*
  Implemented from a technique described here:
  http://paulbourke.net/geometry/capsule/

  PID2 taken from Paul Bourke's paulslib.h
  PID2 = 1.570796326794896619231322;
*/

const CapsuleGeometry = () => {
  const geometry = new THREE.Geometry();
  const TWOPI = Math.PI*2;

  const N = 32;
  const radius = 1;
  const height = 2;

  const PID2 = 1.570796326794896619231322;

  // top cap
  for(let i = 0; i <= N/4; i++){
    for(let j = 0; j <= N; j++){
      let theta = j * TWOPI / N;
      let phi = -PID2 + Math.PI * i / (N/2);
      let vertex = new THREE.Vector3();
      vertex.x = radius * Math.cos(phi) * Math.cos(theta);
      vertex.y = radius * Math.cos(phi) * Math.sin(theta);
      vertex.z = radius * Math.sin(phi);
      vertex.z -= height/2;
      geometry.vertices.push(vertex);
    }
  }

  // bottom cap
  for(let i = N/4; i <= N/2; i++){
    for(let j = 0; j <= N; j++){
      let theta = j * TWOPI / N;
      let phi = -PID2 + Math.PI * i / (N/2);
      let vertex = new THREE.Vector3();
      vertex.x = radius * Math.cos(phi) * Math.cos(theta);
      vertex.y = radius * Math.cos(phi) * Math.sin(theta);
      vertex.z = radius * Math.sin(phi);
      vertex.z += height/2;
      geometry.vertices.push(vertex);
    }
  }

  for(let i = 0; i <= N/2; i++){
    for(let j = 0; j < N; j++){
      let vec = new THREE.Vector4(
        i         * ( N + 1 ) +   j       ,
        i         * ( N + 1 ) + ( j + 1 ) ,
        ( i + 1 ) * ( N + 1 ) + ( j + 1 ) ,
        ( i + 1 ) * ( N + 1 ) +   j
      );

      let face_1 = new THREE.Face3(vec.x,vec.y,vec.z);
      let face_2 = new THREE.Face3(vec.x,vec.z,vec.w); //fix normals

      geometry.faces.push(face_1);
      geometry.faces.push(face_2);
    }
  }

  geometry.computeFaceNormals();
  console.log(geometry.vertices);

  return geometry;
}

export default CapsuleGeometry;
