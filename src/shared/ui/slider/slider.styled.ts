import styled from 'styled-components';

export const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 80% auto;
  gap: 8px;
`;

export const SliderWrapperStyled = styled.div`
  padding-bottom: 16px;

  & .mantine-InputWrapper-error {
    margin-top: 20px;
    margin-bottom: -20px;
  }
`;

export const InputWrapperStyled = styled.div`
  display: flex;
  align-items: center;

  height: 100%;
  width: 100%;
`;
