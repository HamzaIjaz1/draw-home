'use client';

import { styled } from 'styled-components';

const breakpointSm = '500px';

export const H1 = styled.h1<{ weight?: 'bold' }>`
  font-size: 48px;
  font-weight: ${p => p.weight ?? 600};
  @media (max-width: ${breakpointSm}) {
    font-size: 45px;
  }
`;

export const H2 = styled.h2<{ weight?: 'bold' }>`
  font-size: 48px;
  font-weight: ${p => p.weight ?? 600};
  @media (max-width: ${breakpointSm}) {
    font-size: 30px;
  }
`;

export const H3 = styled.h3<{ weight?: 'bold' }>`
  font-size: 36px;
  font-weight: ${p => p.weight ?? 600};
  @media (max-width: ${breakpointSm}) {
    font-size: 20px;
  }
`;

export const H4 = styled.h3<{ weight?: 'bold' }>`
  font-size: 26px;
  font-weight: ${p => p.weight ?? 500};
  @media (max-width: ${breakpointSm}) {
    font-size: 16px;
  }
`;
export const H5 = styled.h3<{ weight?: 'bold' }>`
  font-size: 26px;
  font-weight: ${p => p.weight ?? 300};
  @media (max-width: ${breakpointSm}) {
    font-size: 16px;
  }
`;
export const H6 = styled.h3<{ weight?: 'bold' }>`
  font-size: 16px;
  font-weight: ${p => p.weight ?? 300};
  @media (max-width: ${breakpointSm}) {
    font-size: 16px;
  }
`;

export const P = styled.p<{ weight?: 'bold' }>`
  font-size: 16px;
  font-weight: ${p => p.weight ?? 300};
  @media (max-width: ${breakpointSm}) {
    font-size: 16px;
  }
`;
export const P12px = styled.p<{ weight?: 'bold' }>`
  font-size: 12px;
  font-weight: ${p => p.weight ?? 400};
  @media (max-width: ${breakpointSm}) {
    font-size: 12px;
  }
`;
