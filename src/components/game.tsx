import { useEffect, useRef, useState } from 'react';
import { Sky, PerspectiveCamera, OrbitControls } from '@react-three/drei';

import * as THREE from 'three';
import type { AppState } from '../types';
import { Arrow } from './arrow';
import { Ground } from './ground';
import { Player } from './player';
import { StereoCamera } from './stereo-camera';
import { Target } from './target';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

interface GameProps extends AppState {
  cameraTheta: number;
  angelCorrection?: number;
  arrowAngel?: number;
  targetPosition: THREE.Vector3;
  arrowPosition: THREE.Vector3;
  onGround?(): void;
  foo: number;
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

  const [currentPlayerPosition, setCurrentPlayerPosition] = useState<THREE.Vector3 | undefined>();

  useEffect(() => {
    if (currentPlayerPosition?.y <= 0) {
      onGround?.();
    }
  }, [currentPlayerPosition?.y, onGround]);

  // console.log("***", currentPlayerPosition);

  return (
    <>
      {/* <Stats /> */}
      {/* <fog attach="fog" args={[0xcccccc, 10, 2000]} /> */}
      {/* <PointerLockControls /> */}
      <PerspectiveCamera ref={firstPersonCamera} makeDefault far={3500} fov={60} />
      {withOrbitControls && (
        <OrbitControls
          camera={firstPersonCamera.current}
          // target={props.arrowPosition}
          maxPolarAngle={degToRad(90)}
          minPolarAngle={degToRad(0)}
          target={currentPlayerPosition}
          // minDistance={10}
          // maxDistance={20}
        />
      )}
      {/* <StereoCamera /> */}
      {/* <DeviceOrientationControls */}
      {/*  // camera={firstPersonCamera.current} */}
      {/*  alphaOffset={-Math.PI / 2} */}
      {/*  screenOrientation={90} */}
      {/*  deviceOrientation={{ alpha: Math.PI / 2 }} */}
      {/* /> */}
      <Sky sunPosition={[3000, 3000, 3000]} />
      <ambientLight intensity={20} />
      <Ground />
      <Target arrowAngel={arrowAngel} position={props.targetPosition} />
      <Arrow arrowAngel={arrowAngel} position={arrowPosition} />
      <Player
        azimuth={playerAzimuth}
        position={playerPosition}
        onChangePosition={setCurrentPlayerPosition}
        {...props}
        ignoreHeadCamera={withOrbitControls}
        windAngel={angelCorrection - windAngel}
      />
    </>
  );
};
