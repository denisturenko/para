import { Scene } from "./components/scene";
import { Renderer } from "./components/renderer";
import { Ground } from "./components/ground";
import { Camera } from "./components/camera";
import { Controls } from "./components/controls";
import { Light } from "./components/light";

export class Game {
  init(
    innerWidth,
    innerHeight,
    perspectiveCamera,
    positionCamera,
    positionLight
  ) {
    this.scene = new Scene();
    this.scene.init();

    this.camera = new Camera();
    this.camera.init(
      innerWidth,
      innerHeight,
      perspectiveCamera,
      positionCamera
    );

    this.renderer = new Renderer();
    this.renderer.init(
      innerWidth,
      innerHeight,
      this.scene.getInstance(),
      this.camera.getInstance()
    );

    this.controls = new Controls();
    this.controls.init(
      this.camera.getInstance(),
      this.renderer.getDomElement()
    );

    this.light = new Light();
    this.light.init(positionLight);
    this.scene.add(this.light.getInstance());

    this.ground = new Ground();
    const layoutW = 3500;
    const layoutH = 3500;
    this.ground.init("./bg2.jpg", layoutW, layoutH);
    this.scene.add(this.ground.getInstance());

    this.renderer.animate((ts) => {
      this.controls.update();
    });
  }

  restart() {
    this.renderer.destroy();
  }
}
