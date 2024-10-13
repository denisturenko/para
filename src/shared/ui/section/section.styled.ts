import styled, { css } from 'styled-components';

interface ContainerStyledProps {
  $ignoreBackgroundColor?: boolean;
}

export const ContainerStyled = styled.section<ContainerStyledProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  background-color: var(--mantine-color-dark-4);

  @media (max-width: 800px) {
    padding: 20px 20px;
  }

  /* ${({ $ignoreBackgroundColor }) =>
    $ignoreBackgroundColor
      ? css`
          background-color: transparent !important;
        `
      : css`
          :not(.hero):nth-child(even) {
            background-color: var(--mantine-color-dark-4);
          }
        `}*/
`;
