import { css, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import MuiFormLabel from '@mui/material/FormLabel';

const iconTitleGap = '14px';

const fontCss = css`
  font-size: 12px;
  font-weight: 300;
  line-height: 19px;
  letter-spacing: 0.4px;
`;

export const FormLabel = styled(MuiFormLabel)(({ theme }) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`);

export const LabelHeading = styled('div')(({ theme }) => css`
  display: flex;
  align-items: center;
  gap: ${iconTitleGap};
  ${fontCss};
  color: ${theme.palette.text.primary};
`);

export const StyledInput = styled(TextField)(({ theme, multiline }) => css`
  width: 100%;
  & .MuiInput-root {
    font-size: 12px;
    ${multiline === true ? '' : css`
      height: 33px;
    `}
  }
  & .MuiInput-input, & .Mui-disabled {
    ${multiline === true ? '' : css`
      margin-left: ${iconTitleGap};
    `}

    ${fontCss};
    color: ${theme.palette.text.primary};
    -webkit-text-fill-color: ${theme.palette.text.primary} !important;
  }
  & .MuiInput-root::before {
    border-bottom: 1px solid ${theme.palette.form.inputBorder};
  }
  & input::placeholder {
    color: ${theme.palette.text.primary};
    opacity: 1;
  }

  .MuiInput-root > svg {
    pointer-events: none;
  }
`);
