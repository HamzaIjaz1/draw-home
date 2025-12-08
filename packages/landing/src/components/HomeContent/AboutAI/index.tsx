import { SparklesIcon } from '../../Icons';
import { Container, Feature, Features, FeatureText, IconContainer, Img, Subtitle, TextBlock, Title } from './styles';

const items: string[] = [
  'Instantly generate a floor plan based on your house shape',
  'Get smart suggestions for room zoning and layout optimization',
  'Receive interior proposals tailored to your needs',
];

export const AboutAI: React.FC = () => (
  <Container>
    <Img
      src='/about-ai-house.png'
      alt='floor plan created with the help of AI'
      width={358}
      height={264}
      quality={100}
    />

    <TextBlock>
      <Title>AI that accelerates — not replaces — your creativity</Title>
      <Subtitle>DrawHome gives you more than just tools — it gives you intelligent support.</Subtitle>

      <Features>
        {items.map(text => (
          <Feature key={text}>
            <IconContainer><SparklesIcon /></IconContainer>
            <FeatureText>{text}</FeatureText>
          </Feature>
        ))}
      </Features>
    </TextBlock>
  </Container>
);
