import { Switch as SwitchBase, Input } from '@mantine/core';
import type { SwitchProps as SwitchPropsBase } from '@mantine/core';

interface SwitchProps extends SwitchPropsBase {
  dataTestId: string;
}

export const Switch = (props: SwitchProps) => {
  const { label, dataTestId, ...other } = props;

  return (
    <Input.Wrapper data-testid={'wrapper-' + dataTestId} label={label} style={{ wordBreak: 'no-wrap' }}>
      <SwitchBase data-testid={'switch-' + dataTestId} {...other} style={{ height: '34px' }} />
    </Input.Wrapper>
  );
};
