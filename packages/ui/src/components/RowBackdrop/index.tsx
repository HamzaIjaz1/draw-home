import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { backgroundSecondary } from '../../theme';

const Container = styled('div')`
  height: 44px;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${backgroundSecondary};
  border-radius: 10px;
  padding-right: 6px;
`;

export type RowBackdropProps = {
  children: React.ReactNode;
};

export const RowBackdrop = ({ className, children }: RowBackdropProps & WithClassName) => (
  <Container className={className}>{children}</Container>
);
