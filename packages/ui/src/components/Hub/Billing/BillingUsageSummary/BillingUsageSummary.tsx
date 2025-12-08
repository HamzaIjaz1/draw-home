import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { Box } from '../../../Box';
import { BillingUsageSummaryProgress } from './BillingUsageSummaryProgress';

const Container = styled('div')`
  flex: 1;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled('span')`
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;

  strong {
    all: unset;
    font-size: 18px;
    color: #000;
  }
`;

export type BillingUsageSummaryProps = {
  used: string;
  total: string;
  percentage: number;
  label: string;
};

export const BillingUsageSummary = ({
  className,
  used,
  total,
  percentage,
  label,
}: BillingUsageSummaryProps & WithClassName) => (
  <Container className={className}>
    <Label><strong>{used}</strong>{'  '}{total}</Label>

    <BillingUsageSummaryProgress value={Math.min(percentage, 100)} />

    <Box justify='space-between'>
      <Label>{label}</Label>
      <Label>{percentage}%</Label>
    </Box>
  </Container>
);
