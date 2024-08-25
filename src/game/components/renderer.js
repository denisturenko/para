import * as THREE from "three";

export class Renderer {
  init(innerWidth, innerHeight, scene, camera) {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = scene;
    this.camera = camera;
  }

  getInstance() {
    return this.renderer;
  }

  getDomElement() {
    return this.renderer.domElement;
  }

  animate(cb) {
    this.renderer.setAnimationLoop(() => {
      const clock = new THREE.Clock();
      const delta = clock.getDelta();
      cb(delta);
      this.renderer.render(this.scene, this.camera);
    });
  }

  destroy() {
    document.body.removeChild(this.renderer.domElement);
  }
}
