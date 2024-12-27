import { styled } from 'styled-components';

import { Box } from '@gravity-ui/uikit';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.02);
  padding: 2rem;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
