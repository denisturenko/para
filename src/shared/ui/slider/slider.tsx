import { Slider as SliderBase, Input as InputBase } from '@mantine/core';
import type { NumberInputProps } from 'shared/ui/number-input';
import { NumberInput } from 'shared/ui/number-input';
import { ContainerStyled, InputWrapperStyled, SliderWrapperStyled } from 'shared/ui/slider/slider.styled';

interface SliderProps extends NumberInputProps {
  dataTestId?: string;
}

export const Slider = (props: SliderProps) => {
  const { label, error, dataTestId = '', ...other } = props;

  return (
    <ContainerStyled data-testid={dataTestId}>
      <SliderWrapperStyled>
        <InputBase.Wrapper error={error} label={label}>
          <SliderBase tooltip={{ open: false }} {...other} />
        </InputBase.Wrapper>
      </SliderWrapperStyled>
      <InputWrapperStyled>
        <NumberInput data-testid={`${dataTestId}-input`} {...other} size="xs" />
      </InputWrapperStyled>
    </ContainerStyled>
  );
};
