import { css, styled } from 'styled-components';

import { Box } from '@gravity-ui/uikit';

type Props = {
  isFile?: boolean;
};

export const Wrapper = styled(Box)<Props>`
  position: relative;
  display: flex;
  width: 30%;
  height: 80%;

  border-radius: 1rem;
  text-align: center;
  overflow: hidden;

  background-color: rgba(18, 58, 48, 0.2);
  box-shadow: 0 0 20px 5px rgba(227, 226, 226, 0.35);

  transition: all 0.2s ease;
  cursor: pointer;

  ${({ isFile }) =>
    !isFile &&
    css`
      border: 2px dashed transparent;
      &:hover {
        border: 2px dashed rgba(255, 255, 255, 0.75);
      }
    `};
`;
