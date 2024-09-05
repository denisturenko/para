import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import * as dat from "dat.gui";
import * as Stats from "stats.js";
import * as _ from "lodash";
import * as deviceDetect from "react-device-detect";
import { Game } from "./game/game";
import { Player } from "./game/components/player";

const {
  Vector3,
  MathUtils,
  ArrowHelper,
  Ray,
  TextureLoader,
  Scene,
  AxesHelper,
  PerspectiveCamera,
  WebGLRenderer,
  DirectionalLight,
  MeshLambertMaterial,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} = THREE;
const { degToRad, radToDeg } = MathUtils;
const { PI } = Math;

const game = new Game();
const start = () => {
  const player = new Player();
  player.init({ x: -300, y: H, z: -140 }, degToRad(0), degToRad(-90 + 45));
  game.init(
    window.innerWidth,
    window.innerHeight,
    45,
    { x: 0, y: 10000, z: 0 },
    player
  );
};
start();

/*setTimeout(() => {
  game.restart();
  start();
}, 2000);*/

/*

const perspectiveCamera = 60;

// const gui = new dat.GUI()
// gui.hide();
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)

const loader = new TextureLoader();
const texture = loader.load("./bg2.jpg");

const layoutW = 3500;
const layoutH = 3500;
const target = { x: -270, y: 0, z: -447 };
// const target = { x: -240, y: 0, z: -260}
const target2 = { x: 110, y: 0, z: -340 };
const arrow0 = { x: -180, y: 0, z: -160 };
// const cameraO = { x: target2.x + 450, y: H, z: target2.z - 100}
// const cameraO = { x: target2.x, y: H, z: target2.z}
// const cameraO = { x: 0, y: H, z: 0}
// const cameraO = { x: target.x-50, y: H, z: target.z}
// const player0 = { x: target2.x, y: H, z: target2.z}
// const player0 = { x: -500, y: H, z: -340}
const cameraO = player0;

let scene = new Scene();
// scene.fog = new THREE.Fog(0xcccccc, 10, 2000);

var axesHelper = new AxesHelper(500);
scene.add(axesHelper);

let camera = new PerspectiveCamera(
  perspectiveCamera,
  innerWidth / innerHeight,
  1,
  6100
);
camera.position.set(cameraO.x, cameraO.y, cameraO.z);

camera.aspect = window.innerWidth / window.innerHeight;

let renderer = new WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", (event) => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

let controls;
// if (isOrbital) {
controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
// controls.target.set(0, 0, 0);
// controls.minPolarAngle = MathUtils.degToRad(60);
// controls.maxPolarAngle = MathUtils.degToRad(60);
controls.minDistance = 0.01;
controls.maxDistance = 3000;
controls.enableDamping = true;
controls.enableZoom = true;
// }

let light = new DirectionalLight(0xffffff, 5);
light.castShadow = true;
light.position.set(target.x, 10000, target.z);
scene.add(light);

const boxMaterial = new MeshLambertMaterial({ color: "white" });

const box2 = new Mesh(
  new BoxGeometry(10, 10, 10).translate(target2.x, target2.y, target2.z),
  boxMaterial
);
scene.add(box2);

const player = new Mesh(new BoxGeometry(0.5, 2, 0.5), boxMaterial);
player.position.x = player0.x;
player.position.y = player0.y;
player.position.z = player0.z;
scene.add(player);

const material = new MeshStandardMaterial({
  color: "silver",
  map: texture,
});

let ground = new Mesh(
  new PlaneGeometry(layoutW, layoutH).rotateX((-1 * Math.PI) / 2),
  material
);
scene.add(ground);

renderer.setAnimationLoop(() => {
  // camControls.update(delta);
  controls.update();
  renderer.render(scene, camera);
  stats.update();
});
*/
