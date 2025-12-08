'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Sign } from '../../../components/Sign';

const StyledMain = styled.main`
  width: 100vw;
  height: 100vh;
`;

export default (function Home() {
  const { push } = useRouter();

  const onCloseSign = () => {
    push('/');
  };

  return (
    <StyledMain>
      <Sign onCloseModal={onCloseSign} />
    </StyledMain>
  );
}) satisfies React.FC;
