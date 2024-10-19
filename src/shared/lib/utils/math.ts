import * as THREE from 'three';
import { Line2, Vector2 } from '@daign/math';

const { degToRad, radToDeg } = THREE.MathUtils;

export const mapValueToPercentage = (min: number, max: number, currentValue: number) => {
  if (currentValue < min) {
    return 0;
  }

  if (currentValue > max) {
    return 1;
  }

  const range = max - min;

  return (currentValue - min) / range;
};

export const dynamicValue = (matrix: number[][]) => {
  let startTime: number | null = null;
  let lastResult: number | null = null;

  return function (controlValue: number, currentValue: number, nowTs: number) {
    if (!startTime) {
      startTime = nowTs;
    }

    const elapsedTime = nowTs - startTime;

    const foundIdx = matrix.findIndex((currentItem, idx) => {
      const nextItem = matrix[idx + 1];

      if (currentItem[0] === controlValue) return true;

      return nextItem && currentItem[0] <= controlValue && nextItem[0] > controlValue;
    });

    if (foundIdx === -1) {
      startTime = null;
      lastResult = null;

      return currentValue;
    }

    const matrixItem = matrix[foundIdx];

    const tsDelta = 3 * 1000;

    if (elapsedTime < matrixItem[1]) {
      return currentValue;
    } else if (elapsedTime < startTime + matrixItem[1] + tsDelta) {
      /* try {
        mapValueToPercentage(elapsedTime, startTime + matrixItem[1] + tsDelta, now);
      } catch (e) {
        console.log('***', elapsedTime, startTime + matrixItem[1] + tsDelta, now);

        return 0;
      } */

      const percent = mapValueToPercentage(elapsedTime, startTime + matrixItem[1] + tsDelta, nowTs);

      lastResult = currentValue + matrixItem[2] * currentValue * percent;

      return lastResult;
    }

    return lastResult;
  };
};

export const toPercent = (value: number) => {
  if (value < 0) return 0;

  if (value > 100) return 1;

  return value / 100;
};

export const getResultVectorLength = (a: THREE.Vector3, b: THREE.Vector3): number =>
  new Line2(new Vector2(a.x, a.z), new Vector2(b.x, b.z)).length;

export const getVectorAngel = (a: THREE.Vector3): number => new Vector2(a.x, a.z).angle().radians;

export const normalizeAngle = (angle: number) => {
  const angle360 = 360;

  const resultAngle = (angle360 + (radToDeg(angle) % angle360)) % angle360;

  return degToRad(resultAngle);
};
