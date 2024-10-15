import React, { useCallback, memo, useRef } from 'react';
import { Drawer } from 'shared/ui/drawer';
import type { GreetingsFormMethods, GreetingsFormValues } from 'entities/ui/greetings-form';
import { GreetingsForm } from 'entities/ui/greetings-form';

export interface GreetingsProps {
  isOpen?: boolean;
  onCancel?(): void;
  onSave?(initialValues: GreetingsFormValues): void;
  values: GreetingsFormValues;
}

export const Greetings = memo((props: GreetingsProps) => {
  const { values, isOpen, onSave, onCancel } = props;

  const greetingsFormMethodsRef = useRef<GreetingsFormMethods>();

  const onCloseHandler = useCallback(() => onCancel?.(), [onCancel]);

  const onSubmitDrawerHandler = useCallback(() => {
    greetingsFormMethodsRef.current?.submit();
  }, []);

  const onSubmitHandler = useCallback(
    (formValues: GreetingsFormValues) => {
      onSave?.(formValues);
    },
    [onSave]
  );

  return (
    <>
      {/* Greetings form drawer */}
      <Drawer opened={isOpen} position="right" size="sm" title="" onClose={onCloseHandler} onSubmit={onSubmitDrawerHandler}>
        <GreetingsForm ref={greetingsFormMethodsRef} initialValues={values} onReset={onCloseHandler} onSubmit={onSubmitHandler} />
      </Drawer>
    </>
  );
});
Greetings.displayName = 'Greetings';
