import styled from 'styled-components';
import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { Button } from '../../Button';
import { PaperPlaneIcon } from '../../Icons';
import { SofiaPro } from '../../../fonts';
import { breakpointMd } from '../../../commonStyles';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 14px;
  line-height: 1em;
  letter-spacing: 0.08em;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;
  color: #7a7e83;
`;

const Title = styled.span`
  margin-top: 14px;
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 26px;
  line-height: 1em;
  text-align: center;
  vertical-align: middle;
  white-space: pre;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    margin-top: 16px;
    font-size: 50px;
  }
`;

const TryButton = styled(Button)`
  margin-top: 30px;
  width: 187px;
  height: 48px;
  @media (min-width: ${breakpointMd}) {
    margin-top: 50px;
    width: 248px;
    height: 58px;
  }
`;

export const CallToApp: React.FC = () => (
  <Container>
    <Subtitle>A NEW Way to Design Your Home</Subtitle>
    <Title>{'Build & Design visually,\nwithout a learning curve!'}</Title>

    <TryButton asLink href={PLANNER_URL} variant='primary'>
      <span>Start for Free</span>
      <PaperPlaneIcon />
    </TryButton>
  </Container>
);
