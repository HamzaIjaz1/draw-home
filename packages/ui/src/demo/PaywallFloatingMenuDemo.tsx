import { memo, useState } from 'react';
import { useTheme } from '@mui/material';
import { noop } from '../utils/noop';
import { negate } from '../utils/negate';
import { lookup } from '../utils/lookup';
import { AlertIcon } from '../components/Icons';
import { BillingButton, MainButton, MenuHeader, PaymentPlanCard, PaywallMenuAlert, PaywallMenuCards, PaywallMenuContent, PaywallMenuDescription, PaywallMenuHeader, PaywallPopUp, Tab, Tabs } from '../components';

export const PaywallFloatingMenuDemo = memo(() => {
  const title = 'Floating Billing';
  const [open, setOpen] = useState(false);
  const [chosenTab, setChosenTab] = useState(0);
  const theme = useTheme();

  const period = chosenTab === 0 ? 'year' : 'month';

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <PaywallPopUp
        open={open}
        onClose={() => setOpen(false)}
      >
        <PaywallMenuHeader>
          <MenuHeader
            text='Upgrade'
            onClose={() => setOpen(false)}
            noHeight
          />

          {
            lookup(period, {
              year: <PaywallMenuDescription>Choose the subscription plan that’s right for you</PaywallMenuDescription>,
              month: (
                <PaywallMenuAlert>
                  <AlertIcon />
                  <span>3 days remaining on your Free Trial.</span>
                </PaywallMenuAlert>
              ),
            })
          }
          <Tabs
            chosenTab={chosenTab}
            onClick={setChosenTab}
            stretch
          >
            <Tab label='Yearly Billing' />
            <Tab label='Monthly Billing' />
          </Tabs>
        </PaywallMenuHeader>

        <PaywallMenuContent>
          <PaywallMenuCards>
            <PaymentPlanCard
              title='Free'
              description='Explore basic features'
              priceBold='Free'
              pricePrevious={null}
              priceGray={[]}
              discountBadge={null}
              featuresTitle='Included features:'
              features={[
                '3 Active projects',
                'Community support',
                'Basic models and textures',
                '2 Levels',
                'Export to PNG',
                '10 AI Credits(Coming Soon)',
              ]}
              actionElement={
                <BillingButton
                  text='Your Current Plan'
                  width='fill'
                  variant='contained'
                  height='md'
                  rounded='md'
                  textColors={{ default: theme.palette.primary.main }}
                  backgroundColors={{ default: '#fd563133' }}
                  shadowless
                  onClick={noop}
                />
              }
            />
            <PaymentPlanCard
              highlight
              title='Professional'
              description='Enhance your work'
              priceBold='$8'
              pricePrevious={lookup(period, { month: null, year: '$10' })}
              priceGray={[`/month${lookup(period, { month: '', year: ' ($96 Yearly)' })}`]}
              discountBadge='20% Discount'
              featuresTitle='Includes all Free Plan features and:'
              features={[
                '10 Active projects',
                'Email Support',
                'Premium models and textures',
                'Unlimited levels',
                'Export PNG, GLB, GLTF, etc.',
                'Import 2D and 3D assets',
                '100 AI Credits(Coming Soon)',
              ]}
              actionElement={
                <BillingButton
                  text='Upgrade to Professional'
                  width='fill'
                  variant='contained'
                  height='md'
                  rounded='md'
                  shadowless
                  onClick={noop}
                />
              }
            />
            <PaymentPlanCard
              title='Teams'
              description='Expand with clients and teams'
              priceBold={lookup(period, { month: '$20', year: '$200' })}
              pricePrevious={null}
              priceGray={[`/${period}`, '/seat']}
              discountBadge={null}
              featuresTitle='Includes all Professional Plan features and:'
              features={[
                '10 Active Projects per seat',
                'Real time collaboration ',
                'Comments and feedback',
                'Create & share an unlimited amount of projects',
              ]}
              actionElement={
                <BillingButton
                  text='Upgrade to Team'
                  width='fill'
                  variant='contained'
                  height='md'
                  rounded='md'
                  shadowless
                  onClick={noop}
                />
              }
            />
          </PaywallMenuCards>
        </PaywallMenuContent>
      </PaywallPopUp>
    </>
  );
});
