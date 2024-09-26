import { useEffect, useState } from 'react';
import * as THREE from 'three';

const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

interface UseDeviceOrientationParams {
  thetaInitial?: number;
  azimuthInitial?: number;
}

interface UseDeviceOrientationResult {
  theta: number;
  azimuth: number;
  beta: number;
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

      if (gamma > 0 && gamma < 45) gamma = 0;

      if (gamma > 0 && gamma > 45) gamma = -90;

      // 90 - 0, 360 - 270
      if (alpha > 90 && alpha < 180) alpha = 90;

      if (alpha <= 90) alpha = -1 * alpha;

      // -90 ... +90
      beta += 180;

      if (alpha < 270 && alpha > 180) alpha = 270;

      if (alpha >= 270) alpha = 360 - alpha;

      document.getElementById('info').innerHTML = String(window.orientation);

      setState(() => ({
        theta: Math.PI / 2 + degToRad(gamma),
        azimuth: degToRad(alpha),
        beta: degToRad(beta),
      }));
    };

    window.addEventListener('deviceorientation', deviceOrientationHandler);
    window.addEventListener('MozOrientation', deviceOrientationHandler);

    return () => {
      window.removeEventListener('deviceorientation', deviceOrientationHandler);
      window.removeEventListener('MozOrientation', deviceOrientationHandler);
    };
  }, []);

  return state;
};
