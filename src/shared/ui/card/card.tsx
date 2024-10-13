import { Group, Card as CardBase, Image as ImageBase } from '@mantine/core';
import type { PropsWithChildren, ReactNode } from 'react';

interface CardProps {
  img?: ReactNode;
  title: ReactNode;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { title, img, children } = props;

  return (
    <CardBase withBorder radius="md" shadow="sm">
      {img && (
        <CardBase.Section>
          <ImageBase alt="" h={160} src={img} />
        </CardBase.Section>
      )}

      <CardBase.Section inheritPadding withBorder py="xs">
        <Group justify="space-between">{title}</Group>
      </CardBase.Section>

      {children}
    </CardBase>
  );
};
