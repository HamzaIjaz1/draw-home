import { css, styled } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { WithClassName } from '@draw-house/common/dist/utils';
import { textStyles } from './common';
import { identity } from '../../../utils/identity';

const StyledScopeTextHighlighted = styled(Typography)(({ theme }) => css`
  ${textStyles}
  font-style: normal;
  color: ${theme.palette.primary.main};
`);
StyledScopeTextHighlighted.defaultProps = identity<TypographyProps>({ component: 'em' });

export type ScopeTextHighlightedProps = {
  children: React.ReactNode;
};

export const ScopeTextHighlighted = ({ className, children }: ScopeTextHighlightedProps & WithClassName) => (
  <StyledScopeTextHighlighted className={className}>{children}</StyledScopeTextHighlighted>
);
