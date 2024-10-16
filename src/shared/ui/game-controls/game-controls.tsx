import React, { useCallback, useEffect, memo, useRef } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useThrottledCallback } from 'use-debounce';
import { usePlayerControls } from 'shared/lib/hooks';
import { TouchBar } from 'shared/ui/touch-bar';
import {
  ArrowButtonStyled,
  CenterBlockStyled,
  CenterBlockWrapperStyled,
  ContainerStyled,
  SettingButtonStyled,
} from './game-controls.styled';
import { useGameControlsContext } from 'shared/ui/game-controls/game-controls.provider';
import { MAX_VERTICAL_ANGEL, MIDDLE_VERTICAL_ANGEL, MIN_VERTICAL_ANGEL } from './game-controls.constants';
import { FaArrowPointer } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';
import * as Three from 'three';

const { degToRad } = Three.MathUtils;

export interface GameControlsProps {
  allowTouchEndHandler?: boolean;
  onArrowShowToggle(): void;
  onSettings(): void;
}

export const GameControls = memo((props: GameControlsProps) => {
  const { onSettings, allowTouchEndHandler, onArrowShowToggle } = props;

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

  const onClickHandler = useCallback(() => {
    if (cameraTheta === MIN_VERTICAL_ANGEL) onChangeCameraTheta(MIDDLE_VERTICAL_ANGEL);
    else if (cameraTheta === MIDDLE_VERTICAL_ANGEL) onChangeCameraTheta(MAX_VERTICAL_ANGEL);
    else onChangeCameraTheta(MIN_VERTICAL_ANGEL);
  }, [cameraTheta, onChangeCameraTheta]);

  const onTouchStartHandlerFn = useThrottledCallback(onClickHandler, 100);

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

  const onArrowShowClickHandler = useCallback(
    (event: MouseEvent) => {
      onArrowShowToggle();
      event.stopPropagation();
    },
    [onArrowShowToggle]
  );

  const handlers = useSwipeable({
    onSwiping: eventData => {
      if (eventData.dir === 'Down') {
        const next = cameraTheta - degToRad(1);

        if (next > MAX_VERTICAL_ANGEL) {
          onChangeCameraTheta(next);
        }
      }

      if (eventData.dir === 'Up') {
        const next = cameraTheta + degToRad(1);

        if (next < MIN_VERTICAL_ANGEL) {
          onChangeCameraTheta(next);
        }
      }
    },
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  });

  return (
    <ContainerStyled onClick={onClickHandler}>
      <CenterBlockWrapperStyled>
        <CenterBlockStyled {...handlers} />
      </CenterBlockWrapperStyled>
      <TouchBar isLeft allowTouchEndHandler={allowTouchEndHandler} value={leftControlValue} onChange={onLeftControlChange} />
      <SettingButtonStyled data-testid="btn-settings-game-control" onClick={onSettingsClickHandler}>
        <AiOutlineMenu />
      </SettingButtonStyled>
      <ArrowButtonStyled onClick={onArrowShowClickHandler}>
        <FaArrowPointer />
      </ArrowButtonStyled>
      <TouchBar isRight allowTouchEndHandler={allowTouchEndHandler} value={rightControlValue} onChange={onRightControlChange} />
    </ContainerStyled>
  );
});
GameControls.displayName = 'GameControls';
