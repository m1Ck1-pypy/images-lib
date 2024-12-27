import { styled } from 'styled-components';
import { Box } from '@gravity-ui/uikit';

type Props = {
  image: string;
};

export const Image = styled(Box)<Props>`
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  aspect-ratio: 1;

  transition: all 0.25s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(13, 41, 25, 0.9);
    transform: scale(1.25);
    z-index: 10;
    background-size: contain;
  }
`;
