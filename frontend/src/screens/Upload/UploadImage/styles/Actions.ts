import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

export const Actions = styled(Box)`
  position: absolute;
  bottom: -5rem;
  right: 50%;

  transform: translateX(50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9f5f0;
  padding: 0.75rem;
  gap: 0.75rem;
  border-radius: 1rem;
`;
