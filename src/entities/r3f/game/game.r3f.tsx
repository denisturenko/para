import { Sky, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// import { Game as Game3 } from 'pages/game';
import type { GameSettings } from 'shared/lib/types';
import { Arrow } from 'shared/r3f/arrow';
import { Ground } from 'shared/r3f/ground';
import { Player } from 'shared/r3f/player';
import { Target } from 'shared/r3f/target';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

interface GameProps extends GameSettings {
  cameraTheta: number;
  angelCorrection?: number;
  arrowAngel?: number;
  targetPosition: THREE.Vector3;
  arrowPosition: THREE.Vector3;
  onGround?(): void;
  foo: number;
}

export const Game = (props: GameProps) => {
  const windAngel = props.winds[0].angel || 0;

  console.log('***', windAngel);

  const {
    withOrbitControls,
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
