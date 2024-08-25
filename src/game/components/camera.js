import * as THREE from "three";

export class Camera {
  init(innerWidth, innerHeight, perspectiveCamera, position) {
    this.camera = new THREE.PerspectiveCamera(
      perspectiveCamera,
      innerWidth / innerHeight,
      1,
      6100
    );
    this.camera.position.set(position.x, position.y, position.z);

    this.camera.aspect = innerWidth / innerHeight;
  }

  getInstance() {
    return this.camera;
  }
}
