import { FC, memo } from 'react';
import Link from 'next/link';
import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { loginSearchParam } from '@draw-house/common/dist/constants';
import { MainLogo } from '../MainLogo';
import { MenuButton } from '../MenuButton';
import { SocialMediaLinks } from '../SocialMediaLinks';
import { navigationLinks } from '../../constants';
import { PaperPlaneIcon } from '../Icons';
import { AuthButton, AuthButtonText, ButtonsBlock, Container, GlobalStyle, Header, Navigation, NavigationLinkText, SubtitleText, TryButton, TryButtonText } from './styles';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export const MobileMenu: FC<MobileMenuProps> = memo(({ open, onClose }) => (
  <>
    <GlobalStyle $open={open} />
    <Container $open={open}>
      <Header>
        <Link href='/'>
          <MainLogo />
        </Link>

        <MenuButton
          icon='cross'
          onClick={onClose}
        />
      </Header>

      <Navigation>
        {navigationLinks.map(({ link, text }) => (
          <li key={`${link}${text}`}>
            <a href={link}>
              <NavigationLinkText>{text}</NavigationLinkText>
            </a>
          </li>
        ))}
      </Navigation>

      <SocialMediaLinks />

      <ButtonsBlock>
        <TryButton asLink href={PLANNER_URL} variant='primary'>
          <TryButtonText>Try for Free</TryButtonText>
          <PaperPlaneIcon />
        </TryButton>

        <AuthButton
          variant='secondary-contained'
          asLink
          href='/login'
        >
          <AuthButtonText>Register</AuthButtonText>
        </AuthButton>

        <SubtitleText>or</SubtitleText>

        <AuthButton
          variant='secondary-outlined'
          asLink
          href={`/login?${loginSearchParam}`}
        >
          <AuthButtonText>Log In</AuthButtonText>
        </AuthButton>
      </ButtonsBlock>
    </Container>
  </>
));
