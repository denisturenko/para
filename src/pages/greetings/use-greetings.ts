import type { MutableRefObject } from 'react';
import { useCallback, useRef } from 'react';
import type { GreetingsFormMethods, GreetingsFormValues, GreetingsFormProps } from 'entities/ui/greetings-form';
import { useHistory } from 'react-router-dom';
import type { DrawerProps } from '@mantine/core';
import { useUserSettings } from 'shared/lib/hooks/use-user-settings';
import { urls } from 'entities/lib/config';

export interface GreetingsResult {
  ui: {
    drawer: Pick<DrawerProps, 'onClose' | 'onSubmit'>;
    form: Pick<GreetingsFormProps, 'initialValues' | 'onReset' | 'onSubmit'> & { ref: MutableRefObject<GreetingsFormMethods | undefined> };
  };
}

export const useGreetings = (): GreetingsResult => {
  const history = useHistory();

  const greetingsFormMethodsRef = useRef<GreetingsFormMethods>();

  const { userSettings, setUserSettings } = useUserSettings();

  const onCloseHandler = useCallback(() => history.push(urls.ROOT), [history]);

  const onSubmitDrawerHandler = useCallback(() => {
    greetingsFormMethodsRef.current?.submit();
  }, []);

  const onSubmitHandler = useCallback(
    (formValues: GreetingsFormValues) => {
      setUserSettings(formValues);

      history.replace(urls.GAME);
    },
    [history, setUserSettings]
  );

  return {
    ui: {
      drawer: {
        onClose: onCloseHandler,
        onSubmit: onSubmitDrawerHandler,
      },
      form: {
        ref: greetingsFormMethodsRef,
        initialValues: userSettings,
        onReset: onCloseHandler,
        onSubmit: onSubmitHandler,
      },
    },
  };
};
