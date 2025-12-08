'use client';

import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { MAX_PAGE_WIDTH, pagePaddingCss } from '../../../commonStyles';
import { useMobileMenu } from '../../../customHooks';
import { MobileMenu } from '../../../components/MobileMenu';

const Main = styled.main`
  max-width: ${MAX_PAGE_WIDTH}px;
  ${pagePaddingCss}
  margin: 0 auto;
`;

const Message = styled.div`
  padding: 40px 20px;
`;

const Text = styled.p`
  margin: 20px 0;

  font-size: 24px;
  font-weight: 300;
  line-height: 28px;
`;

export default (function Error() {
  const searchParams = useSearchParams();
  const type = searchParams?.get('type') ?? '';

  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <>
      <Header onMobileMenuOpen={openMobileMenu} />
      <Main>
        <MobileMenu open={isMobileMenuOpen} onClose={closeMobileMenu} />

        {
          type === 'blocked-account' && (
            <Message>
              <Text>Your account has been blocked. Contact support for help.</Text>
            </Message>
          )
        }
        {
          type === 'discourse-unconfirmed-email' && (
            <Message>
              <Text>You must confirm your email before logging in our Discourse community.</Text>
              <Text>Please check your email for a confirmation link to complete your registration.</Text>
            </Message>
          )
        }
      </Main>
      <Footer />
    </>
  );
}) satisfies React.FC;
