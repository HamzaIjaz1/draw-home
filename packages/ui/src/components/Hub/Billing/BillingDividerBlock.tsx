import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { Divider } from '../../Divider';

const Container = styled('div')`
  padding: 12px 0 16px;
`;

export const BillingDividerBlock = ({ className }: WithClassName) => (
  <Container className={className}>
    <Divider fullWidth />
  </Container>
);
