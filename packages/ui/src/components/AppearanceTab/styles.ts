import { css, styled } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { identity } from '../../utils/identity';
import type { AppearanceTabProps } from '.';
import { lookup } from '../../utils/lookup';
import { $Props, $props } from '../../utils/$props';

type CommonProps = {
  $state: AppearanceTabProps['state'];
};

export const Container = styled('button', $props())<$Props<CommonProps>>(({ theme, $state }) => css`
  /* reset some button styles */
  border: none;
  font: inherit;

  display: flex;
  align-items: center;
  gap: 2px;
  height: 28px;
  padding: 4px 6px;
  border-radius: 6px;
  background-color: ${lookup($state, {
    default: theme.palette.background.paper,
    active: theme.palette.primary.main,
  })};
  user-select: none;
  cursor: pointer;
`);

export const Label = styled(Typography, $props())<$Props<CommonProps>>(({ theme, $state }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: center;
  color: ${lookup($state, {
    default: theme.palette.text.primary,
    active: '#fff',
  })};
`);
Label.defaultProps = identity<TypographyProps>({ component: 'span' });

export const BadgeLabel = styled(Typography, $props())<$Props<CommonProps>>(({ theme, $state }) => css`
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: bottom;
  color: ${theme.palette.primary.main};
  background-color: ${lookup($state, {
    default: '#f1f1f1',
    active: theme.palette.background.paper,
  })};
  border-radius: 100px;
  padding-right: 2px;
  padding-left: 2px;
`);
BadgeLabel.defaultProps = identity<TypographyProps>({ component: 'span' });
