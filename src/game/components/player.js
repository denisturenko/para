import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

export class Player {
  init(position, azimuth, theta) {
    this.set(position, azimuth, theta);
    window.addEventListener(
      "MozOrientation",
      this.handleOrientationEvent.bind(this)
    );
    window.addEventListener(
      "deviceorientation",
      this.handleOrientationEvent.bind(this)
    );
  }

  set(position, azimuth, theta) {
    this.position = position;
    this.azimuth = azimuth;
    this.theta = theta;
  }

  get() {
    return {
      position: this.position,
      azimuth: this.azimuth,
      theta: this.theta,
    };
  }

  handleOrientationEvent(event) {
    const absolute = event.absolute;
    const alpha = event.alpha;
    const beta = event.beta;
    let gamma = event.gamma; // vertical
    if ((gamma > 0) & (gamma < 45)) gamma = 0;
    if ((gamma > 0) & (gamma > 45)) gamma = -90;

    // console.log("***", gamma);

    this.theta = degToRad(-1 * gamma - 90);
    // document.getElementById("info").innerHTML = this.theta;
    // infoEl.innerHTML = 'x' + absolute + ' ' + alpha  + ' ' + beta  + ' ' + gamma
    // infoEl.innerHTML = 'x' + ' ' + (-1 * gamma) + ' ' + radToDeg(alfaHeadY)

    // if (gamma > -60) gamma = -60 // look down
    // if (gamma < -89) gamma = -89 // look forward

    // alfaHeadY = degToRad(gamma - 60)
    // if (alfaHeadY > MAX_VERTICAL_ANGEL) alfaHeadY = MAX_VERTICAL_ANGEL
  }
}
