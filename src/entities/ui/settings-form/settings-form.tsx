import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { Slider } from 'shared/ui/slider/slider';
import type { SettingsFormMethods, SettingsFormProps, SettingsFormValues } from './settings-form.types';
import { getInitialValues, normalized } from './settings-form.utils';
import { useForm } from '@mantine/form';
import { Button, Divider, ActionIcon, Grid, Group, Radio } from '@mantine/core';
import { ActionIconWrapperStyled, HeightInputStyled, LayoutStyled, WindContainerStyled } from './settings-form.styled';
import { yupResolver } from 'mantine-form-yup-resolver';
import { Card } from 'shared/ui/card';
import { Switch } from 'shared/ui/switch';
import { AiOutlineSound } from 'react-icons/ai';
import { BEEP, useBeep } from 'shared/lib/hooks';
import { IoCloseSharp } from 'react-icons/io5';
import { NumberInput } from 'shared/ui/number-input';
import { settingsFormValidationSchema } from './settings-form.validation';
import { Alert } from 'shared/ui/alert';
import { defer, uniqueId } from 'lodash';

export const SettingsForm = forwardRef((props: SettingsFormProps, ref) => {
  const { onSubmit, onReset } = props;

  const form = useForm<SettingsFormValues>({
    initialValues: getInitialValues(props),
    validate: yupResolver(settingsFormValidationSchema),
  });

  const hasErrors = useMemo(() => Object.keys(form.errors).length > 0, [form.errors]);

  const alertRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = useCallback(() => {
    if (form.validate().hasErrors) {
      // todo ugly ugly next tick
      defer(() => alertRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }));

      return;
    }

    onSubmit?.(normalized(form.values));
  }, [form, onSubmit]);

  useImperativeHandle<SettingsFormMethods>(ref, () => ({ submit: handleSubmit }), [handleSubmit]);

  const {
    winds,
    targets,
    beep: { volume },
  } = form.getValues();

  const { beep } = useBeep({ volume });

  return (
    <LayoutStyled>
      {hasErrors && (
        <Alert ref={alertRef} title="Ошибка сохранения" type="error">
          Не удалось сохранить форму. Проверьте правильность введённых данных.
        </Alert>
      )}
      <Card title="Основные">
        <LayoutStyled>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 6 }}>
              <Slider
                dataTestId="playerPositionHeight"
                label="Высота начала пилотирования"
                marks={[
                  { value: 0, label: '0' },
                  { value: 300, label: '300' },
                  { value: 600, label: '600' },
                  { value: 900, label: '900' },
                ]}
                max={900}
                min={0}
                {...form.getInputProps('playerPositionHeight')}
              />
            </Grid.Col>
          </Grid>
          <Radio.Group label="Зона приземления" {...form.getInputProps('currentTargetId')}>
            <Group mt="xs">
              {targets.map(target => (
                <Radio key={target.id} data-testid={`target-radio-${target.id}`} label={target.name} value={target.id} />
              ))}
            </Group>
          </Radio.Group>
        </LayoutStyled>
      </Card>

      <Card title="Ветер">
        {winds.map((wind, idx) => (
          <div key={wind.id || 0}>
            <WindContainerStyled>
              <Grid>
                <Grid.Col span={{ base: 4, xs: 2 }}>
                  <HeightInputStyled
                    disabled={!idx}
                    label="До высоты"
                    size="xs"
                    {...form.getInputProps(`winds.${idx}.minHeight`)}
                    key={form.key(`winds.${idx}.minHeight`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, xs: 9 }}>
                  <Switch
                    label="Порывы"
                    labelPosition="left"
                    size="md"
                    {...form.getInputProps(`winds.${idx}.hasGusts`, {
                      type: 'checkbox',
                    })}
                    key={form.key(`winds.${idx}.hasGusts`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 2, xs: 1 }}>
                  {idx !== 0 && (
                    <ActionIconWrapperStyled>
                      <ActionIcon variant="default" onClick={() => form.removeListItem('winds', idx)}>
                        <IoCloseSharp />
                      </ActionIcon>
                    </ActionIconWrapperStyled>
                  )}
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                  <Slider
                    label="Направление"
                    marks={[
                      { value: 0, label: '0' },
                      { value: 90, label: '90' },
                      { value: 180, label: '180' },
                      { value: 270, label: '270' },
                      { value: 360, label: '360' },
                    ]}
                    max={360}
                    min={0}
                    {...form.getInputProps(`winds.${idx}.angel`)}
                    key={form.key(`winds.${idx}.angel`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, xs: 6 }}>
                  <Slider
                    label="Скорость"
                    marks={[
                      { value: 0, label: '0' },
                      { value: 5, label: '5' },
                      { value: 10, label: '10' },
                      { value: 15, label: '15' },
                      { value: 20, label: '20' },
                    ]}
                    max={20}
                    min={0}
                    {...form.getInputProps(`winds.${idx}.speed`)}
                    key={form.key(`winds.${idx}.speed`)}
                  />
                </Grid.Col>
              </Grid>
            </WindContainerStyled>
            <Divider />
          </div>
        ))}

        <Button
          fullWidth={false}
          size="sm"
          variant="outline"
          onClick={() => {
            const prev = winds[winds.length - 1];
            const nextWindValue = { ...prev };

            nextWindValue.minHeight += 100;
            nextWindValue.id = uniqueId();
            form.insertListItem('winds', nextWindValue);
          }}
        >
          + Добавить ветер
        </Button>
      </Card>

      <Card title="Характеристики купола">
        <Grid>
          <Grid.Col span={{ base: 6, xs: 4 }}>
            <NumberInput label="Макс. горизонтальная" {...form.getInputProps('canopy.maxSpeed')} />
          </Grid.Col>
          <Grid.Col span={{ base: 6, xs: 4 }}>
            <NumberInput label="Мин. горизонтальная" {...form.getInputProps('canopy.minSpeed')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>
            <NumberInput label="Верт. скорость" {...form.getInputProps('canopy.verticalSpeed')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Slider
              label="Инертность"
              marks={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ]}
              max={5}
              min={1}
              {...form.getInputProps('canopy.inertiaFactor')}
            />
          </Grid.Col>
        </Grid>
      </Card>

      <Card title="Вспомогательное">
        <Grid>
          <Grid.Col span={{ base: 6, xs: 3 }}>
            <Switch
              label="Круги на поле"
              labelPosition="left"
              {...form.getInputProps('helpers.isVisibleCircles', {
                type: 'checkbox',
              })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, xs: 3 }}>
            <Switch
              label="Створ и траверзы"
              labelPosition="left"
              {...form.getInputProps('helpers.isVisibleCross', {
                type: 'checkbox',
              })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, xs: 3 }}>
            <Switch
              label="Тень внизу"
              labelPosition="left"
              {...form.getInputProps('helpers.isVisibleShadow', {
                type: 'checkbox',
              })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, xs: 3 }}>
            <Switch
              label="Пройденый путь"
              labelPosition="left"
              {...form.getInputProps('helpers.isVisibleTrack', {
                type: 'checkbox',
              })}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={{ base: 6, xs: 3 }}>
            <Switch
              label="Авто-отпускание строп управления"
              labelPosition="left"
              {...form.getInputProps('helpers.allowToggleReleasing', {
                type: 'checkbox',
              })}
            />
          </Grid.Col>
        </Grid>
      </Card>

      <Card title="Пищалка">
        <Slider
          label="Громкость"
          marks={[
            { value: 0, label: '0' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 75, label: '75' },
            { value: 100, label: '100' },
          ]}
          max={100}
          min={0}
          {...form.getInputProps('beep.volume')}
        />
        {[
          { type: BEEP.THREE, label: 'Три beep', key: 'heightFor3' },
          { type: BEEP.TWO, label: 'Два beep', key: 'heightFor2' },
          { type: BEEP.ONE, label: 'Один beep', key: 'heightFor1' },
          { type: BEEP.LONG, label: 'Длинный beep', key: 'heightForLong' },
        ].map(({ type, label, key }) => (
          <Grid key={key}>
            <Grid.Col span={{ base: 2, xs: 1 }}>
              <ActionIconWrapperStyled>
                <ActionIcon variant="default" onClick={() => beep(type)}>
                  <AiOutlineSound />
                </ActionIcon>
              </ActionIconWrapperStyled>
            </Grid.Col>
            <Grid.Col span={{ base: 4, xs: 2 }}>
              <Switch
                label={label}
                labelPosition="left"
                {...form.getInputProps(`beep.${key}.enable`, {
                  type: 'checkbox',
                })}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 4, xs: 2 }}>
              <NumberInput label="Высота" size="xs" {...form.getInputProps(`beep.${key}.value`)} />
            </Grid.Col>
          </Grid>
        ))}
      </Card>

      <br />
      <br />
      <Button data-testid="reset" size="md" variant="default" onClick={onReset}>
        Сбросить настройки
      </Button>
    </LayoutStyled>
  );
});

SettingsForm.displayName = 'SettingsForm';
