import { Space, Button, Flex, Form, Col, Row, InputNumber, Card, Switch } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import { useCallback } from 'react';
import { Slider } from 'shared/ui/slider/slider';
import type { SettingsFormProps, SettingsFormValues } from './settings-form.types';
import { getInitialValues, normalized } from './settings-form.utils';

// todo validation
export const SettingsForm = (props: SettingsFormProps) => {
  const { onChange } = props;

  const [form] = Form.useForm();

  const onFieldsChangeHandler = useCallback(() => {
    const normalizedValues = normalized(form.getFieldsValue());

    onChange?.(normalizedValues);
  }, [form, onChange]);

  return (
    <Form<SettingsFormValues>
      disabled={false}
      form={form}
      initialValues={getInitialValues(props)}
      labelCol={{ span: 6 }}
      layout="horizontal"
      wrapperCol={{ span: 18 }}
      onFieldsChange={onFieldsChangeHandler}
    >
      <Card size="small" title={'Основные'}>
        <Row>
          <Col sm={{ span: 12, order: 1 }} xs={{ span: 24, order: 1 }}>
            <Form.Item label="Высота начала пилотирования" labelCol="24" layout="vertical" name={['playerPositionHeight']}>
              <Slider marks={{ 0: 0, 300: 300, 600: 600, 900: 900 }} max={900} min={0} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <br />

      <Form.List name="winds">
        {(fields, { add, remove }, { errors }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field, index) => (
              <Card
                key={field.key}
                extra={
                  index !== 0 && (
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  )
                }
                size="small"
                title={`Ветер ${field.name + 1}`}
              >
                <Row>
                  <Col sm={{ span: 4, order: 1 }} xs={{ span: 12, order: 1 }}>
                    <Form.Item label="До высоты" labelCol="24" layout="vertical" name={[field.name, 'minHeight']}>
                      <InputNumber disabled={!index} max={800} min={0} style={{ marginBottom: '16px', marginRight: '16px' }} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 9, order: 2 }} xs={{ span: 24, order: 3 }}>
                    <Form.Item label="Направление" labelCol="24" layout="vertical" name={[field.name, 'angel']}>
                      <Slider marks={{ 0: 0, 90: 90, 180: 180, 270: 270, 360: 360 }} max={360} min={0} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 9, order: 3 }} xs={{ span: 24, order: 4 }}>
                    <Form.Item label="Скорость" labelCol="24" layout="vertical" name={[field.name, 'speed']}>
                      <Slider marks={{ 0: 0, 5: 5, 10: 10, 15: 15, 20: 20 }} max={20} min={0} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 2, order: 4 }} xs={{ span: 12, order: 2 }}>
                    <Form.Item label="Порывы" labelCol="24" layout="vertical" name={[field.name, 'hasGusts']}>
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}
            <Button
              type="dashed"
              onClick={() => {
                const values = form.getFieldsValue();
                const nextWindValue = { ...values.winds[values.winds.length - 1] };

                nextWindValue.minHeight += 100;
                add(nextWindValue);
              }}
            >
              + Добавить ветер
            </Button>
          </div>
        )}
      </Form.List>

      <br />
      <Card size="small" title={'Характеристики купола'}>
        <Row>
          <Col sm={{ span: 4, order: 1 }} xs={{ span: 9, order: 1 }}>
            <Form.Item label="Верт. скорость" labelCol="24" layout="vertical" name={['canopy', 'verticalSpeed']}>
              <InputNumber max={800} min={0} style={{ marginBottom: '16px', marginRight: '16px' }} />
            </Form.Item>
          </Col>
          <Col sm={{ span: 6, order: 2 }} xs={{ span: 15, order: 2 }}>
            <Form.Item label="Макс. горизонтальная" labelCol="24" layout="vertical" name={['canopy', 'maxSpeed']}>
              <InputNumber max={800} min={0} style={{ marginBottom: '16px', marginRight: '16px' }} />
            </Form.Item>
          </Col>
          <Col sm={{ span: 6, order: 3 }} xs={{ span: 24, order: 3 }}>
            <Form.Item label="Мин. горизонтальная" labelCol="24" layout="vertical" name={['canopy', 'minSpeed']}>
              <InputNumber max={800} min={0} style={{ marginBottom: '16px', marginRight: '16px' }} />
            </Form.Item>
          </Col>
          <Col sm={{ span: 8, order: 4 }} xs={{ span: 15, order: 4 }}>
            <Form.Item label="Инертность" labelCol="24" layout="vertical" name={['canopy', 'inertiaFactor']}>
              <Slider marks={{ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }} max={5} min={1} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <br />

      <Card size="small" title={'Помощь'}>
        <Row>
          <Col sm={{ span: 4, order: 1 }} xs={{ span: 9, order: 1 }}>
            <Form.Item label="Круги на поле" labelCol="24" layout="vertical" name={['helper', 'isVisibleCircles']}>
              <Switch />
            </Form.Item>
          </Col>
          <Col sm={{ span: 6, order: 2 }} xs={{ span: 15, order: 2 }}>
            <Form.Item label="Створ и траверзы" labelCol="24" layout="vertical" name={['helper', 'isVisibleCross']}>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};
