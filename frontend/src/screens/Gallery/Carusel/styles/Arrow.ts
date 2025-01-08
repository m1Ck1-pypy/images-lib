import { styled } from 'styled-components';

type Props = {
  arrow: string;
};

export const Arrow = styled('div')<Props>`
  width: 3rem;
  height: 20rem;
  background-image: ${({ arrow }) => `url(${arrow})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;
