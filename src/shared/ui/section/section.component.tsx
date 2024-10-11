import type { PropsWithChildren } from 'react';
import React from 'react';
import { ContainerStyled } from './section.styled';

interface IProps {
  className?: string;
  id?: string;
  ignoreBackgroundColor?: boolean;
}

export const Section: React.FC<PropsWithChildren<IProps>> = ({ id, className, ignoreBackgroundColor, children }) => (
  <ContainerStyled $ignoreBackgroundColor={ignoreBackgroundColor} className={className} id={id}>
    {children}
  </ContainerStyled>
);
