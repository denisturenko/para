import type { SliderProps } from '@mantine/core';
import { Slider as SliderBase, Input as InputBase } from '@mantine/core';
import { NumberInput } from 'shared/ui/number-input';
import { ContainerStyled, InputWrapperStyled, SliderWrapperStyled } from 'shared/ui/slider/slider.styled';

export const Slider = (props: SliderProps) => {
  const { label, ...other } = props;

  return (
    <ContainerStyled>
      <SliderWrapperStyled>
        <InputBase.Wrapper label={label}>
          <SliderBase tooltip={{ open: false }} {...other} />
        </InputBase.Wrapper>
      </SliderWrapperStyled>
      <InputWrapperStyled>
        <NumberInput {...other} size="xs" />
      </InputWrapperStyled>
    </ContainerStyled>
  );
};
