import React, { useCallback, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import * as THREE from 'three';
import { useThrottledCallback } from 'use-debounce';
import { usePlayerControls } from 'shared/lib/hooks';
import { TouchBar } from 'shared/ui/touch-bar';
import { ContainerStyled, SettingButtonStyled } from './game-controls.styled';

const { MathUtils } = THREE;
const { degToRad } = MathUtils;

const MAX_VERTICAL_ANGEL = degToRad(30);
const MIDDLE_VERTICAL_ANGEL = degToRad(48);
const MIN_VERTICAL_ANGEL = degToRad(67);

interface GameControlsProps {
  cameraTheta?: number;
  onChangeCameraTheta(value: number): void;
  leftControlValue: number;
  rightControlValue: number;
  onLeftControlChange(value: number): void;
  onRightControlChange(value: number): void;
  onSettings(): void;
}

export const GameControls = (props: GameControlsProps) => {
  const { onLeftControlChange, onRightControlChange, onChangeCameraTheta, cameraTheta, leftControlValue, rightControlValue, onSettings } =
    props;

  const controls = usePlayerControls();

  const adjustLeft = useCallback(
    (multiply = 1) => {
      let nextLeftControlValue = leftControlValue + multiply;

      if (nextLeftControlValue > 100) nextLeftControlValue = 100;

      if (nextLeftControlValue < 0) nextLeftControlValue = 0;

      onLeftControlChange(nextLeftControlValue);
    },
    [leftControlValue, onLeftControlChange]
  );

  const adjustLeftFn = useThrottledCallback(adjustLeft, 50);

  const adjustRight = useCallback(
    (multiply = 1) => {
      let nextRightControlValue = rightControlValue + multiply;

      if (nextRightControlValue > 100) nextRightControlValue = 100;

      if (nextRightControlValue < 0) nextRightControlValue = 0;

      onRightControlChange(nextRightControlValue);
    },
    [rightControlValue, onRightControlChange]
  );

  const adjustRightFn = useThrottledCallback(adjustRight, 50);

  /* useEffect(() => {
    if (controls.left) {
      adjustLeft();
    }
    if (controls.right) {
      adjustRight();
    }
    if (controls.down) {
      adjustLeft();
      adjustRight();
    }
    if (controls.up) {
      adjustLeft(-1);
      adjustRight(-1);
    }
  }, [controls]); */

  useEffect(() => {
    if (cameraTheta === undefined) {
      onChangeCameraTheta(MIN_VERTICAL_ANGEL);
    }
  }, [cameraTheta, onChangeCameraTheta]);

  const onTouchStartHandler = useCallback(() => {
    if (cameraTheta === MIN_VERTICAL_ANGEL) onChangeCameraTheta(MIDDLE_VERTICAL_ANGEL);
    else if (cameraTheta === MIDDLE_VERTICAL_ANGEL) onChangeCameraTheta(MAX_VERTICAL_ANGEL);
    else onChangeCameraTheta(MIN_VERTICAL_ANGEL);
  }, [cameraTheta, onChangeCameraTheta]);

  const onTouchStartHandlerFn = useThrottledCallback(onTouchStartHandler, 100);

  useEffect(() => {
    if (controls.leftUp) {
      adjustLeftFn(-1);
    }

    if (controls.leftDown) {
      adjustLeftFn();
    }
  }, [adjustLeftFn, controls, leftControlValue]);

  useEffect(() => {
    if (controls.rightUp) {
      adjustRightFn(-1);
    }

    if (controls.rightDown) {
      adjustRightFn();
    }
  }, [adjustRightFn, controls, rightControlValue]);

  useEffect(() => {
    if (controls.space) {
      onTouchStartHandlerFn();
    }
  }, [controls.space, onTouchStartHandlerFn]);

  /* useEffect(() => {
    if (controls.leftUp) {
      adjustLeft(-1);
    }
    if (controls.leftDown) {
      adjustLeft();
    }
    if (controls.rightUp) {
      adjustRightFn(-1);
    }
    if (controls.rightDown) {
      adjustRightFn();
    }
    if (controls.space) {
      onTouchStartHandlerFn();
    }
  }, [onTouchStartHandlerFn, adjustLeftFn, adjustRightFn, controls]); */

  const onSettingsTouchHandler = useCallback(
    (event: MouseEvent) => {
      onSettings();
      event.stopPropagation();
    },
    [onSettings]
  );

  return (
    <ContainerStyled onTouchStart={onTouchStartHandler}>
      <TouchBar isLeft value={leftControlValue} onChange={onLeftControlChange} />
      <SettingButtonStyled onTouchStart={onSettingsTouchHandler}>
        <AiOutlineMenu />
      </SettingButtonStyled>
      <TouchBar isRight value={rightControlValue} onChange={onRightControlChange} />
    </ContainerStyled>
  );
};
