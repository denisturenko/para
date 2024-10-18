import { Button } from '@mantine/core';
import type { ContextModalProps } from '@mantine/modals';

interface ModalAlertProps {
  dataTestId: string;
  modalBody: string;
}

export const ModalAlert = ({ context, id, innerProps }: ContextModalProps<ModalAlertProps>) => (
  <>
    <div data-testid={'modal-body-' + innerProps.dataTestId}>{innerProps.modalBody}</div>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      Закрыть
    </Button>
  </>
);
