import styled from 'styled-components';

export const ContainerStyled = styled.div`
  position: absolute;
  //left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const ButtonWrapperStyled = styled.div`
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
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
