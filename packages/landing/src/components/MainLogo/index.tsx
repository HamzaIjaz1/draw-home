import { FC } from 'react';
import { Badge, Container, LogoIcon, LogoText } from './styles';

export const MainLogo: FC = () => (
  <Container>
    <LogoIcon />
    <LogoText><em>Draw</em>Home</LogoText>
    <Badge>BETA</Badge>
  </Container>
);
