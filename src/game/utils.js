import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;

export const createDirectionVector = (dir0, azimuth, theta) => {
  const newX = dir0.x - 1 * Math.cos(-1 * theta) * Math.sin(azimuth);
  const newZ = dir0.z - 1 * Math.cos(-1 * theta) * Math.cos(azimuth);
  const newY = dir0.y - 1 * Math.sin(-1 * theta);

  const dir1 = new THREE.Vector3(newX, newY, newZ);

  const dir = new THREE.Vector3();
  dir.subVectors(dir1, dir0);

  return dir.normalize();
};

export const createVector = (dir0, length, alfaHorizontal, alfaVertical) => {
  const newPos = new Vector3();
  const dir1 = createDirectionVector(dir0, alfaHorizontal, alfaVertical);
  newPos.addVectors(dir0, dir1.multiplyScalar(length));
  return newPos;
};
