import { motion } from 'framer-motion';
import styled from 'styled-components';
import { menuFrameWidth } from '@draw-house/ui/dist/components/Menu/FloatingMenu';
import { mainScreenOverlayTopRightMenuGap } from '@draw-house/ui/dist/components/MainScreenOverlay/styles';

const Column = styled(motion.div)<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${p => p.$gap}px;
`;
const Row = styled(motion.div)`
  display: flex;
  gap: 8px;
`;
const CollapsibleRow = styled(motion.div)`
  overflow: hidden;
  display: flex;
  align-items: center;

  > * {
    width: 100%;
  }
`;
const IconButtonsWrapper = styled(motion.div)`
  margin: 4px;
  display: flex;
  gap: 15px;
`;
const FloatingMenuWrapper = styled(motion.div)`
  display: flex;
`;

export const Animations = {
  fromTop({ children }) {
    return (
      <motion.div
        initial={{ y: '-150%' }}
        animate={{ y: 0 }}
      >
        {children}
      </motion.div>
    );
  },
  fromBottom({ children }) {
    return (
      <motion.div
        initial={{ y: '150%' }}
        animate={{ y: 0 }}
      >
        {children}
      </motion.div>
    );
  },
  fromRight({ children }) {
    return (
      <Column
        $gap={8}
        initial={{ x: '150%' }}
        animate={{ x: 0 }}
      >
        {children}
      </Column>
    );
  },
  fromLeft({ children }) {
    return (
      <Row
        initial={{ x: '-150%' }}
        animate={{ x: 0 }}
      >
        {children}
      </Row>
    );
  },
  fade({ children }) {
    return (
      <Column
        $gap={30}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </Column>
    );
  },
  collapseRow({ children }) {
    return (
      <CollapsibleRow
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
      >
        {children}
      </CollapsibleRow>
    );
  },
  collapseBlock({ children }) {
    return (
      <CollapsibleRow
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
      >
        <div>{children}</div>
      </CollapsibleRow>
    );
  },
  collapseIconButtons({ children }) {
    return (
      <CollapsibleRow
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
      >
        <IconButtonsWrapper>
          {children}
        </IconButtonsWrapper>
      </CollapsibleRow>
    );
  },
  fadeComingSoon({ children }) {
    return (
      <motion.div
        style={{ height: '100%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.div>
    );
  },
  fadeCanvas({ children }) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {children}
      </motion.div>
    );
  },
  floatingMenu({ children }) {
    return (
      <FloatingMenuWrapper
        initial={{ width: 0, x: 100, padding: '0px 0px' }}
        animate={{ width: menuFrameWidth + mainScreenOverlayTopRightMenuGap, x: 0, padding: `0px ${mainScreenOverlayTopRightMenuGap / 2}px` }}
      >
        {children}
      </FloatingMenuWrapper>
    );
  },
} satisfies Record<string, React.FCWithChildren>;
