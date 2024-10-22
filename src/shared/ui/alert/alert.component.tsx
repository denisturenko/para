import React, { forwardRef } from 'react';
import { Alert as AlertBase } from '@mantine/core';

import type { AlertProps as AlertPropsBase } from './alert.types';
import { colorMapper } from './alert.constants';

interface AlertProps extends AlertPropsBase {
  dataTestId: string;
}

export const Alert = forwardRef((props: React.PropsWithChildren<AlertProps>, ref) => {
  const { title, type = 'info', dataTestId, children } = props;

  return (
    <AlertBase ref={ref} color={colorMapper[type]} data-testid={'alert-' + dataTestId} title={title}>
      {children}
    </AlertBase>
  );
});
Alert.displayName = 'Alert';
