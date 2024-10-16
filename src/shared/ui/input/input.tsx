import type { TextInputProps } from '@mantine/core';
import { Input as InputBase } from '@mantine/core';

export const Input = (props: TextInputProps) => {
  const { label, error } = props;

  return (
    <InputBase.Wrapper error={error} label={label}>
      <InputBase {...props} />
    </InputBase.Wrapper>
  );
};
