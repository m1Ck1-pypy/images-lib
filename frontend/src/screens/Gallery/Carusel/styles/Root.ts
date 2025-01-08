import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

export const Root = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  width: 100%;
  height: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;
