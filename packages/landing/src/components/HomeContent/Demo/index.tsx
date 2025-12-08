import { EyeEyelashesIcon, MobileReadyIcon, PersonHeartIcon } from '../../Icons';
import { Container, IconContainer, Img, Item, Items, ItemText, Subtitle, TextBlock, Title } from './styles';

const items: Array<{ text: string; icon: JSX.Element }> = [
  { icon: <MobileReadyIcon />, text: 'Mobile Compatibility' },
  { icon: <PersonHeartIcon />, text: 'Intuitive Interface' },
  { icon: <EyeEyelashesIcon />, text: 'Real-Time Updates' },
];

export const Demo: React.FC = () => (
  <Container>
    <TextBlock>
      <Title>Watch Demo</Title>
      <Subtitle>See how DrawHome transforms your design process with intuitive tools, mobile compatibility, and seamless creativity.</Subtitle>

      <Items>
        {items.map(({ text, icon }) => (
          <Item key={text}>
            <IconContainer variant='contained'>{icon}</IconContainer>
            <ItemText>{text}</ItemText>
          </Item>
        ))}
      </Items>
    </TextBlock>

    <Img
      src='/demo.png'
      alt='demo'
      width={318}
      height={226}
      quality={100}
    />
  </Container>
);
