import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Box } from './Box';

const bottomPx = 150;
const paddingPx = 16;

const Wrapper = styled('div')`
  position: fixed;
  bottom: ${bottomPx}px;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 9999999999;
  display: flex;
  flex-direction: column;

  max-width: 80svw;
  max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * paddingPx}px));

  border-radius: 20px;
  background: #0000000f;
  backdrop-filter: blur(38px);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 90svw;
    max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * 12}px));
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    max-width: 95svw;
    max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * 10}px));
    border-radius: 10px;
  }
`;

const Container = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 40px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${paddingPx}px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 24px;
    padding: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 10px;
  }
`;

type RootProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

const Root = ({ className, children, onClose }: RootProps & WithClassName) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onClose) return;

    // Handle ESC key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Handle click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <Container>
        {children}
      </Container>
    </Wrapper>
  );
};

type BlockProps = {
  title: string;
  icon: JSX.Element;
  lines: string[];
};

const StyledBlock = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 6px;
  }

  @media (max-width: 480px) {
    gap: 4px;
  }
`;

const List = styled('ul')`
  all: unset;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled('li')`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.7;
  letter-spacing: 0px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.4;
  }
`;

const TitleWithIcon = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 3px;
    
    & > svg {
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    gap: 2px;
    
    & > svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const Title = styled('span')(({ theme }) => css`
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  white-space: nowrap;
  color: ${theme.palette.text.secondary};

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 1.3;
  }
`);

const Block = ({ className, title, icon, lines }: BlockProps & WithClassName) => (
  <StyledBlock className={className}>
    <TitleWithIcon>
      {icon}
      <Title>{title}</Title>
    </TitleWithIcon>
    <List>
      {lines.map(e => <ListItem key={e}>{e}</ListItem>)}
    </List>
  </StyledBlock>
);

type CombineProps = {
  children: React.ReactNode;
};

const StyledCombineBox = styled('div')`
  display: contents;
`;

const Combine = ({ className, children }: CombineProps & WithClassName) => (
  <StyledCombineBox className={className}>
    {children}
  </StyledCombineBox>
);

export const AllHotkeysLegend = {
  Root,
  Block,
  Combine,
};

export type AllHotkeysLegendProps = {
  RootProps: RootProps;
  BlockProps: BlockProps;
  CombineProps: CombineProps;
};
