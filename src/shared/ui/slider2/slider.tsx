import { Space, Button, Flex, Form, Slider as SliderBase, Col, Row, InputNumber } from 'antd';
import { useCallback } from 'react';
import type { SliderBaseProps } from 'antd/es/slider';

interface SettingsFormProps {
  onChange?(): void;
}

export const Slider = (props: SliderBaseProps) => (
  <Row>
    <Col sm={{ span: 22 }} xs={{ span: 20 }}>
      <SliderBase tooltip={{ open: false }} {...props} />
    </Col>
    <Col sm={{ span: 2 }} xs={{ span: 4 }}>
      <InputNumber {...props} style={{ margin: '0 8px', width: '50px' }} />
    </Col>
  </Row>
);
