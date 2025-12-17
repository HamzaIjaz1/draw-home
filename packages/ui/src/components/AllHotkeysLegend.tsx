import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { Box } from './Box';

const bottomPx = 150;
const paddingPx = 16;

const Container = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 40px;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  position: fixed;
  bottom: ${bottomPx}px;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 9999999999;

  max-width: 80svw;
  max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * paddingPx}px));

  padding: ${paddingPx}px;
  border-radius: 20px;
  background: #0000000f;
  backdrop-filter: blur(38px);

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 18px 32px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px 24px;
    padding: 12px;
    max-width: 90svw;
    max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * 12}px));
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 10px;
    max-width: 95svw;
    max-height: min(80svh, calc(100svh - ${bottomPx}px - ${2 * 10}px));
    border-radius: 10px;
  }
`;

type RootProps = {
  children: React.ReactNode;
};

const Root = ({ className, children }: RootProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);

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
  font-size: 19px;
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
