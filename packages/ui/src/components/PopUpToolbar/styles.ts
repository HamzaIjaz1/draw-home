import { css, styled } from '@mui/material';
import { motion } from 'framer-motion';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { MenuFrame } from '../MenuFrame';
import { createStyledOptions } from '../../utils/createStyledOptions';
import type { PopUpToolbarProps } from '.';

export const Anchor = styled('div')`
  position: fixed;
  z-index: ${specialZIndexTop};
  cursor: grab;

  * {
    :active {
      user-drag: none;
      -webkit-user-drag: none
    }
  }
`;

type ContainerProps = {
  orientation: NonNullable<PopUpToolbarProps['orientation']>;
  mode: NonNullable<PopUpToolbarProps['mode']>;
};
const ContainerOptions = createStyledOptions<ContainerProps>({
  orientation: true,
  mode: true,
});
export const Container = styled(MenuFrame, ContainerOptions)<ContainerProps>(({ orientation, mode }) => css`
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 4px;
  flex-wrap: wrap;
  width: max-content;

  box-shadow: 2px 2px 10px 0px #0000004d;
  border-radius: 20px;

  ${orientation === 'vertical' && css`
    flex-direction: column;
    height: fit-content;
  `}
  ${mode === 'floating' && css`
    position: absolute;
    left: 0px;
    top: 0px;
  `}
`);

export const ExpandableItemsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;
