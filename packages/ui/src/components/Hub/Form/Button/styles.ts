import { css, styled } from '@mui/material';
import { buttonClasses } from '@mui/material/Button';
import { BaseButton } from '../../../BaseButton';

export const StyledButton = styled(BaseButton)(({ theme }) => css`
  height: 44px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  &.${buttonClasses.disabled} {
    color: ${theme.palette.form.disabled};
    border-color: ${theme.palette.form.disabled};
  }
`);
