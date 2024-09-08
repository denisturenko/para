import { useEffect, useState } from "react";
import * as THREE from "three";
const { Vector3, MathUtils, ArrowHelper, Ray } = THREE;
const { degToRad, radToDeg } = MathUtils;

export const useDeviceOrientation = () => {
  const [state, setState] = useState({
    theta: 0,
    azimuth: 0,
  });

  useEffect(() => {
    const deviceOrientationHandler = (event: DeviceOrientationEvent) => {
      // const absolute = event.absolute;
      let alpha = event.alpha;
      // const beta = event.beta;
      let gamma = event.gamma; // vertical
      if (gamma > 0 && gamma < 45) gamma = 0;
      if (gamma > 0 && gamma > 45) gamma = -90;

      // 90 - 0, 360 - 270
      if (alpha > 90 && alpha < 180) alpha = 90;
      if (alpha <= 90) alpha = -1 * alpha;

      if (alpha < 270 && alpha > 180) alpha = 270;
      if (alpha >= 270) alpha = 360 - alpha;

      setState((prev) => ({
        theta: degToRad(-1 * gamma - 90),
        azimuth: degToRad(-1 * alpha),
      }));
    };

    document.addEventListener("deviceorientation", deviceOrientationHandler);
    document.addEventListener("MozOrientation", deviceOrientationHandler);

    return () => {
      document.removeEventListener(
        "deviceorientation",
        deviceOrientationHandler
      );
      document.removeEventListener("MozOrientation", deviceOrientationHandler);
    };
  }, []);

  return state;
};
