'use client';

import styled from 'styled-components';
import { Typography } from './Typography';

const StyledTypography = styled(Typography)`
  margin: 60px 0;
  text-align: center;
`;

export const BlockTitle: React.FCWithChildren = ({ children }) => (
  <StyledTypography type='h3'>{children}</StyledTypography>
);
