import { useEffect, useState } from 'react';
import * as THREE from 'three';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

interface UseDeviceOrientationParams {
  azimuthInitial?: number;
  thetaInitial?: number;
}

interface UseDeviceOrientationResult {
  azimuth: number;
  beta: number;
  theta: number;
}

export const useDeviceOrientation = ({ thetaInitial, azimuthInitial }: UseDeviceOrientationParams = {}): UseDeviceOrientationResult => {
  const [state, setState] = useState<UseDeviceOrientationResult>({
    theta: thetaInitial || degToRad(90),
    azimuth: azimuthInitial || 0,
    beta: 0,
  });

  useEffect(() => {
    const deviceOrientationHandler = (event: DeviceOrientationEvent) => {
      // const absolute = event.absolute;
      let { alpha } = event; // horizontal
      let { beta } = event;
      let { gamma } = event; // vertical

      if (gamma && gamma > 0 && gamma < 45) gamma = 0;

      if (gamma && gamma > 0 && gamma > 45) gamma = -90;

      // 90 - 0, 360 - 270
      if (alpha && alpha > 90 && alpha < 180) alpha = 90;

      if (alpha && alpha <= 90) alpha = -1 * alpha;

      // -90 ... +90
      if (beta !== null) beta += 180;

      if (alpha && alpha < 270 && alpha > 180) alpha = 270;

      if (alpha && alpha >= 270) alpha = 360 - alpha;

      // document.getElementById('info').innerHTML = String(window.orientation);

      setState(() => ({
        theta: Math.PI / 2 + degToRad(gamma || 0),
        azimuth: degToRad(alpha || 0),
        beta: degToRad(beta || 0),
      }));
    };

    window.addEventListener('deviceorientation', deviceOrientationHandler);
    // window.addEventListener('MozOrientation', deviceOrientationHandler);

    return () => {
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      // window.removeEventListener('MozOrientation', deviceOrientationHandler);
    };
  }, []);

  return state;
};
