import { Box } from '@gravity-ui/uikit';
import { motion } from 'framer-motion';
import { styled } from 'styled-components';

export const Wrapper = styled(motion.create(Box))`
  position: relative;
  display: flex;
  align-items: center;
  width: 50%;
  height: 80%;
  box-shadow: 0 0 20px 5px rgba(227, 226, 226, 0.35);

  border-radius: 0.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default Wrapper;
