import type { DrawerProps } from 'antd';
import { Drawer as DrawerBase } from 'antd';
import type { DrawerStyles } from 'antd/lib/drawer/DrawerPanel';

const drawerStyles: DrawerStyles = {
  mask: {
    backdropFilter: 'blur(10px)',
  },
};

export const Drawer = (props: DrawerProps) => (
  <DrawerBase styles={drawerStyles} {...props}>
    {props.children}
  </DrawerBase>
);
