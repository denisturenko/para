import type { PropsWithChildren } from 'react';
import React from 'react';
import { ContainerStyled } from './section.styled';

interface IProps {
  className?: string;
  dataTestId: string;
  id?: string;
  ignoreBackgroundColor?: boolean;
}

export const Section: React.FC<PropsWithChildren<IProps>> = ({ dataTestId, id, className, ignoreBackgroundColor, children }) => (
  <ContainerStyled $ignoreBackgroundColor={ignoreBackgroundColor} className={className} data-testid={'section-' + dataTestId} id={id}>
    {children}
  </ContainerStyled>
);
