import { useCallback } from 'react';
import type { SliderProps } from '@mantine/core';
import { Grid, Slider as SliderBase, Input as InputBase } from '@mantine/core';
import { Input } from 'shared/ui/input';
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
        <Input {...other} size="xs" />
      </InputWrapperStyled>
    </ContainerStyled>
  );
};
