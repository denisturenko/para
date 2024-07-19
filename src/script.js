// https://discourse.threejs.org/t/how-to-create-ground-and-sky-with-gradient-color-and-extend-indefinitely/48563/3

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import * as dat from 'dat.gui'
import * as Stats from 'stats.js'
import * as _ from 'lodash';
import * as deviceDetect from 'react-device-detect';

const { Vector3, MathUtils, ArrowHelper, Ray } = THREE
const { degToRad, radToDeg } = MathUtils;
const { PI } = Math;




const isMobileAndTable = deviceDetect.isMobile;


const MAX_SPEED = 12;
const MIN_SPEED = 3;
let MAX_VERTICAL_ANGEL = degToRad(-30);
const MIDDLE_VERTICAL_ANGEL = degToRad(-50);
const MIN_VERTICAL_ANGEL = degToRad(-70);
const DEFAULT_HORIZONTAL_ANGEL = degToRad(0);

const NORMAL_ALFA_PER_SEC = degToRad(0.2)


let speed = MAX_SPEED
const speedY = 6
const perspectiveCamera = 60;
const traversCoefficient = -1;
let alfa = degToRad(-90);
// let alfa = degToRad(_.random(0, 360));
let alfaHeadY = MIN_VERTICAL_ANGEL;// MIDDLE_VERTICAL_ANGEL;
let alfaHeadH = DEFAULT_HORIZONTAL_ANGEL;

// const windAngel = alfa;//degToRad(_.random(0, 360));
const windAngel = degToRad(windAngelDeg);
// const windAngel = degToRad(_.random(0, 360));
const wind = _.random(0, 10)
// const windSpeeds = [2, 6];


let leftControlValue = 0;
let rightControlValue = 0;

// const gui = new dat.GUI()
// gui.hide();
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild(stats.dom)

const loader = new THREE.TextureLoader();
const texture = loader.load('./bg2.jpg');
const textureGrass = loader.load('./img.png');

// *****************************
let fly = true;
let isOrbital = false;
// let showTargetGrid = false;
let isPause = false;


const layoutW = 3500;
const layoutH = 3500;
const target = { x: -270, y: 0, z: -447}
// const target = { x: -240, y: 0, z: -260}
const target2 = { x: 110, y: 0, z: -340}
const arrow0 = { x: -180, y: 0, z: -160}
// const cameraO = { x: target2.x + 450, y: H, z: target2.z - 100}
// const cameraO = { x: target2.x, y: H, z: target2.z}
// const cameraO = { x: 0, y: H, z: 0}
// const cameraO = { x: target.x-50, y: H, z: target.z}
// const player0 = { x: target2.x, y: H, z: target2.z}
const player0 = { x: -500, y: H, z: target2.z}
const cameraO = player0


//https://jsfiddle.net/prisoner849/n1emstwd/
let simpleNoise = `
    float N (vec2 st) { // https://thebookofshaders.com/10/
        return fract( sin( dot( st.xy, vec2(12.9898,78.233 ) ) ) *  43758.5453123);
    }
    
    float smoothNoise( vec2 ip ){ // https://www.youtube.com/watch?v=zXsWftRdsvU
    	vec2 lv = fract( ip );
      vec2 id = floor( ip );
      
      lv = lv * lv * ( 3. - 2. * lv );
      
      float bl = N( id );
      float br = N( id + vec2( 1, 0 ));
      float b = mix( bl, br, lv.x );
      
      float tl = N( id + vec2( 0, 1 ));
      float tr = N( id + vec2( 1, 1 ));
      float t = mix( tl, tr, lv.x );
      
      return mix( b, t, lv.y );
    }
  `;

const vertexShader = `
  varying vec2 vUv;
  uniform float time;
  
  ${simpleNoise}
  
	void main() {

    vUv = uv;
    float t = time * 2.;
    
    // VERTEX POSITION
    
    vec4 mvPosition = vec4( position, 1.0 );
    #ifdef USE_INSTANCING
    	mvPosition = instanceMatrix * mvPosition;
    #endif
    
    // DISPLACEMENT
    
    float noise = smoothNoise(mvPosition.xz * 0.5 + vec2(0., t));
    noise = pow(noise * 0.5 + 0.5, 2.) * 2.;
    
    // here the displacement is made stronger on the blades tips.
    float dispPower = 1. - cos( uv.y * 3.1416 * 0.5 );
    
    float displacement = noise * ( 0.3 * dispPower );
    mvPosition.z -= displacement;
    
    //
    
    vec4 modelViewPosition = modelViewMatrix * mvPosition;
    gl_Position = projectionMatrix * modelViewPosition;

	}
`;

const fragmentShader = `
  varying vec2 vUv;
  
  void main() {
  	vec3 baseColor = vec3( 0.36 , 0.43, 0.38 );
    float clarity = ( vUv.y * 0.875 ) + 0.125;
    gl_FragColor = vec4( baseColor * clarity, 1 );
  }
`;




const realS = 400;
const fakeS = Math.sqrt(Math.pow(target.x - target2.x, 2) + Math.pow(target.z - target2.z, 2))
const multi = realS/fakeS;

console.log(`***${realS}m=${fakeS}`)

const clock = new THREE.Clock();

let scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 10, 2000 );


var axesHelper = new THREE.AxesHelper( 500 );
scene.add( axesHelper );

const center = new Vector3( 0, 0, 0 );
// scene.add(new ArrowHelper( new Vector3( 1, 0, 0), center, 600,  0xfff00 ));
// scene.add(new ArrowHelper( new Vector3( 0, 0, 1), center, 600,  0xfff00 ));

const createDirectionVector = (dir0, alfaHorizontal, alfaVertical) => {
    const newX = dir0.x - (1 * Math.cos(-1 * alfaVertical) * Math.sin(alfaHorizontal));
    const newZ = dir0.z - (1 * Math.cos(-1 * alfaVertical) * Math.cos(alfaHorizontal));
    const newY = dir0.y - (1 * Math.sin(-1 * alfaVertical));

    const dir1 = new THREE.Vector3(newX, newY, newZ);

    const dir = new THREE.Vector3();
    dir.subVectors(dir1, dir0);

    return dir.normalize();
}

const createVector = (dir0, length, alfaHorizontal, alfaVertical) => {
    const newPos = new Vector3();
    const dir1 = createDirectionVector(dir0, alfaHorizontal, alfaVertical)
    newPos.addVectors( dir0, dir1.multiplyScalar( length ) );
    return newPos
}

const createVector2 = (dir0, length, alfaHorizontal, alfaVertical) => {
    const dir1 = new THREE.Vector3(
     dir0.x - length * Math.sin(alfaHorizontal),
     dir0.y,
     dir0.z - length * Math.cos(alfaHorizontal)
    );
    return dir1;
}



// TEST
const origin = new THREE.Vector3( 0, 0, 0 );

const dir = new Vector3( -1, 0, 0);
// dir.applyAxisAngle(new Vector3(0, 0, -1), PI/180 * 45)
// dir.applyAxisAngle(new Vector3(0, 1, 0), PI/180 * 90)
// dir.add(new Vector3(0, 0, 100))
dir.normalize();
// scene.add(new THREE.ArrowHelper( dir, origin, 100,  0xffff00 ));

// DIR0

let alfa0Horiz = degToRad(120);
let alfa0Vert = degToRad(0);
const dir0 = new Vector3( 50, 150, 50);

const dir1 = createDirectionVector(dir0, alfa0Horiz,  alfa0Vert ).normalize();
const arrow1 = new ArrowHelper( dir1, dir0, 100,  0xffff00 )
scene.add(arrow1);

const dir2 = createDirectionVector(dir0, alfa0Horiz,  degToRad(-45) ).normalize();
const arrow2 = new ArrowHelper( dir2, dir0, 100,  0xffff00 )
scene.add(arrow2);

const dir3 = createDirectionVector(dir0, alfa0Horiz,  degToRad(-90) ).normalize();
const arrow3 = new ArrowHelper( dir3, dir0, 100,  0xffff00 )
scene.add(arrow3);




// const newPos  = dir0.addScaledVector( dir1, 100 )

// const newPos = dir0.clone().addScaledVector( dir1.clone().normalize(), 100 );


const newPos = createVector(dir0, 100, alfa0Horiz,  alfa0Vert )
console.log('***',newPos)
// const newPos = arrow1.cone.position;//matrixWorld.elements[0] || {}
const box =new THREE.Mesh(
 new THREE.BoxGeometry(10, 10, 10).translate(newPos.x, newPos.y, newPos.z),
 new THREE.MeshLambertMaterial({color: "gold"}))
scene.add(box);







/*const dir2 = new THREE.Vector3( 0, 200, 0 );
dir2.applyAxisAngle(new THREE.Vector3( 0, 0, 1 ), Math.PI/4)
dir2.normalize();
scene.add(new THREE.ArrowHelper( dir2, origin, 100,  0xffff00 ));*/


// const dir2 = new THREE.Vector3( 100, 200, 100 );
// dir2.normalize();
// scene.add(new THREE.ArrowHelper( dir2, origin, 100,  0xffff00 ));


let camera = new THREE.PerspectiveCamera(perspectiveCamera, innerWidth / innerHeight, 1, 6100);
camera.position.set(cameraO.x, cameraO.y, cameraO.z)
// camera.position.set(60, 34, -40)
// camera.position.set(-10, 400, -40)
// camera.lookAt(target.x, target.y, target.z);
// camera.lookAt(cameraO.x, 0, cameraO.z);
// camera.rotateZ(Math.PI/180 * 75)
// camera.rotateX(Math.PI/180 * 45)
// camera.rotateZ(PI/180 * 190)
// camera.rotateOnWorldAxis(new Vector3(0, 0, 1), PI/180 * 40)


camera.aspect = window.innerWidth / window.innerHeight;
// camera.updateProjectionMatrix();

// gui.add(camera.position, 'x').min(-500).max(500).step(1)
// gui.add(camera.position, 'y').min(1).max(1100).step(0.5)
// gui.add(camera.position, 'z').min(-500).max(500).step(1)


let renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
window.addEventListener("resize", event => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
})

let controls;
// if (isOrbital) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
// controls.target.set(0, 0, 0);
// controls.minPolarAngle = THREE.MathUtils.degToRad(60);
// controls.maxPolarAngle = THREE.MathUtils.degToRad(60);
    controls.minDistance = 0.01;
    controls.maxDistance = 3000;
    controls.enableDamping = true;
    controls.enableZoom = true;
// }


/*const camControls = new FirstPersonControls(camera, renderer.domElement);
camControls.lookSpeed = 0.4;
camControls.movementSpeed = 20;
camControls.noFly = true;
camControls.lookVertical = true;
camControls.constrainVertical = true;
camControls.verticalMin = 1.0;
camControls.verticalMax = 2.0;
camControls.lon = -150;
camControls.lat = 120;*/


let light = new THREE.DirectionalLight(0xffffff, 5);
light.castShadow = true;
light.position.set(target.x, 10000, target.z);
scene.add(light);

const boxMaterial = new THREE.MeshLambertMaterial({color: "white"})
// scene.add(new THREE.Mesh(new THREE.BoxGeometry(2, 0.3, 2).translate(target.x, target.y, target.z),boxMaterial));


const arrowTargetStart = new Vector3(target.x, target.y, target.z);
const arrowTarget = new ArrowHelper(
 createDirectionVector(arrowTargetStart, windAngel,  0 ).normalize(),
 arrowTargetStart,
 200,
 0xcccccc,
 1
)
arrowTarget.line.visible = showTargetGrid;
arrowTarget.cone.visible = showTargetGrid;
scene.add(arrowTarget);


const arrowTraversStart = new Vector3(target.x, target.y, target.z);
const arrowTravers = new ArrowHelper(
 createDirectionVector(arrowTraversStart, windAngel + traversCoefficient * PI/2,  0 ).normalize(),
 arrowTraversStart,
 200,
 0xcccccc,
 1
)
arrowTravers.line.visible = showTargetGrid;
arrowTravers.cone.visible = showTargetGrid;
scene.add(arrowTravers);

const arrowTraversStart2 = new Vector3(target.x, target.y, target.z);
const arrowTravers2 = new ArrowHelper(
 createDirectionVector(arrowTraversStart2, windAngel - traversCoefficient * PI/2,  0 ).normalize(),
 arrowTraversStart2,
 200,
 0xcccccc,
 1
)
arrowTravers2.line.visible = showTargetGrid;
arrowTravers2.cone.visible = showTargetGrid;
scene.add(arrowTravers2);



const box2 =new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10).translate(target2.x, target2.y, target2.z),boxMaterial)
// box2.geometry.center();
scene.add(box2);


const player =new THREE.Mesh(new THREE.BoxGeometry(0.5, 2, 0.5),boxMaterial)
player.position.x = player0.x
player.position.y = player0.y
player.position.z = player0.z
scene.add(player);

const parachuteBody  =new THREE.Mesh(
 new THREE.BoxGeometry(0.6, 0.1, 0.01).rotateY(Math.PI),
 new THREE.MeshLambertMaterial({color: "#72777d"}))
parachuteBody.position.x = player0.x
parachuteBody.position.y = player0.y
parachuteBody.position.z = player0.z
scene.add(parachuteBody);



const arrowStart = new Vector3(arrow0.x, arrow0.y, arrow0.z);
const arrow = new ArrowHelper(
 createDirectionVector(arrowStart, windAngel - PI,  0 ).normalize(),
 arrowStart,
 30,
 0xfd903d,
 40
)
scene.add(arrow);


const material = new THREE.MeshStandardMaterial({
    color: 'silver',
    map: texture
})

let ground = new THREE.Mesh(
 new THREE.PlaneGeometry(layoutW, layoutH).rotateX(-1 * Math.PI/2),
 // new THREE.MeshBasicMaterial({color: new THREE.Color(0x442288).multiplyScalar(1.5)})
 material
);
scene.add(ground);


const uniforms = {
    time: {
        value: 0
    }
}

const leavesMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: THREE.DoubleSide
});


// grass
const instanceNumber = 5;
const dummy = new THREE.Object3D();

const geometry = new THREE.PlaneGeometry( 0.1, 0.1, 10, 10 );
geometry.translate( 0, 0.5, 0 ); // move grass blade geometry lowest point at 0.

const instancedMesh = new THREE.InstancedMesh( geometry, leavesMaterial, instanceNumber );

scene.add( instancedMesh );

// Position and scale the grass blade instances randomly.

for ( let i=0 ; i<instanceNumber ; i++ ) {

    dummy.position.set(
     ( Math.random() - 0.5 ) * 100 + target.x,
     0,
     ( Math.random() - 0.5 ) * 100 + target.z
    );

    dummy.scale.setScalar( 0.5 + Math.random() * 0.5 );

    dummy.rotation.y = Math.random() * Math.PI;

    dummy.updateMatrix();
    instancedMesh.setMatrixAt( i, dummy.matrix );

}


const material2 = new THREE.MeshStandardMaterial({
    color: 'gray',
    // emissive: 'black',
    map: textureGrass
})
// textureGrass.wrapS = THREE.RepeatWrapping;
// textureGrass.wrapT = THREE.RepeatWrapping;
// textureGrass.repeat.set( 10, 10 );
let ground2 = new THREE.Mesh(
 new THREE.PlaneGeometry(100, 100 ).rotateX(-1 * Math.PI/2).rotateY(Math.PI/180*210),
 // new THREE.MeshBasicMaterial({color: new THREE.Color(0x442288).multiplyScalar(1.5)})
 material2
);
ground2.position.set(target.x, 0.04, target.z)
// ground2.visible = false;
// scene.add(ground2)



let lastCallTimestamp = 0;
let lastResult = 0;

function modifyParamWithinRange(from, to) {
    const now = Date.now();
    if (lastResult && now - lastCallTimestamp < 1000) {
        return lastResult
    }
    lastCallTimestamp = now;
    lastResult = from + Math.floor(Math.random() * (to - 1));
    return lastResult
}

function blinking(el, cnt) {
    let tmp = 0;
    let timer = setInterval(function() {
        if (tmp % 2 === 0) {
            el.classList.add('altHighlighted')
        } else {
            el.classList.remove('altHighlighted')
        }
        tmp++;
        if (tmp === cnt * 2) {
            clearInterval(timer);
        }
    }, 500);
}

let count = 1;
function onceCall(height, callback) {
    if (height < 300 && count === 1) {
        callback(count++);
    }
    if (height < 200 && count === 2) {
        callback(count++);
    }
    if (height < 100 && count === 3) {
        callback(count++);
    }
}


const altEl = document.getElementById('alt')
const speedEl = document.getElementById('speed');
const windEl = document.getElementById('wind');

renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    if(isMobileAndTable) {
        defineAlfa(delta);
        defineSpeed(delta);
    }

    // leavesMaterial.uniforms.time.value = clock.getElapsedTime();
    // leavesMaterial.uniformsNeedUpdate = true;

    // const windSpeed = _.random(windSpeeds[0], windSpeeds[1], 0.3);
    const windSpeed = modifyParamWithinRange(windSpeeds[0], windSpeeds[1]);

    if (fly) {

        // fly = false



        if (!isPause && player.position.y > 2) {
            player.position.x -= speed * delta * Math.sin(alfa) + windSpeed * delta * Math.sin(windAngel) ;
            player.position.z -= speed * delta * Math.cos(alfa) + windSpeed * delta * Math.cos(windAngel) ;
            player.position.y -= speedY * delta;
        }

        if (player.position.y < 2) {
            MAX_VERTICAL_ANGEL = 0
        }


        // camera.lookAt(player.position.x, player.position.y, player.position.z)

        /*camera.position.x -= speed * delta * Math.sin(alfa);
        camera.position.z -= speed * delta * Math.cos(alfa);
        camera.position.y -= speedY * delta;*/




       /* const dir = new THREE.Vector3(); // create once an reuse it
        dir.subVectors( new THREE.Vector3(old.x, old.y, old.z), new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z) );
        const nextDir = dir.multiplyScalar(10)
        // console.log('***',dir, dir.multiplyScalar(2))*/

       /* const dir = new THREE.Vector3(camera.position.x,// + Math.sin(alfa),
         camera.position.y,
         camera.position.z)// - Math.cos(alfa))*/

        const dir0 = new Vector3( player.position.x,  player.position.y,  player.position.z)
        const forward = createVector(dir0, 100, alfa, 0)
        const dir1 = createVector(dir0, 100, alfa + alfaHeadH, alfaHeadY)

        // const dirArrow = createDirectionVector(dir0, alfa,  alfaY );
        // const arrow1 = new ArrowHelper( dirArrow, dir0, 100,  0xffff00 )
        // scene.add(arrow1)

        // dir1.project(camera)

        parachuteBody.position.x = player.position.x
        parachuteBody.position.y = player.position.y - 2
        parachuteBody.position.z = player.position.z
        parachuteBody.lookAt(forward.x, forward.y, forward.z)

        // console.log('***', dir0)
        // dir.multiplyScalar(1)

        // dir.applyAxisAngle(new THREE.Vector3(0,1,0), Math.PI/2)
        // dir.applyAxisAngle(new THREE.Vector3(1,0,0), alfa)

        if (!isOrbital) {
            camera.position.set(player.position.x,  player.position.y,  player.position.z);
            camera.lookAt(dir1.x, dir1.y, dir1.z)
        } else {
            controls.target.set(player.position.x,  player.position.y - 2,  player.position.z);
        }


        // player.position.x = dir.x ;
        // player.position.y = dir.y;
        // player.position.z = dir.z;

        // camera.position.x += 100;

        // camera.lookAt( box3.position.x,  box3.position.y,  box3.position.z)
        // camera.lookAt(0, 0, 0)


        // console.log('***', dir.x - camera.position.x, dir.y - camera.position.y, dir.z - camera.position.z)

        // console.log('***', Math.floor(THREE.MathUtils.radToDeg(alfa)),
        //  Math.floor(THREE.MathUtils.radToDeg(alfaHeadY)),
        //  (camera.position.x* multi).toFixed(2), (camera.position.y* multi).toFixed(2))

    }



    // camControls.update(delta);
    isOrbital && controls.update();
    renderer.render(scene, camera);
    stats.update()

    altEl.innerHTML = player.position.y.toFixed(0);
    onceCall(Number(player.position.y), (count) => {
        blinking(altEl, 4 - count)
    })

    speedEl.innerHTML = speed.toFixed(2);
    windEl.innerHTML = windSpeed.toFixed(2);

})

const changeView = () => {
    alfaHeadH = degToRad(DEFAULT_HORIZONTAL_ANGEL);
    if (alfaHeadY === MIN_VERTICAL_ANGEL)
        alfaHeadY = MIDDLE_VERTICAL_ANGEL;
    else if(alfaHeadY === MIDDLE_VERTICAL_ANGEL)
        alfaHeadY = MAX_VERTICAL_ANGEL;
    else
        alfaHeadY = MIN_VERTICAL_ANGEL;
}

let keyCode;

document.addEventListener('keydown', function(event) {
    const delta = clock.getDelta();
    // console.log('***', event.keyCode)


    switch (event.keyCode) {
        // case 18: // ALT
        //     alfaHeadH = degToRad(DEFAULT_HORIZONTAL_ANGEL);
        //     if (alfaHeadY !== MIDDLE_VERTICAL_ANGEL)
        //         alfaHeadY = MIDDLE_VERTICAL_ANGEL;
        //     else
        //         alfaHeadY = MAX_VERTICAL_ANGEL;
        //     break;
        case 32: // SPACE
            changeView();
            break;
        case 37: // LEFT
            alfa += THREE.MathUtils.degToRad(0.5);
            break;
        case 39: // RIGHT
            alfa -= THREE.MathUtils.degToRad(0.5);
            break;
        case 38: // UP
            speed += 1;
            if (speed > MAX_SPEED) {
                speed = MAX_SPEED
            }
            //alfaHeadY += degToRad(5);
            break;
        case 40: // DOWN
            speed -= 1;
            if (speed < MIN_SPEED) {
                speed = MIN_SPEED
            }
            // alfaHeadY -= degToRad(5);
            // if (alfaHeadY < degToRad(-89)) {
            //     alfaHeadY = degToRad(-89);
            // }
            break;
        case 90: // Z
            alfaHeadY = MAX_VERTICAL_ANGEL;
            if (!alfaHeadH)
                alfaHeadH = degToRad(90);
            else
                alfaHeadH = degToRad(DEFAULT_HORIZONTAL_ANGEL);
            break;
        case 88: // X
            alfaHeadY = MAX_VERTICAL_ANGEL;
            if (!alfaHeadH)
                alfaHeadH = degToRad(-90);
            else
                alfaHeadH = degToRad(DEFAULT_HORIZONTAL_ANGEL);
            break;
        case 87: // W
            break;
        case 65: // A
            break;
        case 83: // S
            break;
        case 68: // D
            break;
        case 80: // P
            isPause = !isPause
            break;
        case 79: // 0
            isOrbital = !isOrbital
            break;
        case 72: // H
            arrowTarget.line.visible = !arrowTarget.line.visible;
            arrowTarget.cone.visible = !arrowTarget.cone.visible;

            arrowTravers.line.visible = !arrowTravers.line.visible;
            arrowTravers.cone.visible = !arrowTravers.cone.visible;

            arrowTravers2.line.visible = !arrowTravers2.line.visible;
            arrowTravers2.cone.visible = !arrowTravers2.cone.visible;
            break;
    }
});

document.body.addEventListener('touchmove', function(event) {
    event.stopPropagation();
    event.preventDefault();
});

const calculateTouching = (el, el2, event) => {
    const height = el.offsetHeight/* - el.offsetTop*/;
    const currentTouch = [...event.changedTouches].find(item => {
        return item.target === el || item.target === el2;
    })
    let tmp =  Math.floor(currentTouch.pageY) /*- el.offsetTop*/;
    if (tmp < 0 ) tmp = 0;
    if (tmp > height ) tmp = height;

    return ((tmp / height) * 100).toFixed(0);
}


const defineAlfa = (delta) => {
    const res = leftControlValue - rightControlValue;
    alfa +=delta * NORMAL_ALFA_PER_SEC * res;
}


const defineSpeed = () => {
    // let val = Number(leftControlValue) < Number(rightControlValue)? leftControlValue :rightControlValue
    let val = Number(leftControlValue) + Number(rightControlValue) / 2
    const percent = 100 - val;
    speed = (percent / 100) * (MAX_SPEED - MIN_SPEED) + MIN_SPEED;
}

const leftControlEl = document.getElementById('leftControl');
const leftLevelEl = document.getElementById('leftLevel');

leftControlEl.addEventListener('touchmove', function(event) {
    leftControlValue = calculateTouching(leftControlEl, leftLevelEl, event);

    leftLevelEl.style.height = leftControlValue + '%';
    leftLevelEl.innerHTML = leftControlValue;


    event.stopPropagation();
    event.preventDefault();
});

const rightControlEl = document.getElementById('rightControl');
const rightLevelEl = document.getElementById('rightLevel');


rightControlEl.addEventListener('touchmove', function(event) {
    rightControlValue = calculateTouching(rightControlEl, rightLevelEl, event);

    rightLevelEl.style.height = rightControlValue + '%';
    rightLevelEl.innerHTML = rightControlValue;
    event.stopPropagation();
    event.preventDefault();
});

document.getElementsByTagName('canvas')[0].addEventListener('touchstart', function(event) {
    changeView();
    event.stopPropagation();
    event.preventDefault();
});

/*
var gyroPresent = false;
window.addEventListener("devicemotion", function(event){
    if(event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)
        gyroPresent = true;
    document.getElementById('rightControl').innerHTML = gyroPresent
});
document.getElementById('rightControl').innerHTML = gyroPresent
*/



//
// const div = document.createElement('div');
// div.innerHTML = 222;
// // document.body.appendChild(div)

// document.getElementById('playBtn').addEventListener('click', () => {
//     document.getElementsByTagName('canvas')[0].scrollIntoView();
//     document.body.style.overflow = 'hidden'
//     document.getElementById('playBtn').style.display = 'none'
// })
//
// document.body.style.overflow = 'visible'


if (!isMobileAndTable) {
    speedEl.style.display = 'block'
    leftControlEl.style.display = 'none'
    rightControlEl.style.display = 'none'
}

document.body.requestFullscreen()
