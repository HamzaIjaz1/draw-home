import { ClockIcon, CollaborationIcon, CubeIcon, LightBulbIcon, MagicWandIcon, PersonCheckmarkIcon } from '../../Icons';
import { Card, CardDescription, Cards, CardTitle, Container, IconContainer, Title } from './styles';

const features: Array<{ title: string; description: string; icon: JSX.Element }> = [
  {
    title: 'Ideation',
    description: 'Unleash your creativity and easily turn your innovative ideas into reality',
    icon: <LightBulbIcon />,
  },
  {
    title: 'Massing',
    description: 'Shape and refine your concepts with detailed 3D visualization tools',
    icon: <CubeIcon />,
  },
  {
    title: 'Team Collaboration',
    description: 'Seamlessly collaborate with your team to achieve outstanding design results',
    icon: <CollaborationIcon />,
  },
  {
    title: 'Quick Configurator',
    description: 'Quickly customize and adapt designs to meet your specific needs',
    icon: <ClockIcon />,
  },
  {
    title: 'AI Features',
    description: 'Boost your workflow efficiency with intelligent and automated tools',
    icon: <MagicWandIcon />,
  },
  {
    title: 'Vibrant Community ',
    description: 'Connect and grow with a dynamic community of creators and professionals',
    icon: <PersonCheckmarkIcon />,
  },
];

export const Features: React.FC = () => (
  <Container>
    <Title>What Makes DrawHome Unique</Title>

    <Cards>
      {features.map(({ icon, title, description }) => (
        <Card key={title}>
          <IconContainer>{icon}</IconContainer>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </Card>
      ))}
    </Cards>
  </Container>
);
