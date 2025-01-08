import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.02);
  text-align: center;

  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
