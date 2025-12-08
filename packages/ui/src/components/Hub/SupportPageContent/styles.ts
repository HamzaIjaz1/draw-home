import { css, styled } from '@mui/material';
import { PencilIcon as BasePencilIcon } from '../../Icons';
import { FormInputControlled as BaseFormInputControlled } from '../Form/Input';
import { FormButton as BaseFormButton } from '../Form/Button';

export const Form = styled('form')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(10)};
`);

export const PencilIcon = styled(BasePencilIcon)`
  width: 22px;
  height: 22px;
`;

export const FormInputControlled = styled(BaseFormInputControlled)`
  max-width: 800px;
` as typeof BaseFormInputControlled;

export const FormButton = styled(BaseFormButton)(({ theme }) => css`
  margin-top: ${theme.spacing(5)};
  margin-left: auto;
  margin-right: auto;

  ${theme.breakpoints.up('md')} {
    margin-left: unset;
    margin-right: unset;
  }
`);
