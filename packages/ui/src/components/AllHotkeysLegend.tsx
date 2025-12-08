import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { Box } from './Box';

const bottomPx = 150;
const paddingPx = 16;

const Container = styled('div')`
  display: inline-flex;
  align-items: flex-start;
  gap: 80px;
  overflow: auto;

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
  backdrop-filter: blur(10px);
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
`;

const TitleWithIcon = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const Title = styled('span')(({ theme }) => css`
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  white-space: nowrap;
  color: ${theme.palette.text.secondary};
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

const Combine = ({ className, children }: CombineProps & WithClassName) => (
  <Box className={className} column gap={20}>
    {children}
  </Box>
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
