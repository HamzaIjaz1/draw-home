import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { useState } from 'react';
import { styled } from '@mui/material';
import { FormInputControlled } from '../../Form/Input';
import { CommonErrorTexts } from '../../Form';
import { DialogActions } from '../../DialogActions';

const FieldContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 60px;
`;

type FormFieldProp = {
  text: string;
};

type ButtonProp = {
  text: string;
};

export type ChangeNameFormTexts = {
  formFields: {
    name: FormFieldProp;
  };
  buttons: {
    confirm: ButtonProp;
    cancel: ButtonProp;
  };
};

export type FormFields = {
  name: string;
};

export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;

type ChangeNameFormProps = (
  & ChangeNameFormTexts
  & {
    handleCancel: () => void;
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
  }
);

const defaultValues: FormFields = {
  name: '',
};

export const ChangeNameForm = ({
  formFields,
  buttons,
  handleCancel,
  commonErrorTexts,
  handleSubmit: handleSubmitProp,
}: ChangeNameFormProps) => {
  const [errors, setErrors] = useState<FormFieldsErrors>({});

  const schema = z.object({
    name: z.string().min(1, commonErrorTexts.required),
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
    <form className='Form' onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldContainer>
        <FormInputControlled
          text={formFields.name.text}
          name='name'
          control={control}
          serverError={errors?.name}
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
