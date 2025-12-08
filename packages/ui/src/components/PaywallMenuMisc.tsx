import { css, styled } from '@mui/material';
import { WithClassName } from '@draw-house/common/dist/utils';
import { menuRowHorizontalPadding } from '../utils/styles';

type Props = {
  children: React.ReactNode;
};

export const PaywallMenuCards: React.FC<Props & WithClassName> = styled('div')`
  display: flex;
  align-items: stretch;
  gap: 16px;
  height: 100%;
  padding: 20px 16px 20px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
`;

export const PaywallMenuDescription: React.FC<Props & WithClassName> = styled('p')(({ theme }) => css`
  all: unset;
  display: flex;
  flex-direction: column;

  ${menuRowHorizontalPadding()}

  font-family: DM Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.1;
  letter-spacing: 0px;
  text-align: center;
  color: ${theme.palette.text.secondary};
`);

export const PaywallMenuAlert: React.FC<Props & WithClassName> = styled('div')(({ theme }) => css`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  ${menuRowHorizontalPadding()}

  font-family: DM Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.1;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

export const PaywallMenuHeader: React.FC<Props & WithClassName> = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 16px;
  padding-top: 16px;
  position: relative;
`;

export const PaywallMenuContent: React.FC<Props & WithClassName> = styled('div')`
  flex: 1 1 auto;
  overflow-y: auto;
`;
