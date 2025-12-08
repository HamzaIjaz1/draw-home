import styled from 'styled-components';
import { Dialog } from '@draw-house/ui/dist/components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';

export const DialogForAppPage = styled(Dialog)`
  && {
    z-index: ${specialZIndexTop};
  }
`;
