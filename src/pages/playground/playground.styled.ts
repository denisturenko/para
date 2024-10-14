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
  width: 80px;
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

export const InfoStyled = styled(BlockStyled)`
  left: 200px;
`;
