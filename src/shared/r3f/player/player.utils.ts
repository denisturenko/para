import * as THREE from 'three';
import type { WindSettings } from 'shared/lib/types';
import { sortBy } from 'lodash';
import { dynamicValue } from 'shared/lib/utils';

export const getSpeed = (val: number, maxSpeed: number, minSpeed: number) => {
  const percent = 100 - val;

  return (percent / 100) * (maxSpeed - minSpeed) + minSpeed;
};

/** Calculate direction and new coordinates. */
export const moveAxle = (speedLeft: number, speedRight: number, angle: number, time: number, inertiaFactor = 0) => {
  // const angle = angleInit * NORMAL_ALFA_PER_SEC;
  // Длина оси
  const axleLength = 6; // метры

  // Вычисляем скорость центра оси
  const speedCenter = (speedLeft + speedRight) / 2;

  // Вычисляем угловую скорость (рад/с)
  const angularSpeed = (speedRight - speedLeft) / axleLength / (inertiaFactor || 1);

  // Новая координата центра оси
  const dx = speedCenter * Math.sin(angle) * time;
  const dy = speedCenter * Math.cos(angle) * time;

  // Новые координаты центра оси
  const newX = dx;
  const newY = dy;

  // Новый угол оси
  const newAngle = angle + angularSpeed * time;

  return {
    x: newX,
    z: newY,
    angle: newAngle,
  };
};

let lastCallTimestamp = 0;
let lastResult = 0;

// todo mode to utils
export const modifyParamWithinRange = (from: number, to: number, ignoreGusts = false) => {
  if (ignoreGusts) return from;

  const now = Date.now();

  if (lastResult && now - lastCallTimestamp < 1000) {
    return lastResult;
  }

  lastCallTimestamp = now;

  lastResult = !from && !to ? 0 : from + Math.floor(Math.random() * (to - 1));

  return lastResult;
};

// todo mode to utils
export const createDirectionVector = (dir0: THREE.Vector3, alfaHorizontal: number, alfaVertical: number) => {
  const newX = dir0.x - 1 * Math.cos(-1 * alfaVertical) * Math.sin(alfaHorizontal);
  const newZ = dir0.z - 1 * Math.cos(-1 * alfaVertical) * Math.cos(alfaHorizontal);
  const newY = dir0.y - 1 * Math.sin(-1 * alfaVertical);

  const dir1 = new THREE.Vector3(newX, newY, newZ);

  const dir = new THREE.Vector3();

  dir.subVectors(dir1, dir0);

  return dir.normalize();
};

// todo mode to utils
export const createVector = (dir0: THREE.Vector3, length: number, alfaHorizontal: number, alfaVertical: number) => {
  const newPos = new THREE.Vector3();
  const dir1 = createDirectionVector(dir0, alfaHorizontal, alfaVertical);

  newPos.addVectors(dir0, dir1.multiplyScalar(length));

  return newPos;
};

export const getWindByHeight = (winds: WindSettings[], height: number): WindSettings | undefined => {
  let res;

  sortBy<WindSettings>(winds, w => w.minHeight).forEach(w => {
    if (w.minHeight <= height) {
      res = w;
    }
  });

  return res;
};

/* const getCoordinateShift = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  // Радиус Земли в метрах
  const R = 6_378_137;

  // Конвертация широты и долготы из градусов в радианы
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  // Вычисление разницы
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  // Используем формулу для расчета сдвига в метрах
  const shiftX = R * dLat; // сдвиг по оси Y (север-юг)
  const shiftY = R * Math.cos((lat1Rad + lat2Rad) / 2) * dLon; // сдвиг по оси X (восток-запад)

  return {
    shiftX,
    shiftY,
  };
}; */

/* export const calculateTrackFromCoords = () => {
  const center = [59.472_741_4, 30.003_436_6];

  const mapped = []
    .filter(item => item.gpsLocationValid)
    .map(item => ({
      ts: item.gpsTime * 1000 + item.gpsTimeCentiSec * 10,
      lat: item.gpsLatitude / 1_000_000,
      lon: item.gpsLongitude / 1_000_000,
      alt: item.altitudeMeters,
    }));
  const sorted = sortBy(mapped, item => item.alt); /!* .reverse() *!/

  const res = sortBy(sorted, item => item.alt).reverse();

  // console.log('***', res);

  const track = res.map((item, idx) => {
    // if (idx === 1050) console.log('***', item);

    if (idx === 1390) console.log('***', item);

    if (idx === 1580) console.log('***', item);

    const { shiftX, shiftY } = getCoordinateShift(center[0], center[1], item.lat, item.lon);

    return new THREE.Vector3(shiftX - 1000, item.alt - 100, shiftY - 500);
  });

  // console.log('***', track);

  return track;
}; */

// calculateTrackFromCoords();

interface calculateVerticalSpeedDuringLandingParams {
  currentSpeed: number;
  leftControlValue: number;
  minSpeed?: number;
  rightControlValue: number;
}

export const calculateVerticalSpeedDuringLanding = (params: calculateVerticalSpeedDuringLandingParams): number => {
  const { leftControlValue, rightControlValue, currentSpeed, minSpeed = 1 } = params;
  const min = Math.min(leftControlValue, rightControlValue);

  if (min <= 50) {
    return currentSpeed - (min / 100) * 2;
  }

  const res = ((100 - min) / 100) * (currentSpeed - 1 - minSpeed) * 3;

  return res ? res : 0.1;
};

interface CalculateVerticalSpeedParams {
  leftControlValue: number;
  middleSpeed: number;
  minSpeed?: number;
  rightControlValue: number;
}
export const calculateVerticalSpeedForTurns = (params: CalculateVerticalSpeedParams): number => {
  const { leftControlValue, rightControlValue, minSpeed = 0, middleSpeed } = params;
  const delta = Math.abs(leftControlValue - rightControlValue);

  return (delta / 100) * (middleSpeed - minSpeed) + middleSpeed;
};

// todo
export const calculateVerticalSpeed = (matrix: number[][]) => {
  const dynamicValueFn = dynamicValue(matrix);

  return (leftControlValue: number, rightControlValue: number, currentSpeed: number) => {
    const currentVerticalSpeedTmp = calculateVerticalSpeedForTurns({ leftControlValue, rightControlValue, middleSpeed: currentSpeed });
    const currentVerticalSpeedTmp2 = calculateVerticalSpeedDuringLanding({
      leftControlValue,
      rightControlValue,
      currentSpeed: currentVerticalSpeedTmp,
    });
    const minControlValue = Math.min(leftControlValue, rightControlValue);
    const res = dynamicValueFn(minControlValue, currentVerticalSpeedTmp2, Date.now());

    // console.log('***', currentVerticalSpeedTmp, currentVerticalSpeedTmp2, res);

    return res;
  };
};
