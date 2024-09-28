import React from 'react';
import * as THREE from 'three';
import type { PlayerControls } from 'shared/lib/types';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

export const MAX_VERTICAL_ANGEL = degToRad(30);
export const MIDDLE_VERTICAL_ANGEL = degToRad(48);
export const MIN_VERTICAL_ANGEL = degToRad(67);

export const initialPlayerControls: PlayerControls = {
  leftControlValue: 0,
  rightControlValue: 0,
  cameraTheta: MIN_VERTICAL_ANGEL,
};
