import { WithClassName } from '@draw-house/common/dist/utils';
import { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { TitledIsle } from '../CommonPageComponents';
import { InformationIcon, PaperPlaneIcon } from '../../Icons';
import { LogInSuggestion } from '../LogInSuggestion';
import {
  Form,
  FormButton,
  FormInputControlled,
  PencilIcon,
} from './styles';

type FormData = {
  subject: string;
  request: string;
};

export type SupportPageContentProps = {
  mainSectionTitle: string;
  requiredErrorText: string;
  subjectFieldLabel: string;
  requestFieldLabel: string;
  submitButtonText: string;
  onSubmit: (data: FormData, resetForm: () => void) => void;
  isGuestUser: boolean;
  logInSuggestionText: string;
  logInButtonText: string;
  onLoginButtonClick: () => void;
};

const defaultValues: FormData = {
  subject: '',
  request: '',
};

export const SupportPageContent = ({
  className,
  mainSectionTitle,
  requiredErrorText,
  subjectFieldLabel,
  requestFieldLabel,
  submitButtonText,
  onSubmit,
  isGuestUser,
  logInButtonText,
  logInSuggestionText,
  onLoginButtonClick,
}: SupportPageContentProps & WithClassName) => {
  const theme = useTheme();

  const resolver = useMemo(() => {
    const schema = z.object({
      subject: z.string().min(1, requiredErrorText),
      request: z.string().min(1, requiredErrorText),
    } satisfies Record<keyof FormData, unknown>);

    return zodResolver(schema);
  }, [requiredErrorText]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver,
  });

  const iconColor = theme.palette.common.black;

  return (
    <TitledIsle
      className={className}
      type='always-static'
      title={mainSectionTitle}
    >
      {
        isGuestUser === true ? (
          <LogInSuggestion
            text={logInSuggestionText}
            buttonText={logInButtonText}
            onClick={onLoginButtonClick}
          />
        ) : (
          <Form onSubmit={handleSubmit(data => onSubmit(data, reset))}>
            <FormInputControlled
              type='text'
              text={subjectFieldLabel}
              name='subject'
              startAdornment={<InformationIcon color={iconColor} />}
              control={control}
            />

            <FormInputControlled
              type='text'
              multiline
              text={requestFieldLabel}
              name='request'
              startAdornment={<PencilIcon color={iconColor} />}
              control={control}
            />

            <FormButton
              type='submit'
              variant='contained'
              size='small'
              text={submitButtonText}
              startIcon={<PaperPlaneIcon />}
            />
          </Form>
        )
      }
    </TitledIsle>
  );
};
