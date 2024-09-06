import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

import { createVector } from "../utils";

export class Camera {
  init(innerWidth, innerHeight, perspectiveCamera, position, azimuth, theta) {
    this.azimuthInternal = 0;
    this.camera = new THREE.PerspectiveCamera(
      perspectiveCamera,
      innerWidth / innerHeight,
      1,
      6100
    );
    this.camera.aspect = innerWidth / innerHeight;

    this.set({ position, azimuth });

    window.addEventListener(
      "MozOrientation",
      this.handleOrientationEvent.bind(this)
    );
    window.addEventListener(
      "deviceorientation",
      this.handleOrientationEvent.bind(this)
    );
  }

  set({ position, azimuth }) {
    this.position = position;
    this.azimuth = azimuth;
  }

  update() {
    const dir0 = new Vector3(this.position.x, this.position.y, this.position.z);
    const dir1 = createVector(
      dir0,
      100,
      this.azimuth + this.azimuthInternal,
      this.theta
    );

    this.camera.position.set(this.position.x, this.position.y, this.position.z);
    this.camera.lookAt(dir1.x, dir1.y, dir1.z);
  }

  getInstance() {
    return this.camera;
  }

  handleOrientationEvent(event) {
    const absolute = event.absolute;
    let alpha = event.alpha;
    const beta = event.beta;
    let gamma = event.gamma; // vertical
    if (gamma > 0 && gamma < 45) gamma = 0;
    if (gamma > 0 && gamma > 45) gamma = -90;
    this.theta = degToRad(-1 * gamma - 90);

    // 90 - 0, 360 - 270
    if (alpha > 90 && alpha < 180) alpha = 90;
    if (alpha <= 90) alpha = -1 * alpha;

    if (alpha < 270 && alpha > 180) alpha = 270;
    if (alpha >= 270) alpha = 360 - alpha;
    this.azimuthInternal = degToRad(-1 * alpha);

    document.getElementById("info").innerHTML = gamma;
    // infoEl.innerHTML = 'x' + absolute + ' ' + alpha  + ' ' + beta  + ' ' + gamma
    // infoEl.innerHTML = 'x' + ' ' + (-1 * gamma) + ' ' + radToDeg(alfaHeadY)

    // if (gamma > -60) gamma = -60 // look down
    // if (gamma < -89) gamma = -89 // look forward

    // alfaHeadY = degToRad(gamma - 60)
    // if (alfaHeadY > MAX_VERTICAL_ANGEL) alfaHeadY = MAX_VERTICAL_ANGEL
  }
}
