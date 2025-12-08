import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useState } from 'react';
import { FieldContainer } from './styles';
import { FormInputControlled } from '../../../Form/Input';
import { EnvelopeIcon, LockIcon } from '../../../../Icons';
import { CommonErrorTexts } from '../../../Form';
import { DialogActions } from '../../../DialogActions';
import { DialogDescription } from '../../../DialogDescription';

type FormFieldProp = {
  text: string;
};

type ButtonProp = {
  text: string;
};

export type ChangeEmailFormTexts = {
  formFields: {
    newEmailAddress: FormFieldProp;
    password: FormFieldProp;
  };
  buttons: {
    confirm: ButtonProp;
    cancel: ButtonProp;
  };
};

export type FormFields = {
  email: string;
  password: string;
};

export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;

type ChangeEmailFormProps = (
  & ChangeEmailFormTexts
  & {
    handleCancel: () => void;
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
    description: {
      text: string;
    };
  }
);


const defaultValues: FormFields = {
  email: '',
  password: '',
};


export const ChangeEmailForm = ({
  formFields,
  buttons,
  handleCancel,
  commonErrorTexts,
  handleSubmit: handleSubmitProp,
  description,
}: ChangeEmailFormProps) => {
  const [errors, setErrors] = useState<FormFieldsErrors>({});

  const schema = z.object({
    email: z.email().min(1, commonErrorTexts.required),
    password: z.string().min(1, commonErrorTexts.required).min(1),
  } satisfies Record<keyof FormFields, z.ZodType>);

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
    <>
      <DialogDescription text={description.text} />

      <form className='Form' onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldContainer>
          <FormInputControlled
            startAdornment={<EnvelopeIcon />}
            text={formFields.newEmailAddress.text}
            name='email'
            control={control}
            serverError={errors?.email}
          />
          <FormInputControlled
            startAdornment={<LockIcon />}
            text={formFields.password.text}
            type='password'
            name='password'
            control={control}
            serverError={errors?.password}
          />
        </FieldContainer>

        <DialogActions
          primaryActionText={buttons.confirm.text}
          primaryButtonType='submit'
          secondaryActionText={buttons.cancel.text}
          onSecondaryAction={handleCancel}
        />
      </form>
    </>
  );
};
