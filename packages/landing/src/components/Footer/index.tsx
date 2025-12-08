import Link from 'next/link';
import { memo } from 'react';
import { navigationLinks } from '../../constants';
import { Contacts } from '../Contacts';
import { MainLogoFooter } from '../MainLogoFooter';
import { SocialMediaLinks } from '../SocialMediaLinks';
import {
  Container,
  DividerLine,
  FirstRow,
  InfoContainer,
  NavigationContainer,
  NavigationLinkText,
  NavigationTitle,
  SecondRow,
  SocialContainer,
  SocialTitle,
  TermsText,
} from './styles';

export const Footer: React.FC = memo(() => (
  <Container>
    <FirstRow>
      <InfoContainer>
        <Link href='/'>
          <MainLogoFooter />
        </Link>
        <Contacts white />
      </InfoContainer>

      <NavigationContainer>
        <NavigationTitle>Links</NavigationTitle>
        {navigationLinks.map(({ link, text }) => (
          <li key={`${link}${text}`}>
            <Link href={link}>
              <NavigationLinkText>{text}</NavigationLinkText>
            </Link>
          </li>
        ))}
      </NavigationContainer>

      <SocialContainer>
        <SocialTitle>Get in Touch</SocialTitle>
        <SocialMediaLinks theme='light' />
      </SocialContainer>
    </FirstRow>

    <SecondRow>
      <DividerLine />
      <TermsText>DrawHome&nbsp;&nbsp;&nbsp;© 2025. All Rights Reserved.</TermsText>
    </SecondRow>
  </Container>
));
