import styled from 'styled-components';
import { Section } from 'shared/ui/section';
import { Button } from '@mantine/core';

export const ContainerStyled = styled(Section)`
  position: relative;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  color: #fff;
`;

export const BackBlockStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  //z-index: -1;
  background-color: #a1532f;
  background-position: center center;
`;

export const ContentAreaStyled = styled.div`
  opacity: 0;
  //margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;

  animation: 1s slidefade 0.2s forwards;
  z-index: 10;

  @keyframes slidefade {
    100% {
      opacity: 1;
      margin: 0;
    }
  }
`;

export const H1Styled = styled.h1`
  font: 40px 'Amatic SC', sans-serif;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.3);
  margin-bottom: 15px;

  border-radius: 5px;
  background-color: rgba(85, 85, 85, 0.5);

  @media (max-width: 800px) {
    font-size: 40px;
  }
`;

export const H2Styled = styled.h2`
  font: 28px 'Raleway', sans-serif;
  font-weight: 300;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.3);

  border-radius: 5px;
  background-color: rgba(85, 85, 85, 0.5);

  @media (max-width: 800px) {
    font-size: 24px;
  }
`;

export const ButtonStyled = styled(Button)`
  width: 200px;
`;
