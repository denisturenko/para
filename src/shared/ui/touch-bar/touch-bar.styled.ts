import styled, { css } from 'styled-components';
import { touchBarWidth } from 'shared/ui/touch-bar/touch-bar.constants';

interface LeftRightProps {
  $isLeft?: boolean;
  $isRight?: boolean;
}

export const WrapperStyled = styled.div<LeftRightProps>`
  position: absolute;
  width: ${touchBarWidth};
  height: calc(100% - 20px);
  background-color: white;
  opacity: 0.1;
  font-size: 34px;
  top: 0;

  ${({ $isLeft }) =>
    $isLeft
      ? css`
          left: 0;
        `
      : ''};

  ${({ $isRight }) =>
    $isRight
      ? css`
          right: 0;
        `
      : ''};
`;

export const LevelStyled = styled.div<LeftRightProps>`
  height: 0;
  width: 100%;
  //background-color: blue;
  color: white;
  padding: 0 10px;

  ${({ $isLeft }) =>
    $isLeft
      ? css`
          left: 0;
          text-align: right;
        `
      : ''};

  ${({ $isRight }) =>
    $isRight
      ? css`
          right: 0;
        `
      : ''};
`;
