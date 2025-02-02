import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

export const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-auto-columns: min-content;
  grid-auto-rows: min-content;
  gap: 1rem;
  width: 100%;
`;
