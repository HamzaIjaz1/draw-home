import { memo } from 'react';
import styled from 'styled-components';
import { Hero } from './Hero';
import { TargetAudience } from './TargetAudience';
import { Features } from './Features';
import { AboutAI } from './AboutAI';
import { Ecosystem } from './Ecosystem';
import { CallToApp } from './CallToApp';
import { OurApproach } from './OurApproach';
import { Demo } from './Demo';
// import { Reviews } from './Reviews';
import { ContactForm } from './ContactForm';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0;
`;

export const HomeContent: React.FC = memo(() => (
  <Container>
    <Hero />
    <TargetAudience />
    <Features />
    <AboutAI />
    <Ecosystem />
    <CallToApp />
    <OurApproach />
    <Demo />
    {/* <Reviews /> */}
    <ContactForm />
  </Container>
));
