import { styled, useMediaQuery, useTheme } from '@mui/material';
import { PopUpToolbar } from '..';

export type TopToolbarProps = {
  children: (mode: 'mobile' | 'desktop') => JSX.Element;
};

const MobileTopToolbar = styled(PopUpToolbar)`
  border-radius: 10px;
  box-shadow: 2px 2px 10px 0px #0003;
  height: 44px;
`;

const DesktopTopToolbarWrap = styled('div')`
  display: flex;
  gap: 10px;
`;

export const TopToolbar = ({ children }: TopToolbarProps): JSX.Element => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const mode = isDesktop === true ? 'desktop' : 'mobile';

  const items = children(mode);

  if(mode === 'mobile') {
    return (
      <MobileTopToolbar mode='static' items={items} />
    );
  }

  if(mode === 'desktop') {
    return (
      <DesktopTopToolbarWrap>
        {items}
      </DesktopTopToolbarWrap>
    );
  }

  return mode;
};
