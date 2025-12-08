import { Card, CardTitle, Container, ImageBlock, Img, Subtitle, TextColumn, TextsBlock, Title, TitledCard } from './styles';

type CardData = {
  title: string;
  typical: string;
  our: string;
  image: string;
};

const cards: CardData[] = [
  {
    title: 'Roof Generation',
    typical: 'Non existent roof options in internal design oriented apps ',
    our: 'Auto-generated roof after wall closure. Pick style, material, colors.',
    image: '/our-approach-collaboration.png',
  },
  {
    title: 'Furnishing the Space',
    typical: 'Manual search, placement, and guesswork.',
    our: 'AI created layouts with optimal furniture placement — fully editable.',
    image: '/our-approach-furnishing.png',
  },
  {
    title: 'Material Settings',
    typical: 'Hard to find the right material, hard to apply it.',
    our: 'Quick replace materials, colors, textures — with relevant options.',
    image: '/our-approach-materials.png',
  },
  {
    title: 'Collaboration',
    typical: 'Offline communications, screenshots, exports, and emails.',
    our: 'Share projects in real time with flexible access permissions.',
    image: '/our-approach-collaboration.png',
  },
];

export const OurApproach: React.FC = () => (
  <Container>
    {cards.map(({ title, typical, our, image }) => (
      <TitledCard key={title}>
        <CardTitle>{title}</CardTitle>
        <Card>
          <TextsBlock>
            <TextColumn>
              <Title>Typical approach:</Title>
              <Subtitle>{typical}</Subtitle>
            </TextColumn>

            <TextColumn>
              <Title>Our approach:</Title>
              <Subtitle>{our}</Subtitle>
            </TextColumn>
          </TextsBlock>

          <ImageBlock>
            <Img
              src={image}
              alt={`Our ${title} approach showcase`}
              width={338}
              height={176}
              quality={100}
            />
          </ImageBlock>
        </Card>
      </TitledCard>
    ))}
  </Container>
);
