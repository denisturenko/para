import { Switch as SwitchBase, Input } from '@mantine/core';
import type { SwitchProps } from '@mantine/core';

export const Switch = (props: SwitchProps) => {
  const { label, ...other } = props;

  return (
    <Input.Wrapper label={label} style={{ wordBreak: 'no-wrap' }}>
      <SwitchBase {...other} style={{ height: '34px' }} />
    </Input.Wrapper>
  );
};
