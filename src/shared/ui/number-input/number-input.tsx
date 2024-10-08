import type { TextInputProps } from '@mantine/core';
import { NumberInput as NumberInputBase, Input } from '@mantine/core';

export type NumberInputProps = TextInputProps;

export const NumberInput = (props: NumberInputProps) => {
  const { label, ...other } = props;

  return (
    <Input.Wrapper label={label}>
      <NumberInputBase {...other} />
    </Input.Wrapper>
  );
};
