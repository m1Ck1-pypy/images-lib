import { styled } from 'styled-components';
import { Box } from '@gravity-ui/uikit';

export const GridWrapper = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  grid-auto-rows: min-content;
  gap: 1rem;
  width: 100%;
`;
