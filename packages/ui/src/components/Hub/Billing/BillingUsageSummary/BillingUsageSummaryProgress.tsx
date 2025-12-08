import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import MUILinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const ProgressBar = styled(MUILinearProgress)(`
  height: 8px;
  border-radius: 100px;

  &.${linearProgressClasses.colorPrimary} {
    background-color: #fafafa;
  }

  & .${linearProgressClasses.bar} {
    background-color: #ff5b4a80;
  }
`);

export type BillingUsageSummaryProgressProps = {
  value: number;
};

export const BillingUsageSummaryProgress = ({ className, value }: BillingUsageSummaryProgressProps & WithClassName) => (
  <ProgressBar
    className={className}
    variant='determinate'
    value={value}
  />
);
