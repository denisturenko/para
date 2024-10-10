import type { DrawerProps as DrawerPropsBase } from '@mantine/core';
import { Drawer as DrawerBase, Button, Group } from '@mantine/core';

interface DrawerProps extends DrawerPropsBase {
  onSubmit?(): void;
}

export const Drawer = (props: DrawerProps) => {
  const { title, children, onSubmit, withCloseButton, ...other } = props;

  return (
    <DrawerBase.Root {...other}>
      <DrawerBase.Overlay />
      <DrawerBase.Content>
        {(title || withCloseButton || onSubmit) && (
          <DrawerBase.Header>
            <DrawerBase.Title>{title}</DrawerBase.Title>

            {onSubmit ? (
              <Group gap="lg">
                <Button data-testid="cancel" size="md" variant="default" onClick={props.onClose}>
                  Отмена
                </Button>
                <Button data-testid="submit" size="md" variant="filled" onClick={onSubmit}>
                  Сохранить
                </Button>
              </Group>
            ) : (
              withCloseButton && <DrawerBase.CloseButton />
            )}
          </DrawerBase.Header>
        )}
        <DrawerBase.Body style={{ paddingTop: '8px' }}>{children}</DrawerBase.Body>
      </DrawerBase.Content>
    </DrawerBase.Root>
  );
};
