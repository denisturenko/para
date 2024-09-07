import * as THREE from "three";

export const getSpeed = (val: number, maxSpeed, minSpeed) => {
  const percent = 100 - val;
  return (percent / 100) * (maxSpeed - minSpeed) + minSpeed;
};

/** Calculate direction and new coordinates. */
export const moveAxle = (
  speedLeft: number,
  speedRight: number,
  angle: number,
  time: number,
  inertiaFactor = 0
) => {
  // const angle = angleInit * NORMAL_ALFA_PER_SEC;
  // Длина оси
  const axleLength = 10; // метры

  // Вычисляем скорость центра оси
  const speedCenter = (speedLeft + speedRight) / 2;

  // Вычисляем угловую скорость (рад/с)
  const angularSpeed =
    (speedRight - speedLeft) / axleLength / (inertiaFactor || 1);

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

export const modifyParamWithinRange = (from: number, to: number) => {
  const now = Date.now();
  if (lastResult && now - lastCallTimestamp < 1000) {
    return lastResult;
  }
  lastCallTimestamp = now;
  lastResult = from + Math.floor(Math.random() * (to - 1));
  return lastResult;
};

export const createDirectionVector = (
  dir0: THREE.Vector3,
  alfaHorizontal: number,
  alfaVertical: number
) => {
  const newX =
    dir0.x - 1 * Math.cos(-1 * alfaVertical) * Math.sin(alfaHorizontal);
  const newZ =
    dir0.z - 1 * Math.cos(-1 * alfaVertical) * Math.cos(alfaHorizontal);
  const newY = dir0.y - 1 * Math.sin(-1 * alfaVertical);

  const dir1 = new THREE.Vector3(newX, newY, newZ);

  const dir = new THREE.Vector3();
  dir.subVectors(dir1, dir0);

  return dir.normalize();
};

export const createVector = (
  dir0: THREE.Vector3,
  length: number,
  alfaHorizontal: number,
  alfaVertical: number
) => {
  const newPos = new THREE.Vector3();
  const dir1 = createDirectionVector(dir0, alfaHorizontal, alfaVertical);
  newPos.addVectors(dir0, dir1.multiplyScalar(length));
  return newPos;
};
