import { Card as CardBase, Image as ImageBase } from '@mantine/core';
import type { ReactNode } from 'react';
import { DescriptionStyled, SectionStyled, TitleStyled, TitleWrapperStyled } from './card2.styled';

interface CardProps {
  img?: ReactNode;
  imgHeight?: number;
  items?: Array<{
    description: ReactNode;
    title: ReactNode;
  }>;
  title?: ReactNode;
}

export const Card2 = (props: CardProps) => {
  const { items = [], imgHeight = 160, img, title } = props;

  return (
    <CardBase withBorder padding="lg" radius="md" shadow="sm">
      {title && <TitleWrapperStyled>{title}</TitleWrapperStyled>}

      {img && (
        <CardBase.Section>
          <ImageBase alt="" fit="contain" h={imgHeight} src={img} />
        </CardBase.Section>
      )}

      {items.map(item => (
        <SectionStyled key={item.title}>
          <TitleStyled>{item.title}</TitleStyled>
          <DescriptionStyled>{item.description}</DescriptionStyled>
        </SectionStyled>
      ))}
    </CardBase>
  );
};
