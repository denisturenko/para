import type { TextInputProps } from '@mantine/core';
import { Input as InputBase } from '@mantine/core';

export const Input = (props: TextInputProps) => {
  const { label } = props;

  return (
    <InputBase.Wrapper label={label}>
      <InputBase {...props} />
    </InputBase.Wrapper>
  );
};
