import styled from 'styled-components';
import { Group, Card as CardBase, Image as ImageBase } from '@mantine/core';

export const TitleWrapperStyled = styled(CardBase.Section)`
  padding-left: var(--mantine-spacing-md);
  font-size: 20px;

  @media (min-width: 800px) {
    font-size: 22px;
  }
`;

export const SectionStyled = styled(CardBase.Section)`
  margin-top: var(--mantine-spacing-sm);

  border-bottom: rem(1px) solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4));
  padding-left: var(--mantine-spacing-md);
  padding-right: var(--mantine-spacing-md);
  padding-bottom: var(--mantine-spacing-md);
`;
export const TitleStyled = styled.div`
  font-size: 18px;

  @media (min-width: 800px) {
    font-size: 18px;
  }
`;
export const DescriptionStyled = styled.div`
  color: var(--mantine-color-gray-text);
  opacity: 0.75;

  @media (min-width: 800px) {
    font-size: 16px;
  }
`;
