import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { Button } from '../../Button';
import { Badge, Card, Cards, Container, Description, Img, Title } from './styles';

const cards: Array<Record<'src' | 'badge' | 'badgeColor' | 'title' | 'description', string>> = [
  {
    src: '/target-audience-homeowners.png',
    title: 'Your home, in 3D',
    badge: 'Homeowners',
    badgeColor: '#2ab5f636',
    description: 'An intuitive and friendly design tool that helps you plan your dream home or remodel without needing professional skills. Draw walls, place furniture, experiment with layouts, and preview it all in 3D. AI steps in only to assist, not override.',
  },
  {
    src: '/target-audience-builders.png',
    title: 'From blueprint to build',
    badge: 'Builders & Engineers',
    badgeColor: '#fff699',
    description: 'A practical tool for translating ideas into real structures. Quickly test layout options, check spatial logic, and visualize dimensions clearly. AI features assist in minimizing planning errors and improving efficiency on site.',
  },
  {
    src: '/target-audience-designers.png',
    title: 'Design and Collaborate',
    badge: 'Professionals',
    badgeColor: '#fee4de',
    description: 'A fast environment for professionals to design and communicate ideas effectively. Create complex layouts with precision, preview in 3D, and use AI to refine your concepts—to share with your clients and collect feedback.',
  },
];

export const TargetAudience: React.FC = () => (
  <Container>
    <Cards>
      {cards.map(({ badge, badgeColor, description, src, title }, i) => (
        <Card key={src}>
          <Img
            src={src}
            alt={`floor plan example ${i + 1}`}
            width={358}
            height={218}
            quality={100}
          />
          <Badge $color={badgeColor}>{badge}</Badge>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Card>
      ))}
    </Cards>

    <Button asLink href={PLANNER_URL} variant='secondary-contained'>
      <span>Explore Everything Free</span>
    </Button>
  </Container>
);
