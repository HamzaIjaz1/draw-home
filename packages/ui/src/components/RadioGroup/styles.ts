import Typography from '@mui/material/Typography';
import MuiRadio, { radioClasses } from '@mui/material/Radio';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { css, styled } from '@mui/material';

export const Label = styled(Typography)`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

export const FormControlLabel = styled(MuiFormControlLabel)`
  margin-left: 0px;
`;

export const Radio = styled(MuiRadio)(({ theme }) => css`
  color: ${theme.palette.primary.main};

  svg {
    width: 22px;
    height: 22px;
  }

  &.${radioClasses.root} {
    padding: 6px;
  }
`);
