import { Game } from "./components/Game";
import { TouchBar } from "./ui/touch-bar/TouchBar";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { ContainerStyled, InfoStyled } from "./App.styled";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

export const App = () => {
  const [leftControlValue, setLeftControlValue] = useState(0);
  const [rightControlValue, setRightControlValue] = useState(0);

  return (
    <>
      <ContainerStyled>
        <Canvas camera={{ fov: 45, position: [0, 600, 0], far: 3500 }}>
          <Game
            leftControlValue={leftControlValue}
            rightControlValue={rightControlValue}
            windAngel={Math.PI - degToRad(180)}
            windSpeeds={[5, 8]}
          />
        </Canvas>
      </ContainerStyled>
      <InfoStyled id="info" />
      <TouchBar isLeft onChange={setLeftControlValue} />
      <TouchBar isRight onChange={setRightControlValue} />
    </>
  );
};
