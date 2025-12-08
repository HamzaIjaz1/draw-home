import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import MuiList from '@mui/material/List';
import { MenuFrame } from '../MenuFrame';

const Container = styled('div')`
  position: relative;
`;

const Menu = styled(MenuFrame)(({ theme }) => css`
  width: 280px;
  padding: 0;

  position: absolute;
  top: 50%;
  right: 60px;
  transform: translateY(-50%);

  ${theme.breakpoints.up('md')} {
    right: 68px;
  }
`);

const List = styled(MuiList)`
  padding: 0;
`;

export type AnchoredMenuProps = {
  TriggerComp: JSX.Element;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const AnchoredMenu = ({
  className,
  TriggerComp,
  open,
  onClose,
  children,
}: AnchoredMenuProps & WithClassName) => (
  <ClickAwayListener onClickAway={onClose}>
    <Container className={className}>
      {TriggerComp}

      {open === true && (
        <Menu>
          <List>{children}</List>
        </Menu>
      )}
    </Container>
  </ClickAwayListener>
);
