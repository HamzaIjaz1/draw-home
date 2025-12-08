import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useState } from 'react';
import { FieldContainer } from './styles';
import { FormInputControlled } from '../../../Form/Input';
import { LockIcon } from '../../../../Icons';
import { CommonErrorTexts } from '../../../Form';
import { DialogActions } from '../../../DialogActions';
import { DialogDescription } from '../../../DialogDescription';

type FormFieldProp = {
  text: string;
};

type ButtonProp = {
  text: string;
};

export type DeleteAccountFormTexts = {
  formFields: {
    password: FormFieldProp;
  };
  buttons: {
    confirm: ButtonProp;
    cancel: ButtonProp;
  };
};

export type FormFields = {
  password: string;
};

export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;

type DeleteAccountFormProps = (
  & DeleteAccountFormTexts
  & {
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
    handleCancel: () => void;
    description: {
      text: string;
      text2: string;
    };
    passwordLess: boolean;
  }
);


const defaultValues: FormFields = {
  password: '',
};


export const DeleteAccountForm = ({
  formFields,
  buttons,
  commonErrorTexts,
  handleSubmit: handleSubmitProp,
  handleCancel,
  description,
  passwordLess,
}: DeleteAccountFormProps) => {
  const [errors, setErrors] = useState<FormFieldsErrors>({});

  const schema = z.object({
    password: passwordLess === false ? z.string().min(1, commonErrorTexts.required) : z.string(),
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
      <DialogDescription
        text={`${description.text} ${passwordLess === false ? description.text2 : ''}`}
      />

      <form className='Form' onSubmit={handleSubmit(onSubmit)} noValidate>
        {passwordLess === false && (
          <FieldContainer>
            <FormInputControlled
              startAdornment={<LockIcon />}
              text={formFields.password.text}
              name='password'
              type='password'
              control={control}
              serverError={errors?.password}
            />
          </FieldContainer>
        )}

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
