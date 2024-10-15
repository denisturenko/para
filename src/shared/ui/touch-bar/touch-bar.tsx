import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { WrapperStyled, LevelStyled } from './touch-bar.styled';
import { calculateTouching } from './touch-bar.utils';
import { scale } from 'chroma-js';
import { toPercent } from 'shared/lib/utils';

interface TouchBarProps {
  allowTouchEndHandler?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
  onChange(value: number): void;
  value: number;
}

const colors = scale(['green', 'blue', 'red']);

export const TouchBar: FC<TouchBarProps> = props => {
  const { onChange, value, allowTouchEndHandler } = props;

  const wrapperRef = useRef<HTMLElement>(null!);
  const levelRef = useRef<HTMLElement>(null!);

  const onTouchMoveHandler = useCallback(
    (event: TouchEvent) => {
      const controlValue = calculateTouching(wrapperRef.current, levelRef.current, event);

      onChange(Number(controlValue));

      event.stopPropagation();
      // event.preventDefault();  error!!!
    },
    [onChange]
  );

  const onTouchStartHandler = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const onClickHandler = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const onTouchEndHandler = useCallback(
    (event: MouseEvent) => {
      if (allowTouchEndHandler) {
        setTimeout(() => onChange(0), 1000);
        event.stopPropagation();
      }
    },
    [onChange, allowTouchEndHandler]
  );

  return (
    <WrapperStyled
      ref={wrapperRef}
      $isLeft={props.isLeft}
      $isRight={props.isRight}
      onClick={onClickHandler}
      onTouchEnd={onTouchEndHandler}
      onTouchMove={onTouchMoveHandler}
      onTouchStart={onTouchStartHandler}
    >
      <LevelStyled
        ref={levelRef}
        $isLeft={props.isLeft}
        $isRight={props.isRight}
        style={{ height: String(value) + '%', backgroundColor: colors(toPercent(value)) }}
      >
        {value}
      </LevelStyled>
    </WrapperStyled>
  );
};
