export type AlertType = 'error' | 'info' | 'warn';

export interface AlertProps {
  title?: string;
  type?: AlertType;
}
