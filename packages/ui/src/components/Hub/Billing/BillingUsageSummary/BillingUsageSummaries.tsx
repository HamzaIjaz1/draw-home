import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

export type BillingUsageSummariesProps = {
  children: React.ReactNode;
};

export const BillingUsageSummaries: React.FC<BillingUsageSummariesProps & WithClassName> = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 16px;
  justify-content: space-between;
`;
