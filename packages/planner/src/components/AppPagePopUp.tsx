import styled from 'styled-components';
import { PopUp } from '@draw-house/ui/dist/components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';

export const AppPagePopUp = styled(PopUp)`
  && {
    z-index: ${specialZIndexTop};
  }
`;
