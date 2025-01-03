import { Box } from '@gravity-ui/uikit';
import { styled } from 'styled-components';

type Props = {
  arrow: string;
};

export const Arrow = styled(Box)<Props>`
  width: 100px;
  height: 20rem;
  background-image: ${({ arrow }) => `url(${arrow})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  cursor: pointer;
`;
