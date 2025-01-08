import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

type Props = {
  isOpen: boolean;
};

export const Root = styled(Box)<Props>`
  position: absolute;
  bottom: 5rem;
  left: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.18);
  border-radius: 0.5rem;

  width: ${({ isOpen }) => (isOpen ? '10rem' : '3.8rem')};
  transition: width 0.25s ease-in-out;

  @media (max-width: 768px) {
    left: 1rem;
  }
`;
