import { useEffect } from 'react';

export interface VisibilityProps {
  onVisible(flg: boolean): void;
}

export const Visibility = ({ onVisible }: VisibilityProps) => {
  useEffect(() => {
    onVisible(true);

    return () => onVisible(false);
  }, [onVisible]);

  return null;
};
