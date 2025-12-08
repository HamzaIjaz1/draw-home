import { css, styled } from '@mui/material';
import { buttonClasses } from '@mui/material/Button';
import { BaseButton } from '../../../BaseButton';

export const StyledButton = styled(BaseButton)(({ theme }) => css`
  height: 55px;
  border-radius: 63px;
  font-size: 17px;
  font-weight: 500;
  line-height: 25.5px;
  &.${buttonClasses.disabled} {
    color: ${theme.palette.form.disabled};
    border-color: ${theme.palette.form.disabled};
  }
`);
