import React from 'react';
import { Drawer } from 'shared/ui/drawer';
import type { GreetingsFormValues } from 'entities/ui/greetings-form';
import { GreetingsForm } from 'entities/ui/greetings-form';
import { useGreetings } from 'pages/greetings/use-greetings';

export interface GreetingsProps {
  onSave?(initialValues: GreetingsFormValues): void;
  values: GreetingsFormValues;
}

export const Greetings = () => {
  const {
    ui: { form, drawer },
  } = useGreetings();

  return (
    <Drawer opened dataTestId="greetings" position="right" size="sm" title="" {...drawer}>
      <GreetingsForm {...form} />
    </Drawer>
  );
};
