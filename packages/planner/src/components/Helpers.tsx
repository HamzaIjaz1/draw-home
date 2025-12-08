import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { DEPLOY_ENV, NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { Stats } from '@react-three/drei';
import styled from 'styled-components';

const StyledStats = styled(Stats)`
  z-index: ${specialZIndexTop} !important;
`;

export const Helpers: React.FC = () => (
  <>
    {
      DEPLOY_ENV !== 'production' && (
        <StyledStats />
      )
    }
    {
      NODE_ENV !== 'production' && (
        <axesHelper args={[10]} />
      )
    }
  </>
);
