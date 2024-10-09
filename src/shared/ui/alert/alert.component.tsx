import React, { forwardRef } from 'react';
import { Alert as AlertBase } from '@mantine/core';

import type { AlertProps } from './alert.types';
import { colorMapper } from './alert.constants';

export const Alert = forwardRef((props: React.PropsWithChildren<AlertProps>, ref) => {
  const { title, type = 'info', children } = props;

  return (
    <AlertBase ref={ref} color={colorMapper[type]} title={title}>
      {children}
    </AlertBase>
  );
});
Alert.displayName = 'Alert';
