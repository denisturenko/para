import styled from 'styled-components';
import { Input } from 'shared/ui/input';
import { Switch } from 'shared/ui/switch';
import { NumberInput } from 'shared/ui/number-input';

export const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeightInputStyled = styled(NumberInput)`
  width: 80px;
`;

export const SwitchStyled = styled(Switch)`
  width: 100px;
`;

export const ActionIconWrapperStyled = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: left;
`;
export const WindContainerStyled = styled.div`
  margin-bottom: 16px;
`;

export const GustsWrapperStyled = styled.div`
  width: 60px;
`;
