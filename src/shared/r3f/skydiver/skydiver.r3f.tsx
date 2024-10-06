/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Denys Almaral (https://sketchfab.com/denysalmaral)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/casual-lowpoly-male-rig-t-pose-2f69be91f3044fe68881e354b220fc60
Title: Casual LowPoly Male Rig T-pose
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const Skydiver = props => {
  const { nodes, materials } = useGLTF('/models/skydiver.glb');

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          {/* eslint-disable-next-line no-underscore-dangle */}
          <primitive object={nodes._rootJoint} />
          <skinnedMesh geometry={nodes.Object_7.geometry} material={materials.peopleColors} skeleton={nodes.Object_7.skeleton} />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/models/skydiver.glb');
