import styled, { css } from 'styled-components';

interface LeftRightProps {
  $isLeft?: boolean;
  $isRight?: boolean;
}

export const WrapperStyled = styled.div<LeftRightProps>`
  position: absolute;
  width: 100px;
  height: 100%;
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
  background-color: blue;
  color: white;

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
