import { Slider as SliderBase, Input as InputBase } from '@mantine/core';
import type { NumberInputProps } from 'shared/ui/number-input';
import { NumberInput } from 'shared/ui/number-input';
import { ContainerStyled, InputWrapperStyled, SliderWrapperStyled } from 'shared/ui/slider/slider.styled';

export const Slider = (props: NumberInputProps) => {
  const { label, error, ...other } = props;

  return (
    <ContainerStyled>
      <SliderWrapperStyled>
        <InputBase.Wrapper error={error} label={label}>
          <SliderBase tooltip={{ open: false }} {...other} />
        </InputBase.Wrapper>
      </SliderWrapperStyled>
      <InputWrapperStyled>
        <NumberInput {...other} size="xs" />
      </InputWrapperStyled>
    </ContainerStyled>
  );
};
