import { ContainerStyled, IntroPanelStyled, PanelStyled } from './setting-panel.styled';

import { Drawer } from 'antd';

export const SettingsPanel = () => (
  <ContainerStyled>
    <Drawer open size="large" title="Basic Drawer" onClose={() => {}}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </ContainerStyled>
);
