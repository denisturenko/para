import { WrapperStyled, LevelStyled } from "./TouchBar.styled";
import {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import { calculateTouching } from "./touch-bar.utils";

interface TouchBarProps {
  isLeft?: boolean;
  isRight?: boolean;
  onChange: (value: number) => void;
  value: number;
}

export const TouchBar: FC<TouchBarProps> = (props) => {
  const { onChange, value } = props;

  const wrapperRef = useRef<HTMLElement>(null!);
  const levelRef = useRef<HTMLElement>(null!);

  const onTouchMoveHandler = useCallback(
    (event: TouchEvent) => {
      const controlValue = calculateTouching(
        wrapperRef.current,
        levelRef.current,
        event,
      );
      onChange(Number(controlValue));

      event.stopPropagation();
      // event.preventDefault();
    },
    [onChange],
  );

  const onTouchStartHandler = useCallback((event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  }, []);

  return (
    <WrapperStyled
      ref={wrapperRef}
      $isLeft={props.isLeft}
      $isRight={props.isRight}
      onTouchMove={onTouchMoveHandler}
      onTouchStart={onTouchStartHandler}
    >
      <LevelStyled
        ref={levelRef}
        $isLeft={props.isLeft}
        $isRight={props.isRight}
        style={{ height: value + "%" }}
      >
        {value}
      </LevelStyled>
    </WrapperStyled>
  );
};
