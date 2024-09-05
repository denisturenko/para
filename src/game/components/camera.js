import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
import { createVector } from "../utils";

export class Camera {
  init(innerWidth, innerHeight, perspectiveCamera, position, azimuth, theta) {
    this.camera = new THREE.PerspectiveCamera(
      perspectiveCamera,
      innerWidth / innerHeight,
      1,
      6100
    );
    this.camera.aspect = innerWidth / innerHeight;

    this.set({ position, azimuth, theta });
  }

  set({ position, azimuth, theta }) {
    this.position = position;
    this.azimuth = azimuth;
    this.theta = theta;
  }

  update() {
    const dir0 = new Vector3(this.position.x, this.position.y, this.position.z);
    const dir1 = createVector(dir0, 100, this.azimuth, this.theta);

    this.camera.position.set(this.position.x, this.position.y, this.position.z);
    this.camera.lookAt(dir1.x, dir1.y, dir1.z);
  }

  getInstance() {
    return this.camera;
  }
}
