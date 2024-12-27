import { styled } from 'styled-components';
import { Icon as GIcon } from '@gravity-ui/uikit';

type Props = {
  isOpen: boolean;
  index: number;
};

export const Icon = styled(GIcon)<Props>`
  cursor: pointer;

  /* display: ${({ isOpen, index }) => (!isOpen && index !== 0 ? 'none' : 'block')}; */
`;
