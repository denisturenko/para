import styled from 'styled-components';

interface ContainerStyledProps {
  $isHidden?: boolean;
}

export const ContainerStyled = styled.div<ContainerStyledProps>`
  position: relative;
  width: 100%;
  height: 100%;
  display: ${({ $isHidden }) => ($isHidden ? 'none' : 'block')};
`;

export const GameContainerStyled = styled(ContainerStyled)`
  user-select: none;
`;

export const LoaderWrapperStyled = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LogoImgStyled = styled.img`
  //position: absolute;
  //left: 0;
  //top: 0;
`;

const BlockStyled = styled.div`
  position: absolute;
  width: 70px;
  height: 50px;
  background-color: white;
  top: 0;
  font-size: 34px;
  opacity: 0.3;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AltitudeStyled = styled(BlockStyled)`
  left: 100px;
`;

export const SpeedStyled = styled(BlockStyled)`
  left: 100px;
  width: 50px;
  top: auto;
  bottom: 0;
`;

export const AngelStyled = styled(BlockStyled)`
  display: none;
  top: 100px;
  left: 100px;
  //font-size: 8px;
`;

export const DebugStyled = styled(BlockStyled)`
  display: none;
  top: auto;
  bottom: 0;
  left: 100px;
  width: 250px;
  height: 250px;
  font-size: 8px;
`;
