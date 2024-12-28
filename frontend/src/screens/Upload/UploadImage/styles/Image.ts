import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

type Props = {
  image: string;
  imageSize?: { width: number; height: number };
};

export const Image = styled(Box)<Props>`
  width: 100%;
  height: 100%;

  background-image: ${({ image }) => `url(${image})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
