import { styled } from '@mui/material';
import { WithClassName } from '@draw-house/common/dist/utils';

type Props = {
  children: React.ReactNode;
};

export const CancelSubscriptionPopUpWrapper = styled('div')`
  height: 290px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CancelSubscriptionButtonsWrapper = styled('div')`
  display: flex;
  gap: 10px;
  margin: 0 30px;
`;

export const CancelSubscriptionContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 30px 30px;
`;

export const CancelSubscriptionPopUpHeader: React.FC<Props & WithClassName> = styled('div')`
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  position: relative;
`;

export const AlertIconWrapper = styled('div')`
  height: 56px;
  width: 56px;
  background-color: #fdeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

export const CancelSubscriptionContentText = styled('span')`
  font-weight: 400;
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;
  text-align: center;

  strong {
    all: unset;
    font-size: 19px;
    color: #000;
  }
`;
