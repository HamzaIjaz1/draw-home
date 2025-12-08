import { BillingContent, BillingCurrentPlanContent, BillingCurrentPlanContentProps, BillingDividerBlock, BillingIsle, BillingIsles, BillingIsleTitle, BillingSection, BillingSectionTitle, BillingUsageSummaries, BillingUsageSummary, Isle, LogInSuggestion } from '@draw-house/ui/dist/components/Hub';
import formatBytes from 'pretty-bytes';
import { getNotNull, isNull, isUndefined } from '@arthurka/ts-utils';
import { LANDING_PAGE_URL, NODE_ENV, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { loginSearchParam } from '@draw-house/common/dist/constants';
import { useEffect } from 'react';
import { fixIEEE } from '@draw-house/common/dist/utils';
import { CenterWrapper } from '@draw-house/ui/dist/components';
import { CircularProgress } from '@mui/material';
import { lang } from '../../../lang';
import { useUserResolved } from '../../../zustand';
import { Animations } from '../../animations';
import { isResolved } from '../../../utils/isResolved';
import { usePaidPlan } from '../../../customHooks';
import { requestToLoadStorageUsage, useStorageUsage } from '../../../zustand/useStorageUsage';
import { maxStorageUsageKilobytes } from '../../../constants';
import { PaymentInfoSection } from './PaymentInfoSection';
import { usePaywallPopUpState } from '../../../zustand/usePaywallPopUpState';
import { PaywallPopUp } from '../../PaywallPopUp';
import { useIsCancelSubscriptionPopUpOpened } from '../../../zustand/useIsCancelSubscriptionPopUpOpened';
import { CancelSubscriptionPopUp } from '../../CancelSubscriptionPopUp';
import { requestToLoadPaymentMethods, usePaymentMethods } from '../../../zustand/usePaymentMethods';

const roundPercentage = (e: number) => (
  Math.floor(fixIEEE(e) * 1000) / 10
);
const formatKilobytes = (e: number) => (
  formatBytes(e * 1000, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).replace(',', '.').toUpperCase()
);
const formatDate = (e: Date) => (
  e.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
);

export const BillingPage: React.FC = () => {
  const { plan } = usePaidPlan();

  const isPaidUser = !isNull(plan);
  useEffect(() => {
    void requestToLoadStorageUsage(true);
    if(isPaidUser === true) {
      void requestToLoadPaymentMethods(true);
    } else {
      usePaymentMethods.setState({ paymentMethods: 'skip' });
    }
  }, [isPaidUser]);

  const { user } = useUserResolved();
  const { storageUsage } = useStorageUsage();
  const { paymentMethods } = usePaymentMethods();

  if(user === 'guest') {
    return (
      <Animations.fade>
        <Isle>
          <LogInSuggestion
            text={lang.cabinet.logInSuggestion}
            buttonText={lang.cabinet.logIn}
            onClick={() => {
              window.location.href = `${NODE_ENV === 'production' ? PLANNER_URL : LANDING_PAGE_URL}/login?${loginSearchParam}`;
            }}
          />
        </Isle>
      </Animations.fade>
    );
  }

  const usedCredits = ((e: number) => e)(0);
  const totalCredits = ((e: number) => e)(0);

  const start = !isNull(user.stripeSubscribedFrom) ? user.stripeSubscribedFrom : new Date();
  const finish = !isNull(user.stripeSubscribedTo) ? user.stripeSubscribedTo : new Date();
  const diffYears = (
    true
      && finish.getFullYear() - start.getFullYear() === 1
      && finish.getMonth() === start.getMonth()
      && finish.getDate() === start.getDate()
  );
  const price = (
    diffYears === true
      ? !isUndefined(plan?.yearlyPriceInCents) ? plan.yearlyPriceInCents / 100 : 0
      : !isUndefined(plan?.monthlyPriceInCents) ? plan.monthlyPriceInCents / 100 : 0
  );

  return (
    !isResolved(storageUsage) || !isResolved(paymentMethods)
      ? (
        <CenterWrapper>
          <CircularProgress />
        </CenterWrapper>
      )
      : (
        <Animations.fade>
          <PaywallPopUp />
          <CancelSubscriptionPopUp />
          <BillingContent>
            <BillingSection>
              <BillingSectionTitle>{lang.billing.subscriptionOverview}</BillingSectionTitle>
              <BillingIsles>
                <BillingIsle>
                  <BillingIsleTitle>
                    {
                      `${lang.billing.currentPlanSection.title}: ${isPaidUser === false ? lang.paymentPlans.free.title : plan.label}`
                    }
                  </BillingIsleTitle>
                  <BillingDividerBlock />
                  <BillingCurrentPlanContent
                    price={price}
                    period={diffYears === true ? 'year' : 'month'}
                    cancelButtonLabel={lang.billing.currentPlanSection.cancelButtonLabel}
                    planButtonLabel={
                      isPaidUser === false
                        ? lang.billing.currentPlanSection.upgradePlan
                        : plan.type === 'professional'
                          ? lang.billing.currentPlanSection.tryTeams
                          : lang.billing.currentPlanSection.changePlan
                    }
                    stripeCancelAtPeriodEnd={user.stripeCancelAtPeriodEnd}
                    handleCancelSubscription={() => {
                      useIsCancelSubscriptionPopUpOpened.setState({ isCancelSubscriptionPopUpOpened: true });
                    }}
                    handleChangePlan={() => {
                      usePaywallPopUpState.setState({
                        paywallPopUpState: {
                          type: 'paywall',
                        },
                      });
                    }}
                    {
                      ...(
                        isPaidUser === false
                          ? {
                            isFreePlan: true,
                          } satisfies Partial<BillingCurrentPlanContentProps>
                          : {
                            isFreePlan: false,
                            label: (
                              user.stripeCancelAtPeriodEnd === true
                                ? `${lang.billing.currentPlanSection.expires} ${formatDate(getNotNull(user.stripeSubscribedTo, 'Something went wrong. |ng3ygw|'))}`
                                : [
                                  formatDate(getNotNull(user.stripeSubscribedFrom, 'Something went wrong. |lu5hgo|')),
                                  formatDate(getNotNull(user.stripeSubscribedTo, 'Something went wrong. |zq0rf2|')),
                                ].join(' - ')
                            ),
                          } satisfies Partial<BillingCurrentPlanContentProps>
                      )
                    }
                  />
                </BillingIsle>
                <BillingIsle>
                  <BillingIsleTitle>{lang.billing.usageSummary}</BillingIsleTitle>
                  <BillingDividerBlock />
                  <BillingUsageSummaries>
                    <BillingUsageSummary
                      label={lang.billing.storageUsage}
                      used={formatKilobytes(storageUsage.totalSizeKilobytes)}
                      total={`/${formatKilobytes(maxStorageUsageKilobytes)}`}
                      percentage={roundPercentage(storageUsage.totalSizeKilobytes / maxStorageUsageKilobytes)}
                    />
                    <BillingUsageSummary
                      label={lang.billing.aiCapabilities}
                      used={`${usedCredits} ${usedCredits === 1 ? lang.billing.credits.singular : lang.billing.credits.plural}`}
                      total={`/${totalCredits} ${totalCredits === 1 ? lang.billing.credits.singular : lang.billing.credits.plural}`}
                      percentage={roundPercentage(0)}
                    />
                  </BillingUsageSummaries>
                </BillingIsle>
              </BillingIsles>
            </BillingSection>
            {
              paymentMethods !== 'skip' && (
                <PaymentInfoSection />
              )
            }
          </BillingContent>
        </Animations.fade>
      )
  );
};
