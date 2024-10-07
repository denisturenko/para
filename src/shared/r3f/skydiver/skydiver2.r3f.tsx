/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Claus the Modeler (https://sketchfab.com/johnyxtr)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/learning-suit-low-poly-4350bfaa1d1e445e89049dbc2ca9b732
Title: Learning suit Low poly
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const Skydiver2 = props => {
  const { nodes, materials } = useGLTF('/models/player2.glb');

  const ref = useRef();

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.MatCamisa} />
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.MatPantalon} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.MatZapatos} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials.MatTirante} />
      </group>
    </group>
  );
};

useGLTF.preload('/models/player2.glb');