import { styled } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { WithClassName } from '@draw-house/common/dist/utils';
import { identity } from '../../../utils/identity';
import { textStyles } from './common';

const StyledScopeText = styled(Typography)`
  ${textStyles}
  color: #888;
  flex: 1;
`;
StyledScopeText.defaultProps = identity<TypographyProps>({ component: 'span' });

export type ScopeTextProps = {
  children: React.ReactNode;
};

export const ScopeText = ({ className, children }: ScopeTextProps & WithClassName) => (
  <StyledScopeText className={className}>{children}</StyledScopeText>
);
