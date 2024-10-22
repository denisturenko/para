import type { PropsWithChildren } from 'react';
import React from 'react';
import { ContainerStyled } from './visibility-wrapper.styled';

export interface VisibilityWrapperProps {
  isVisible?: boolean;
}

export const VisibilityWrapper = ({ isVisible, children }: PropsWithChildren<VisibilityWrapperProps>) => (
  <ContainerStyled $isVisible={isVisible}>{isVisible !== undefined && children}</ContainerStyled>
);
