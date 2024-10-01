import { Group, Card as CardBase } from '@mantine/core';
import type { PropsWithChildren, ReactNode } from 'react';

interface CardProps {
  title: ReactNode;
}

export const Card = (props: PropsWithChildren<CardProps>) => {
  const { title, children } = props;

  return (
    <CardBase withBorder radius="md" shadow="sm">
      <CardBase.Section inheritPadding withBorder py="xs">
        <Group justify="space-between">{title}</Group>
      </CardBase.Section>

      {children}
    </CardBase>
  );
};
