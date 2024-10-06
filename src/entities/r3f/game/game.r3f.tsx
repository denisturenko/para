import { Sky, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import type { PropsWithChildren } from 'react';
import { memo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { GameSettings } from 'shared/lib/types';
import { Arrow } from 'shared/r3f/arrow';
import { Ground } from 'shared/r3f/ground';
import { getWindByHeight } from 'shared/r3f/player';
import { Target } from 'shared/r3f/target';
import { useListenChangedProps } from 'shared/lib/hooks';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

export interface GameProps extends GameSettings {
  onReady(): void;
}

export const Game = memo((props: PropsWithChildren<GameProps>) => {
  const windAngel = getWindByHeight(props.winds, 0)?.angel || 0;

  useListenChangedProps(props, 'game-r3f');

  const {
    onReady,
    withOrbitControls,
    angelCorrection = 0,
    arrowAngel = angelCorrection - windAngel,
    arrowPosition,
    helpers,
    children,
  } = props;
  const firstPersonCamera = useRef();

  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      {/* <Stats /> */}
      {/* <fog args={[0xcc_cc_cc, 10, 1000]} attach="fog" /> */}
      {/* <PointerLockControls /> */}
      <Sky azimuth={0.25} distance={4000} inclination={0} sunPosition={[3000, 3000, 3000]} {...props} />
      <PerspectiveCamera ref={firstPersonCamera} far={3500} fov={60} makeDefault={!withOrbitControls} />
      {withOrbitControls && (
        <OrbitControls
          camera={firstPersonCamera.current}
          maxPolarAngle={degToRad(90)}
          minPolarAngle={degToRad(0)}
          // target={createVector(props.targetPosition, 200, Math.PI / 2, 0)}
          // target={currentPlayerPosition} пока убрал
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
      <ambientLight intensity={20} />
      <Ground />
      <Target arrowAngel={arrowAngel} helpers={helpers} position={props.targetPosition} />
      <Arrow arrowAngel={arrowAngel} position={arrowPosition} />
      {children}
    </>
  );
});
Game.displayName = 'Game';
