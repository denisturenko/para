import type { AlertType } from './alert.types';

export const colorMapper: Record<AlertType, string> = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
};
