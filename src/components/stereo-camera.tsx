import type React from 'react';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THERE from 'three';
import type * as THREE from 'three';

export const StereoCamera: React.FC = () => {
  const stereoCamera = useRef(new THERE.StereoCamera());

  useEffect(() => {
    stereoCamera.current.eyeSep = 1;
  }, []);

  useFrame(({ gl, scene, camera, size }) => {
    stereoCamera.current.update(camera as THREE.PerspectiveCamera);

    if (gl.autoClear) gl.clear();

    gl.autoClear = false;

    gl.setScissorTest(true);

    gl.setScissor(0, 0, size.width / 2, size.height);
    gl.setViewport(0, 0, size.width / 2, size.height);
    gl.render(scene, stereoCamera.current.cameraL);

    gl.setScissor(size.width / 2, 0, size.width / 2, size.height);
    gl.setViewport(size.width / 2, 0, size.width / 2, size.height);
    gl.render(scene, stereoCamera.current.cameraR);

    gl.setScissorTest(false);

    gl.autoClear = true;
  }, 1);

  return null;
};
