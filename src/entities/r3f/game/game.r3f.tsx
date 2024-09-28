import { Sky, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { GameSettings } from 'shared/lib/types';
import { Arrow } from 'shared/r3f/arrow';
import { Ground } from 'shared/r3f/ground';
import { getWindByHeight, Player } from 'shared/r3f/player';
import { Target } from 'shared/r3f/target';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

export interface GameProps extends GameSettings {
  onGround?(): void;
}

export const Game = memo((props: GameProps) => {
  const windAngel = getWindByHeight(props.winds, 0)?.angel || 0;

  const {
    withOrbitControls,
    angelCorrection = 0,
    arrowAngel = angelCorrection - windAngel,
    arrowPosition,
    onGround,
    playerPosition,
    playerAzimuth,
    helpers,
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
      <Target arrowAngel={arrowAngel} helpers={helpers} position={props.targetPosition} />
      <Arrow arrowAngel={arrowAngel} position={arrowPosition} />
      <Player
        azimuth={playerAzimuth}
        position={playerPosition}
        onChangePosition={setCurrentPlayerPosition}
        {...props}
        ignoreHeadCamera={withOrbitControls}
      />
    </>
  );
});
Game.displayName = 'Game';
