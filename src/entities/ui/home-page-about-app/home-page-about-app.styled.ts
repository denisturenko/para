import { Section } from 'shared/ui/section';
import styled from 'styled-components';

export const ContainerStyled = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: var(--mantine-spacing-sm);

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: start;
  }
`;
