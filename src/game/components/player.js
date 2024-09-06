import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

export class Player {
  init(position, azimuth) {
    this.set(position, azimuth);
  }

  set(position, azimuth) {
    this.position = position;
    this.azimuth = azimuth;
  }

  get() {
    return {
      position: this.position,
      azimuth: this.azimuth,
    };
  }
}
