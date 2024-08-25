import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Controls {
  init(camera, domElement) {
    this.controls = new OrbitControls(camera, domElement);
    this.controls.enablePan = false;
    // controls.target.set(0, 0, 0);
    // controls.minPolarAngle = MathUtils.degToRad(60);
    // controls.maxPolarAngle = MathUtils.degToRad(60);
    this.controls.minDistance = 0.01;
    this.controls.maxDistance = 3000;
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  getInstance() {
    return this.controls;
  }

  update() {
    this.controls.update();
  }
}
