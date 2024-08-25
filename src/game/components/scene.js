import * as THREE from "three";

export class Scene {
  init() {
    this.scene = new THREE.Scene();
  }

  getInstance() {
    return this.scene;
  }

  add(item) {
    this.scene.add(item);
  }
}
