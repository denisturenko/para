import styled from 'styled-components';

export const ContainerStyled = styled.div`
  position: absolute;
  //left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const CenterBlockWrapperStyled = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterBlockStyled = styled.div`
  position: relative;
  top: 0;
  width: 70%;
  height: 70%;
  //border: solid 1px silver;
`;

export const ButtonWrapperStyled = styled.div`
  position: absolute;
  top: 0;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.3;
  font-size: 30px;
`;

export const SettingButtonStyled = styled(ButtonWrapperStyled)`
  right: 100px;
  color: black;
`;

export const ArrowButtonStyled = styled(ButtonWrapperStyled)`
  right: 100px;
  top: auto;
  bottom: 0;
  color: black;
`;
