import { BillingButton, billingButtonCurrentPlanDefaultBackgroundColor, CheckoutPopUpContentWrap, MenuHeader, PaymentPlanCard, PaywallMenuCards, PaywallMenuContent, PaywallMenuDescription, PaywallMenuHeader, Tab, Tabs, PaywallPopUp as UIPaywallPopUp } from '@draw-house/ui/dist/components';
import { useTheme } from '@mui/material';
import styled from 'styled-components';
import assert from 'assert';
import { letIn } from '@draw-house/common/dist/utils';
import { useState } from 'react';
import { getNotUndefined, isNull, ObjEntries } from '@arthurka/ts-utils';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { openSnackbar, useUserResolved } from '../zustand';
import { usePaymentPlansResolved } from '../zustand/usePaymentPlans';
import { lang } from '../lang';
import { usePaywallPopUpState } from '../zustand/usePaywallPopUpState';
import { SubscriptionCheckout } from './SubscriptionCheckout';
import { saveProjectButtonClick } from '../utils/handlerHelpers/saveProjectButtonClick';
import { usePaidPlan } from '../customHooks/usePaidPlan';
import { useIsCancelSubscriptionPopUpOpened } from '../zustand/useIsCancelSubscriptionPopUpOpened';

type Period = 'year' | 'month';

const periodToTabTitle: Record<Period, string> = {
  year: lang.paywall.yearlyTab,
  month: lang.paywall.monthlyTab,
};

const tabs = ObjEntries(periodToTabTitle);

const PopUp = styled(UIPaywallPopUp)`
  && {
    z-index: ${specialZIndexTop};
  }
`;

export const PaywallPopUp: React.FC = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState<Period>('year');
  const { paywallPopUpState } = usePaywallPopUpState();
  const { paymentPlans } = usePaymentPlansResolved();
  const { user } = useUserResolved();
  const { plan: currentPlan } = usePaidPlan();

  return (
    <PopUp
      open={!isNull(paywallPopUpState)}
      onClose={() => {
        usePaywallPopUpState.setState({ paywallPopUpState: null });
      }}
      variant={
        !isNull(paywallPopUpState) && paywallPopUpState.type === 'checkout'
          ? 'checkout'
          : undefined
      }
    >
      {
        !isNull(paywallPopUpState) && paywallPopUpState.type === 'checkout' && (
          <CheckoutPopUpContentWrap>
            <PaywallMenuHeader>
              <MenuHeader
                text={lang.paywall.title}
                onClose={() => {
                  usePaywallPopUpState.setState({ paywallPopUpState: null });
                }}
                noHeight
              />
            </PaywallMenuHeader>
            <SubscriptionCheckout priceId={paywallPopUpState.productId} />
          </CheckoutPopUpContentWrap>
        )
      }

      {
        !isNull(paywallPopUpState) && paywallPopUpState.type === 'paywall' && (
          <>
            <PaywallMenuHeader>
              <MenuHeader
                text={lang.paywall.title}
                onClose={() => {
                  usePaywallPopUpState.setState({ paywallPopUpState: null });
                }}
                noHeight
              />
              <PaywallMenuDescription>{lang.paywall.description}</PaywallMenuDescription>
              <Tabs
                stretch
                chosenTab={
                  letIn(tabs.findIndex(e => e[0] === period), index => {
                    assert(index !== -1, 'Something went wrong. |ha9kcm|');

                    return index;
                  })
                }
                onClick={index => {
                  const [period] = getNotUndefined(tabs[index], 'Something went wrong. |9u58tt|');

                  setPeriod(period);
                }}
              >
                {
                  tabs.map(([, text]) => (
                    <Tab key={text} label={text} />
                  ))
                }
              </Tabs>
            </PaywallMenuHeader>
            <PaywallMenuContent>
              <PaywallMenuCards>
                <PaymentPlanCard
                  title={lang.paymentPlans.free.title}
                  description={lang.paymentPlans.free.description}
                  priceBold={lang.paymentPlans.free.price}
                  pricePrevious={null}
                  priceGray={[]}
                  discountBadge={null}
                  featuresTitle={lang.paymentPlans.free.featuresTitle}
                  features={lang.paymentPlans.free.features}
                  actionElement={
                    <BillingButton
                      text={isNull(currentPlan) ? lang.paymentPlans.yourCurrentPlan : lang.paymentPlans.changeTo(lang.paymentPlans.free.title)}
                      width='fill'
                      variant='contained'
                      height='md'
                      rounded='md'
                      textColors={
                        isNull(currentPlan) || user !== 'guest' && user.stripeCancelAtPeriodEnd === true
                          ? { default: theme.palette.primary.main }
                          : undefined
                      }
                      backgroundColors={
                        isNull(currentPlan) || user !== 'guest' && user.stripeCancelAtPeriodEnd === true
                          ? { default: billingButtonCurrentPlanDefaultBackgroundColor }
                          : undefined
                      }
                      shadowless
                      onClick={async () => {
                        if(isNull(currentPlan)) {
                          await openSnackbar({
                            type: 'neutral',
                            message: lang.paymentPlans.currentPlanAlert,
                          });
                          return;
                        }

                        if(user !== 'guest' && user.stripeCancelAtPeriodEnd === true) {
                          await openSnackbar({
                            type: 'neutral',
                            message: lang.paymentPlans.activePlanExistsAlert,
                          });
                          return;
                        }

                        useIsCancelSubscriptionPopUpOpened.setState({ isCancelSubscriptionPopUpOpened: true });
                      }}
                    />
                  }
                />
                {
                  paymentPlans.map(plan => {
                    const monthlyPrice = plan.monthlyPriceInCents / 100;
                    const yearlyPrice = plan.yearlyPriceInCents / 100;
                    const yearlyPricePerMonth = yearlyPrice / 12;
                    const yearlyDiscount = Math.round(100 - (yearlyPricePerMonth * 100 / monthlyPrice));

                    const yearlyPriceLabel = ({
                      month: '',
                      year: lang.paymentPlans.yearlyPrice(yearlyPrice),
                    } satisfies Record<typeof period, string>)[period];

                    return (
                      <PaymentPlanCard
                        key={plan.type}
                        highlight={
                          false
                            || plan.type === 'professional' && (isNull(currentPlan) || currentPlan.type === 'team')
                            || plan.type === 'team' && currentPlan?.type === 'professional'
                        }
                        title={plan.label}
                        description={lang.paymentPlans[plan.type].description}
                        priceBold={({
                          month: `$${monthlyPrice}`,
                          year: `$${yearlyPricePerMonth}`,
                        } satisfies Record<typeof period, null | string>)[period]}
                        pricePrevious={({
                          month: null,
                          year: `$${monthlyPrice}`,
                        } satisfies Record<typeof period, null | string>)[period]}
                        priceGray={[
                          `/${lang.paymentPlans.month} ${yearlyPriceLabel}`,
                          ...plan.type !== 'team' ? [] : [`/${lang.paymentPlans.seat}`],
                        ]}
                        discountBadge={({
                          month: null,
                          year: lang.paymentPlans.discountPercentage(yearlyDiscount),
                        } satisfies Record<typeof period, null | string>)[period]}
                        featuresTitle={lang.paymentPlans[plan.type].featuresTitle}
                        features={lang.paymentPlans[plan.type].features}
                        actionElement={
                          <BillingButton
                            text={
                              currentPlan?.type === plan.type
                                ? lang.paymentPlans.yourCurrentPlan
                                : currentPlan?.type === 'team' && plan.type === 'professional'
                                  ? lang.paymentPlans.changeTo(plan.label)
                                  : lang.paymentPlans.upgradeTo(plan.label)
                            }
                            width='fill'
                            variant='contained'
                            height='md'
                            rounded='md'
                            shadowless
                            textColors={currentPlan?.type === plan.type ? { default: theme.palette.primary.main } : undefined}
                            backgroundColors={
                              currentPlan?.type === plan.type
                                ? { default: billingButtonCurrentPlanDefaultBackgroundColor }
                                : undefined
                            }
                            onClick={async () => {
                              if(currentPlan?.type === plan.type) {
                                await openSnackbar({
                                  type: 'neutral',
                                  message: lang.paymentPlans.currentPlanAlert,
                                });
                                return;
                              }

                              const productIdByPeriod: Record<typeof period, string | null> = {
                                month: plan.monthlyProductId,
                                year: plan.yearlyProductId,
                              };
                              const productId = productIdByPeriod[period];

                              if(isNull(productId)) {
                                await openSnackbar({
                                  type: 'neutral',
                                  message: lang.comingSoon,
                                });
                                return;
                              }

                              if(user !== 'guest') {
                                usePaywallPopUpState.setState({
                                  paywallPopUpState: {
                                    type: 'checkout',
                                    productId,
                                  },
                                });
                              }

                              await saveProjectButtonClick({ disablePaywall: true });
                            }}
                          />
                        }
                      />
                    );
                  })
                }
              </PaywallMenuCards>
            </PaywallMenuContent>
          </>
        )
      }
    </PopUp>
  );
};
