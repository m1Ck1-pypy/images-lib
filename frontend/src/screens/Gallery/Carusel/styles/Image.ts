import { Box } from '@gravity-ui/uikit';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

type Props = {
  image: string;
  size: 'cover' | 'contain';
  blur?: boolean;
};

export const Image = styled(motion.create(Box))<Props>`
  position: ${({ blur }) => (blur ? 'absolute' : 'relative')};
  width: 100%;
  height: 100%;
  background-image: ${({ image }) => `url(${image})`};
  background-size: ${({ size }) => size};
  background-position: center;
  background-repeat: no-repeat;

  filter: ${({ blur }) => (blur ? 'blur(10px)' : 'none')};
  cursor: grabbing;
`;
