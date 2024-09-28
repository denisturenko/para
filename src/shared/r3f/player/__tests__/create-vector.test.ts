import * as THREE from 'three';
import { createVector } from '../player.utils';

describe('createVector', () => {
  it('should calculate vector for distance 100 and angel Pi', () => {
    const targetPosition = new THREE.Vector3(100, 0, 200);

    expect(createVector(targetPosition, 100, Math.PI, 0)).toEqual({ x: 100, y: 0, z: 300 });
  });
});
