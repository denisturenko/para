import type { PropsWithChildren, AnchorHTMLAttributes } from 'react';
import React, { useCallback } from 'react';
import { LinkStyled } from './link.styled';

interface IProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  dataTestId: string;
  preventDefault?: boolean;
  variant?: 'button';
}

export const Link: React.FC<PropsWithChildren<IProps>> = ({ dataTestId, preventDefault, children, variant, ...rest }) => {
  const handleClickEye = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      rest.onClick?.(e);
      preventDefault && e.preventDefault();
    },
    [rest, preventDefault]
  );

  return (
    <LinkStyled data-testid={dataTestId} {...rest} $variant={variant} onClick={handleClickEye}>
      {children}
    </LinkStyled>
  );
};
