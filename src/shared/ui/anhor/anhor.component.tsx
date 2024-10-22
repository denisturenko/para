import type { PropsWithChildren, AnchorHTMLAttributes } from 'react';
import React, { useCallback } from 'react';
import { AnhorStyled } from './anhor.styled';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  dataTestId: string;
  preventDefault?: boolean;
  variant?: 'button';
}

export const Anhor: React.FC<PropsWithChildren<IProps>> = ({ dataTestId, preventDefault, children, variant, ...rest }) => {
  const handleClickEye = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      rest.onClick?.(e);
      preventDefault && e.preventDefault();
    },
    [rest, preventDefault]
  );

  return (
    <AnhorStyled data-testid={dataTestId} {...rest} $variant={variant} onClick={handleClickEye}>
      {children}
    </AnhorStyled>
  );
};
