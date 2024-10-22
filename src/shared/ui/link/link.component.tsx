import type { PropsWithChildren } from 'react';
import React, { useCallback } from 'react';
import { LinkStyled } from './link.styled';
import type { LinkProps } from 'react-router-dom';

interface IProps extends LinkProps {
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
