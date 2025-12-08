import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { PaperPlaneIcon } from '../../Icons';
import {
  Container,
  Description,
  HintText,
  Img,
  Subtitle,
  TextBlock,
  Title,
  TryButton,
  TryButtonBlock,
} from './styles';

const description = 'Bring your vision to life with easy to use home drawing tools. AI assisted floor plan creation tools make it easy to visualize your dreams in minutes.';

export const Hero: React.FC = () => (
  <Container>
    <TextBlock>
      <Subtitle>Build / Design / Collaborate</Subtitle>
      <Title>Build Your Vision</Title>
      <Description>{description}</Description>

      <TryButtonBlock>
        <TryButton asLink href={PLANNER_URL} variant='primary'>
          <span>Try for Free</span>
          <PaperPlaneIcon />
        </TryButton>

        <HintText>No login required</HintText>
      </TryButtonBlock>
    </TextBlock>

    <Img
      src='/hero-house.png'
      alt='project showcase'
    />
  </Container>
);
