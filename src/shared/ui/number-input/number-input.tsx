import type { TextInputProps } from '@mantine/core';
import { NumberInput as NumberInputBase, Input } from '@mantine/core';

interface NumberInputProps extends TextInputProps {
  dataTestId: string;
}

export const NumberInput = (props: NumberInputProps) => {
  const { label, dataTestId, ...other } = props;

  return (
    <Input.Wrapper data-testid={'wrapper-' + dataTestId} label={label}>
      <NumberInputBase data-testid={'input-' + dataTestId} {...other} />
    </Input.Wrapper>
  );
};
