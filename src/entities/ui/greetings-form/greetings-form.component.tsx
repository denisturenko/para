import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import type { GreetingsFormValues, GreetingsFormMethods, GreetingsFormProps } from './greetings-form.types';
import { useForm } from '@mantine/form';
import { yupResolver } from 'mantine-form-yup-resolver';
import { Card } from 'shared/ui/card';
import { Switch } from 'shared/ui/switch';
import { greetingsFormValidationSchema } from './greetings-form.validation';
import { Alert } from 'shared/ui/alert';
import { defer } from 'lodash';
import { Input } from 'shared/ui/input';
import { Group } from '@mantine/core';

export const GreetingsForm = forwardRef((props: GreetingsFormProps, ref) => {
  const { onSubmit } = props;

  const form = useForm<GreetingsFormValues>({
    initialValues: props.initialValues,
    validate: yupResolver(greetingsFormValidationSchema),
  });

  const hasErrors = useMemo(() => Object.keys(form.errors).length > 0, [form.errors]);

  const alertRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      // todo ugly ugly next tick
      defer(() => alertRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }));

      return;
    }

    onSubmit?.(form.values);
  }, [form, onSubmit]);

  useImperativeHandle<GreetingsFormMethods>(ref, () => ({ submit: handleSubmit }), [handleSubmit]);

  return (
    <>
      {hasErrors && (
        <Alert ref={alertRef} dataTestId="error-block" title="Ошибка сохранения" type="error">
          Не удалось сохранить форму. Проверьте правильность введённых данных.
        </Alert>
      )}

      <Card>
        <Group gap="18px">
          <Input dataTestId="nickName" label="Ваше имя" placeholder="Введите ваше имя" {...form.getInputProps('nickName')} />
          <Switch
            dataTestId="isAgree"
            label="Я подтверждаю свое согласие с тем, что данный тренажер является лишь симуляцией, и в реальной жизни управление парашютом может существенно отличаться от представленного процесса"
            labelPosition="left"
            size="md"
            {...form.getInputProps('isAgree', {
              type: 'checkbox',
            })}
          />
        </Group>
      </Card>
    </>
  );
});

GreetingsForm.displayName = 'GreetingsForm';
