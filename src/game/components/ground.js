import * as THREE from "three";

export class Ground {
  init(textureUrl, layoutW, layoutH) {
    const loader = new THREE.TextureLoader();

    const texture = loader.load(textureUrl);

    const material = new THREE.MeshStandardMaterial({
      color: "silver",
      map: texture,
    });

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(layoutW, layoutH).rotateX((-1 * Math.PI) / 2),
      material
    );
  }

  getInstance() {
    return this.ground;
  }
}
