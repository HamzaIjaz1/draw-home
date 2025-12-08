import { WithClassName } from '@draw-house/common/dist/utils';
import { IconContainer } from './styles';
import { ComingSoonIcon } from '../../Icons';

export const ComingSoonPageContent = ({ className }: WithClassName) => (
  <IconContainer className={className}>
    <ComingSoonIcon />
  </IconContainer>
);
