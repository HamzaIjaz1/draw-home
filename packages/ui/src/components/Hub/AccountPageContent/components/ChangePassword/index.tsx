import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useState } from 'react';
import { FieldContainer } from './styles';
import { FormInputControlled } from '../../../Form/Input';
import { LockIcon } from '../../../../Icons';
import { CommonErrorTexts } from '../../../Form';
import { DialogActions } from '../../../DialogActions';

type FormFieldProp = {
  text: string;
};

type ButtonProp = {
  text: string;
};

export type ChangePasswordFormTexts = {
  formFields: {
    oldPassword: FormFieldProp;
    newPassword: FormFieldProp;
    newPasswordRepeat: FormFieldProp;
  };
  buttons: {
    confirm: ButtonProp;
    cancel: ButtonProp;
  };
};

export type FormFields = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;

type ChangePasswordFormProps = (
  & ChangePasswordFormTexts
  & {
    handleCancel: () => void;
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
  }
);

const defaultValues: FormFields = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
};

export const ChangePasswordForm = ({
  formFields,
  buttons,
  handleCancel,
  commonErrorTexts,
  handleSubmit: handleSubmitProp,
}: ChangePasswordFormProps) => {
  const [errors, setErrors] = useState<FormFieldsErrors>({});

  const schema = z.object({
    oldPassword: z.string().min(1, commonErrorTexts.required),
    newPassword: z.string().min(1, commonErrorTexts.required),
    newPasswordRepeat: z.string().min(1, commonErrorTexts.required),
  } satisfies Record<keyof FormFields, z.ZodType>).refine(data => data.newPassword === data.newPasswordRepeat, {
    message: commonErrorTexts.passwordsMismatch,
    path: ['newPassword'],
  });

  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    setErrors({});
    const errors = await handleSubmitProp(data);
    setErrors(errors);
  };

  return (
    <form className='Form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldContainer>
        <FormInputControlled
          startAdornment={<LockIcon />}
          text={formFields.oldPassword.text}
          name='oldPassword'
          control={control}
          serverError={errors?.oldPassword}
          type='password'
        />
        <FormInputControlled
          startAdornment={<LockIcon />}
          text={formFields.newPassword.text}
          name='newPassword'
          control={control}
          serverError={errors?.newPassword}
          type='password'
        />
        <FormInputControlled
          startAdornment={<LockIcon />}
          text={formFields.newPasswordRepeat.text}
          name='newPasswordRepeat'
          control={control}
          serverError={errors?.newPasswordRepeat}
          type='password'
        />
      </FieldContainer>

      <DialogActions
        primaryActionText={buttons.confirm.text}
        primaryButtonType='submit'
        secondaryActionText={buttons.cancel.text}
        onSecondaryAction={handleCancel}
      />
    </form>
  );
};
