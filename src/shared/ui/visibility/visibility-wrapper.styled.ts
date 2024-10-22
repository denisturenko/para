import styled from 'styled-components';

interface ContainerStyledProps {
  $isVisible?: boolean;
}

export const ContainerStyled = styled.div<ContainerStyledProps>`
  width: 100%;
  height: 100%;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
`;
