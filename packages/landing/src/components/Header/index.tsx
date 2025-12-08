import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { memo, useContext } from 'react';
import Link from 'next/link';
import { loginSearchParam } from '@draw-house/common/dist/constants';
import { HeaderLink } from '../HeaderLink';
import { AuthContext } from '../AuthContext';
import { Button } from '../Button';
import { MainLogo } from '../MainLogo';
import { navigationLinks } from '../../constants';
import { DesktopUserButtonsWrapper, LogInButton, MobileMenuButton, NavigationWrapper, RegisterButton, Wrapper } from './styles';

type HeaderProps = {
  onMobileMenuOpen: () => void;
};

export const Header: React.FC<HeaderProps> = memo(({ onMobileMenuOpen }) => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Wrapper>
      <Link href='/'>
        <MainLogo />
      </Link>

      <NavigationWrapper>
        {navigationLinks.map(e => (
          <li key={`${e.link}${e.text}`}>
            <HeaderLink
              href={e.link}
              highlight={e.highlight}
            >
              {e.text}
            </HeaderLink>
          </li>
        ))}
      </NavigationWrapper>

      <MobileMenuButton
        icon='burger'
        onClick={onMobileMenuOpen}
      />

      <DesktopUserButtonsWrapper>
        {
          loggedIn === true
            ? (
              <Button asLink href={PLANNER_URL} variant='secondary-contained'>
                <span>App</span>
              </Button>
            )
            : (
              <>
                <LogInButton
                  variant='secondary-outlined'
                  asLink
                  href={`/login?${loginSearchParam}`}
                >
                  <span>Log In</span>
                </LogInButton>
                <RegisterButton
                  variant='secondary-contained'
                  asLink
                  href='/login'
                >
                  <span>Register</span>
                </RegisterButton>
              </>
            )
        }
      </DesktopUserButtonsWrapper>
    </Wrapper>
  );
});
