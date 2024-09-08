import { Sky, PointerLockControls, Stats } from "@react-three/drei";

import { Ground } from "./Ground";
import { Player } from "./Player";
import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

interface GameProps {
  leftControlValue: number;
  rightControlValues: number;
  windAngel: number;
  windSpeeds: number[];
}

export const Game = (props: GameProps) => {
  return (
    <>
      {/*<Stats />*/}
      {/*<fog attach="fog" args={[0xcccccc, 10, 2000]} />*/}
      {/*<PointerLockControls />*/}
      <Sky sunPosition={[0, 1000, 0]} />
      <ambientLight intensity={20} />
      <Ground />
      <Player
        position={[0, 600, -10]}
        maxSpeed={13}
        minSpeed={3}
        inertiaFactor={0}
        azimuth={degToRad(0)}
        {...props}
      />
    </>
  );
};
