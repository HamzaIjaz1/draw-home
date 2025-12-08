import { WithClassName } from '@draw-house/common/dist/utils';
import { useState } from 'react';
import { isNull } from '@arthurka/ts-utils';
import { SideMenu, SideMenuProps } from '../SideMenu';
import {
  Content,
  DesktopPageTitle,
  MobileAppBar,
  PageBody,
} from '../CommonPageComponents';
import { Container, DesktopPageSubTitle, DesktopTitles } from './styles';

export type PageWithMenuProps = {
  pageTitle: string;
  pageSubTitle: null | string;
  user: SideMenuProps['user'];
  planBadgeText: SideMenuProps['planBadgeText'];
  guestProfileText: SideMenuProps['guestProfileText'];
  appName: SideMenuProps['appName'];
  appLogoLink: SideMenuProps['appLogoLink'];
  menuOptions: {
    accountOptions: SideMenuProps['accountOptions'];
    categoryOptions: SideMenuProps['categoryOptions'];
  };
  children: React.ReactNode;
};

export const PageWithMenu = ({
  className,
  pageTitle,
  pageSubTitle,
  appName,
  appLogoLink,
  menuOptions,
  planBadgeText,
  guestProfileText,
  user,
  children,
}: PageWithMenuProps & WithClassName) => {
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <Container className={className}>
      <SideMenu
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        user={user}
        accountOptions={menuOptions.accountOptions}
        categoryOptions={menuOptions.categoryOptions}
        appName={appName}
        appLogoLink={appLogoLink}
        planBadgeText={planBadgeText}
        guestProfileText={guestProfileText}
      />

      <PageBody>
        <MobileAppBar
          pageTitle={pageTitle}
          onOpenSideMenu={() => setOpenMobile(true)}
        />
        <Content>
          <DesktopTitles>
            <DesktopPageTitle>{pageTitle}</DesktopPageTitle>
            {!isNull(pageSubTitle) && (
              <DesktopPageSubTitle>{pageSubTitle}</DesktopPageSubTitle>
            )}
          </DesktopTitles>
          {children}
        </Content>
      </PageBody>
    </Container>
  );
};
