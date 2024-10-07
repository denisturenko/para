import type { TextInputProps } from '@mantine/core';
import { NumberInput as NumberInputBase, Input } from '@mantine/core';

export const NumberInput = (props: TextInputProps) => {
  const { label, ...other } = props;

  return (
    <Input.Wrapper label={label}>
      <NumberInputBase {...other} />
    </Input.Wrapper>
  );
};
