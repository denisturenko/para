import * as THREE from "three";

export class Light {
  init(position) {
    this.light = new THREE.DirectionalLight(0xffffff, 5);
    this.light.castShadow = true;
    this.light.position.set(position.x, position.y, position.z);
  }

  getInstance() {
    return this.light;
  }
}
