import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { menuRowPadding } from '../../utils/styles';
import { InformationFilledIcon as BaseInformationFilledIcon } from '../Icons';

const Container = styled('div')`
  display: flex;
  align-items: center;
  gap: 4px;
  ${menuRowPadding()}
`;

const InformationFilledIcon = styled(BaseInformationFilledIcon)`
  color: #fbc53c;
`;

export type ScopeControlRowProps = {
  children: React.ReactNode;
};

export const ScopeControlRow = ({
  className,
  children,
}: ScopeControlRowProps & WithClassName) => (
  <Container className={className}>
    <InformationFilledIcon />
    {children}
  </Container>
);
