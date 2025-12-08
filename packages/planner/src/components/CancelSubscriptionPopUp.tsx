import { CancelSubscriptionPopUpHeader, MenuHeader, CancelSubscriptionPopUp as UICancelSubscriptionPopUp } from '@draw-house/ui/dist/components';
import styled from 'styled-components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { FormButton } from '@draw-house/ui/dist/components/Hub';
import { AlertIcon } from '@draw-house/ui/dist/components/Icons';
import { AlertIconWrapper, CancelSubscriptionButtonsWrapper, CancelSubscriptionContentText, CancelSubscriptionContentWrapper, CancelSubscriptionPopUpWrapper } from '@draw-house/ui/dist/components/CancelSubscriptionMisc';
import { useIsCancelSubscriptionPopUpOpened } from '../zustand/useIsCancelSubscriptionPopUpOpened';
import { stripeCancelSubscription } from '../services/fetch/stripeCancelSubscription';
import { lang } from '../lang';
import { useUser } from '../zustand';
import { getMe } from '../services';
import { usePaywallPopUpState } from '../zustand/usePaywallPopUpState';

const PopUp = styled(UICancelSubscriptionPopUp)`
  && {
    z-index: ${specialZIndexTop};
  }
`;

export const CancelSubscriptionPopUp: React.FC = () => {
  const { isCancelSubscriptionPopUpOpened } = useIsCancelSubscriptionPopUpOpened();

  return (
    <PopUp
      open={isCancelSubscriptionPopUpOpened}
      onClose={() => {
        useIsCancelSubscriptionPopUpOpened.setState({ isCancelSubscriptionPopUpOpened: false });
      }}
    >
      <CancelSubscriptionPopUpHeader>
        <MenuHeader
          text=''
          onClose={() => {
            useIsCancelSubscriptionPopUpOpened.setState({ isCancelSubscriptionPopUpOpened: false });
          }}
          noHeight
        />
      </CancelSubscriptionPopUpHeader>
      <CancelSubscriptionPopUpWrapper>
        <AlertIconWrapper>
          <AlertIcon />
        </AlertIconWrapper>
        <CancelSubscriptionContentWrapper>
          <CancelSubscriptionContentText>
            <strong>{lang.billing.currentPlanSection.cancelSubscriptionTitle}</strong>
          </CancelSubscriptionContentText>
          <CancelSubscriptionContentText>{lang.billing.currentPlanSection.cancelSubscriptionText}</CancelSubscriptionContentText>
        </CancelSubscriptionContentWrapper>
        <CancelSubscriptionButtonsWrapper>
          <FormButton
            text={lang.billing.currentPlanSection.cancelSubscriptionGoBackButton}
            size='large'
            variant='outlined'
            isBilling
            onClick={() => {
              useIsCancelSubscriptionPopUpOpened.setState({ isCancelSubscriptionPopUpOpened: false });
            }}
          />
          <FormButton
            text={lang.billing.currentPlanSection.cancelSubscriptionCancelButton}
            size='large'
            variant='contained'
            isBilling
            onClick={async () => {
              await stripeCancelSubscription();
              const user = await getMe();

              useUser.setState({ user });
              useIsCancelSubscriptionPopUpOpened.setState({ isCancelSubscriptionPopUpOpened: false });
              usePaywallPopUpState.setState({ paywallPopUpState: null });
            }}
          />
        </CancelSubscriptionButtonsWrapper>
      </CancelSubscriptionPopUpWrapper>
    </PopUp>
  );
};
