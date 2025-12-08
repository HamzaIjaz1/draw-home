import { useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { MenuCategories, MenuCategoriesProps } from '../MenuCategories';
import { MenuAccountProps } from '../MenuAccount';
import {
  Container,
  DesktopDrawer,
  IconButton,
  MobileDrawer,
  MobileWrap,
  StyledMenuAccount,
  VerticalBar,
} from './styles';

export type SideMenuProps = {
  appName: MenuCategoriesProps['appName'];
  categoryOptions: MenuCategoriesProps['options'];
  accountOptions: MenuAccountProps['options'];
  planBadgeText: MenuAccountProps['planBadgeText'];
  user: MenuAccountProps['user'];
  guestProfileText: MenuAccountProps['guestProfileText'];
  openMobile: boolean;
  appLogoLink: string;
  setOpenMobile: (e: boolean) => void;
};

export const SideMenu = ({
  appName,
  categoryOptions,
  accountOptions,
  planBadgeText,
  user,
  guestProfileText,
  openMobile,
  appLogoLink,
  setOpenMobile,
}: SideMenuProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if(isDesktop === true && openMobile === true) {
      setOpenMobile(false);
    }
  }, [isDesktop, openMobile, setOpenMobile]);

  const closeMobileDrawer = () => setOpenMobile(false);

  const menuJsx = (
    <Container>
      <MenuCategories
        appName={appName}
        options={categoryOptions}
        appLogoLink={appLogoLink}
        closeMenu={closeMobileDrawer}
      />
      <StyledMenuAccount
        user={user}
        planBadgeText={planBadgeText}
        options={accountOptions}
        guestProfileText={guestProfileText}
        closeMenu={closeMobileDrawer}
      />
    </Container>
  );

  return (
    <>
      <DesktopDrawer variant='permanent' anchor='left'>
        {menuJsx}
      </DesktopDrawer>

      <MobileDrawer
        variant='temporary'
        anchor='left'
        open={openMobile}
      >
        <ClickAwayListener onClickAway={closeMobileDrawer}>
          <MobileWrap>
            {menuJsx}
            <VerticalBar>
              <IconButton
                icon='close'
                size='md'
                variant='text'
                onClick={closeMobileDrawer}
              />
            </VerticalBar>
          </MobileWrap>
        </ClickAwayListener>
      </MobileDrawer>
    </>
  );
};
