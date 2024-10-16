import type { TextInputProps } from '@mantine/core';
import { Input as InputBase } from '@mantine/core';

interface InputProps extends TextInputProps {
  dataTestId: string;
}

export const Input = (props: InputProps) => {
  const { label, error, dataTestId, ...other } = props;

  return (
    <InputBase.Wrapper data-testid={'wrapper-' + dataTestId} error={error} label={label}>
      <InputBase data-testid={'input-' + dataTestId} {...other} />
    </InputBase.Wrapper>
  );
};
