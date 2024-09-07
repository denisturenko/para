import { WrapperStyled, LevelStyled } from "./TouchBar.styled";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { calculateTouching } from "./touch-bar.utils";

interface TouchBarProps {
  isLeft?: boolean;
  isRight?: boolean;
  onChange?: (value: number) => void;
}

export const TouchBar: FC<TouchBarProps> = (props) => {
  const { onChange } = props;

  const wrapperRef = useRef<HTMLElement>(null!);
  const levelRef = useRef<HTMLElement>(null!);

  const [value, setValue] = useState(0);
  useEffect(() => {
    onChange?.(value);
  }, [value, onChange]);

  const onTouchMoveHandler = useCallback((event: TouchEvent) => {
    const controlValue = calculateTouching(
      wrapperRef.current,
      levelRef.current,
      event
    );
    setValue(Number(controlValue));

    event.stopPropagation();
    // event.preventDefault();
  }, []);

  return (
    <WrapperStyled
      ref={wrapperRef}
      $isLeft={props.isLeft}
      $isRight={props.isRight}
      onTouchMove={onTouchMoveHandler}
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
