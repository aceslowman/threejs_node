import * as THREE from "three";

/*
  TODO: when merging, create new faces
*/

const CapsuleGeometry = (radius = 1, width_segments = 16, height_segments = 16, middle_length = 1, middle_segments = 3) => {
  const dome = new THREE.SphereGeometry( radius, width_segments, height_segments, 0, Math.PI*2, 0, Math.PI/2);

  const dome_copy = dome.clone();

  const matrix = (new THREE.Matrix4()).identity();
  matrix.elements[0] = -1;
  matrix.elements[5] = -1;
  matrix.elements[10] = -1;
  matrix.setPosition(new THREE.Vector3(0,-1,0));

  // dome_copy.verticesNeedUpdate = true;
  // dome_copy.elementsNeedUpdate = true;
  // dome.verticesNeedUpdate = true;
  // dome.elementsNeedUpdate = true;

  dome.merge(dome_copy, matrix);

  return dome;
}

export default CapsuleGeometry;
