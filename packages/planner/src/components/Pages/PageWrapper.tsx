import { Dialog, DialogActions, PageWithMenu } from '@draw-house/ui/dist/components/Hub';
import { useState } from 'react';
import { LANDING_PAGE_URL, NODE_ENV, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { loginSearchParam } from '@draw-house/common/dist/constants';
import { useAppPage, useUser } from '../../zustand';
import { lang } from '../../lang';
import { apiUrls } from '../../services';
import { usePaidPlan } from '../../customHooks';

export const PageWrapper: React.FCWithChildren = ({ children }) => {
  const { user } = useUser();
  const { appPage } = useAppPage();
  const [confirmLogoutDialog, setConfirmLogoutDialog] = useState(false);
  const { plan } = usePaidPlan();

  assert(!isNull(appPage) && appPage !== 'loading' && appPage !== 'planner' && appPage !== 'initial-settings', 'Something went wrong. |y5mwe9|');

  const pageTitles = {
    'my-projects': lang.cabinet.myProjects,
    'my-team': lang.cabinet.myTeam,
    billing: lang.cabinet.billing,
    support: lang.cabinet.support,
    account: lang.cabinet.account,
  } as const satisfies Record<typeof appPage, string>;

  const pageSubTitles: Record<typeof appPage, null | string> = {
    'my-projects': null,
    'my-team': null,
    billing: lang.cabinet.billingSubtitle,
    support: null,
    account: null,
  };

  return !isNull(user) && (
    <>
      <PageWithMenu
        pageTitle={pageTitles[appPage]}
        pageSubTitle={pageSubTitles[appPage]}
        appName='DrawHome'
        appLogoLink={LANDING_PAGE_URL}
        user={user === 'guest' ? null : {
          name: !isNull(user.fullName) ? user.fullName : user.username,
          email: user.email,
          avatar: isNull(user.avatar) ? user.avatarExternal : user.avatar,
        }}
        guestProfileText={lang.cabinet.guestProfile}
        planBadgeText={isNull(plan) ? lang.paymentPlans.free.title : plan.label}
        menuOptions={{
          categoryOptions: [
            {
              title: lang.cabinet.myProjects,
              icon: 'projects',
              state: appPage === 'my-projects' ? 'active' : 'default',
              onClick() {
                useAppPage.setState({ appPage: 'my-projects' });
              },
            },
            {
              title: lang.cabinet.myTeam,
              icon: 'team',
              state: appPage === 'my-team' ? 'active' : 'default',
              onClick() {
                useAppPage.setState({ appPage: 'my-team' });
              },
            },
            {
              title: lang.cabinet.billing,
              icon: 'coin',
              state: appPage === 'billing' ? 'active' : 'default',
              onClick() {
                useAppPage.setState({ appPage: 'billing' });
              },
            },
            {
              title: lang.cabinet.support,
              icon: 'questionMark',
              state: appPage === 'support' ? 'active' : 'default',
              onClick() {
                useAppPage.setState({ appPage: 'support' });
              },
            },
          ],
          accountOptions: (
            user === 'guest'
              ? [
                {
                  title: lang.cabinet.signup,
                  icon: 'person',
                  href: `${NODE_ENV === 'production' ? PLANNER_URL : LANDING_PAGE_URL}/login?${loginSearchParam}`,
                },
              ]
              : [
                {
                  title: lang.cabinet.account,
                  icon: 'person',
                  onClick() {
                    useAppPage.setState({ appPage: 'account' });
                  },
                },
                {
                  title: lang.cabinet.logout,
                  icon: 'logout',
                  onClick() {
                    setConfirmLogoutDialog(true);
                  },
                },
              ]
          ),
        }}
      >
        {children}
      </PageWithMenu>
      <Dialog
        open={confirmLogoutDialog}
        title={lang.cabinet.sureForLogout}
        onClose={() => {
          setConfirmLogoutDialog(false);
        }}
      >
        <DialogActions
          primaryActionText={lang.confirm}
          onPrimaryAction={() => {
            setConfirmLogoutDialog(false);
            window.location.href = apiUrls.user.logout;
          }}
          secondaryActionText={lang.cancel}
          onSecondaryAction={() => {
            setConfirmLogoutDialog(false);
          }}
        />
      </Dialog>
    </>
  );
};
