'use client';

import styled from 'styled-components';
import { MobileMenu } from '../../components/MobileMenu';
import { Header } from '../../components/Header';
import { HomeContent } from '../../components/HomeContent';
import { Footer } from '../../components/Footer';
import { useMobileMenu } from '../../customHooks';
import { MAX_PAGE_WIDTH, pagePaddingCss } from '../../commonStyles';

const Container = styled.div`
  ${pagePaddingCss}
  max-width: ${MAX_PAGE_WIDTH}px;
  margin: 0 auto;
`;

export default (function Home() {
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useMobileMenu();

  return (
    <>
      <Header onMobileMenuOpen={openMobileMenu} />
      <Container>
        <MobileMenu open={isMobileMenuOpen} onClose={closeMobileMenu} />

        <HomeContent />
      </Container>
      <Footer />
    </>
  );
}) satisfies React.FC;
