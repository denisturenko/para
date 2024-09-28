import styled from 'styled-components';

export const ContainerStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BlockStyled = styled.div`
  position: absolute;
  width: 80px;
  height: 40px;
  background-color: white;
  top: 0;
  font-size: 34px;
  opacity: 0.3;
`;

export const AltitudeStyled = styled(BlockStyled)`
  left: 100px;
`;

export const InfoStyled = styled(BlockStyled)`
  left: 200px;
`;
