import React, { useCallback, useEffect, memo, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useThrottledCallback } from 'use-debounce';
import { usePlayerControls } from 'shared/lib/hooks';
import { TouchBar } from 'shared/ui/touch-bar';
import { ContainerStyled, SettingButtonStyled } from './game-controls.styled';
import { useGameControlsContext } from 'shared/ui/game-controls/game-controls.provider';
import { MAX_VERTICAL_ANGEL, MIDDLE_VERTICAL_ANGEL, MIN_VERTICAL_ANGEL } from './game-controls.constants';

export interface GameControlsProps {
  allowTouchEndHandler?: boolean;
  onSettings(): void;
}

export const GameControls = memo((props: GameControlsProps) => {
  const { onSettings, allowTouchEndHandler } = props;

  const { leftControlValue, onLeftControlChange, rightControlValue, onRightControlChange, cameraTheta, onChangeCameraTheta } =
    useGameControlsContext();

  const controls = usePlayerControls();

  const leftTimer = useRef<NodeJS.Timeout | undefined>();
  const rightTimer = useRef<NodeJS.Timeout | undefined>();

  const adjustLeft = useCallback(
    (multiply = 1) => {
      clearTimeout(leftTimer.current);
      // leftTimer.current = setTimeout(() => {
      //   onLeftControlChange(0);
      // }, 1000);

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
      clearTimeout(rightTimer.current);
      // rightTimer.current = setTimeout(() => {
      //   onRightControlChange(0);
      // }, 1000);

      let nextRightControlValue = rightControlValue + multiply;

      if (nextRightControlValue > 100) nextRightControlValue = 100;

      if (nextRightControlValue < 0) nextRightControlValue = 0;

      onRightControlChange(nextRightControlValue);
    },
    [rightControlValue, onRightControlChange]
  );

  const adjustRightFn = useThrottledCallback(adjustRight, 50);

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

  const onSettingsClickHandler = useCallback(
    (event: MouseEvent) => {
      onSettings();
      event.stopPropagation();
    },
    [onSettings]
  );

  return (
    <ContainerStyled onClick={onTouchStartHandler}>
      <TouchBar isLeft allowTouchEndHandler={allowTouchEndHandler} value={leftControlValue} onChange={onLeftControlChange} />
      <SettingButtonStyled onClick={onSettingsClickHandler}>
        <AiOutlineMenu />
      </SettingButtonStyled>
      <TouchBar isRight allowTouchEndHandler={allowTouchEndHandler} value={rightControlValue} onChange={onRightControlChange} />
    </ContainerStyled>
  );
});
GameControls.displayName = 'GameControls';
