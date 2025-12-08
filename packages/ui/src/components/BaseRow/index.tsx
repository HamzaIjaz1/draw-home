import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { menuRowPadding } from '../../utils/styles';

const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${menuRowPadding()}
`;

export type BaseRowProps = {
  children: React.ReactNode;
};

export const BaseRow = ({
  className,
  children,
}: BaseRowProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
