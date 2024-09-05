import * as THREE from "three";

export class Renderer {
  init(innerWidth, innerHeight, scene, camera) {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.scene = scene;
    this.camera = camera;
    this.stereo = new THREE.StereoCamera();
  }

  setIsStereo(flg) {
    this.isStereo = flg;
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

      this.camera.updateWorldMatrix();
      this.stereo.update(this.camera);

      const size = new THREE.Vector2();
      this.renderer.getSize(size);

      if (this.isStereo) {
        this.renderer.setScissorTest(true);

        this.renderer.setScissor(0, 0, size.width / 2, size.height);
        this.renderer.setViewport(0, 0, size.width / 2, size.height);
        this.renderer.render(this.scene, this.stereo.cameraL);

        this.renderer.setScissor(
          size.width / 2,
          0,
          size.width / 2,
          size.height
        );
        this.renderer.setViewport(
          size.width / 2,
          0,
          size.width / 2,
          size.height
        );
        this.renderer.render(this.scene, this.stereo.cameraR);

        this.renderer.setScissorTest(false);
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    });
  }

  destroy() {
    document.body.removeChild(this.renderer.domElement);
  }
}
