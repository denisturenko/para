import styled, { css } from 'styled-components';

interface ContainerStyledProps {
  $ignoreBackgroundColor?: boolean;
}

export const ContainerStyled = styled.section<ContainerStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 80px;

  @media (max-width: 800px) {
    padding: 50px 20px;
  }

  ${({ $ignoreBackgroundColor }) =>
    $ignoreBackgroundColor
      ? css`
          background-color: transparent !important;
        `
      : css`
          :not(.hero):nth-child(even) {
            background-color: #f5f5f5;
          }
        `}
`;
