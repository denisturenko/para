import {
  Sky,
  PointerLockControls,
  Stats,
  PerspectiveCamera,
  DeviceOrientationControls,
  OrbitControls,
} from "@react-three/drei";

import { Ground } from "./Ground";
import { Player } from "./Player";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { StereoCamera } from "./StereoCamera";
import { Target } from "./Target";
import { Arrow } from "./Arrow";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

interface GameProps {
  isPaused: boolean;
  cameraTheta: number;
  leftControlValue: number;
  rightControlValue: number;
  angelCorrection?: number;
  arrowAngel?: number;
  windAngel: number;
  windSpeeds: number[];
  playerAzimuth: number;
  playerPosition: THREE.Vector3;
  playerBodyHeight: number;
  targetPosition: THREE.Vector3;
  arrowPosition: THREE.Vector3;
  withOrbitControls?: boolean;
  verticalSpeed: number;
  maxSpeed: number;
  minSpeed: number;
  inertiaFactor: number;
  onGround?: () => void;
}

export const Game = (props: GameProps) => {
  const {
    withOrbitControls,
    windAngel,
    angelCorrection = 0,
    arrowAngel = Math.PI - windAngel,
    arrowPosition,
    onGround,
    playerPosition,
    playerAzimuth,
  } = props;
  const firstPersonCamera = useRef();

  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<
    THREE.Vector3 | undefined
  >();

  useEffect(() => {
    if (currentPlayerPosition?.y <= 0) {
      onGround?.();
    }
  }, [currentPlayerPosition?.y, onGround]);

  // console.log("***", currentPlayerPosition);

  return (
    <>
      {/*<Stats />*/}
      {/*<fog attach="fog" args={[0xcccccc, 10, 2000]} />*/}
      {/*<PointerLockControls />*/}
      <PerspectiveCamera
        makeDefault
        ref={firstPersonCamera}
        fov={60}
        far={3500}
      />
      {withOrbitControls && (
        <OrbitControls
          target={currentPlayerPosition}
          // target={props.arrowPosition}
          camera={firstPersonCamera.current}
          minPolarAngle={degToRad(0)}
          maxPolarAngle={degToRad(90)}
          // minDistance={10}
          // maxDistance={20}
        />
      )}
      {/*<StereoCamera />*/}
      {/*<DeviceOrientationControls*/}
      {/*  // camera={firstPersonCamera.current}*/}
      {/*  alphaOffset={-Math.PI / 2}*/}
      {/*  screenOrientation={90}*/}
      {/*  deviceOrientation={{ alpha: Math.PI / 2 }}*/}
      {/*/>*/}
      <Sky sunPosition={[3000, 3000, 3000]} />
      <ambientLight intensity={20} />
      <Ground />
      <Target position={props.targetPosition} arrowAngel={arrowAngel} />
      <Arrow position={arrowPosition} arrowAngel={arrowAngel} />
      <Player
        onChangePosition={setCurrentPlayerPosition}
        position={playerPosition}
        azimuth={playerAzimuth}
        {...props}
        windAngel={angelCorrection - windAngel}
        ignoreHeadCamera={withOrbitControls}
      />
    </>
  );
};
