import { Control, Controller, FieldValues, Path, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { isUndefined } from '@arthurka/ts-utils';
import { PaperPlaneIcon } from '../../../Icons';
import { SocialMediaLinks } from '../../../SocialMediaLinks';
import { CONTACT_EMAIL } from '../../../../constants';
import { Checkbox, CheckboxErrorText, CheckboxLabel, CheckboxText, FormContent, IconContainer, Input, SocialMediaBlock, SubmitBlock, SubmitButton } from './styles';

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(5),
  subject: z.string().min(3),
  message: z.string(),
  agreement: z.boolean().refine(e => e === true, {
    message: 'You must agree to the terms',
  }),
});

export type FormFields = z.infer<typeof schema>;

const defaultValues: FormFields = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  agreement: false,
};

type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
};

const ControlledInput = <T extends FieldValues>({ name, control }: ControlledInputProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={
      ({
        field: { onChange, value, name },
        fieldState: { error },
      }) => (
        <Input
          onChange={onChange}
          value={value}
          name={name}
          placeholder={`${name.slice(0, 1).toLocaleUpperCase()}${name.slice(1)}`}
          error={error?.message}
        />
      )
    }
  />
);

export const Form: React.FC = () => {
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async data => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        comment: data.message,
      }),
    });


    if(response.ok === false) {
      const msg = `We apologize, but we are currently unable to process your request. Please try again later or contact us directly at ${CONTACT_EMAIL}`;
      alert(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormContent>
        <ControlledInput control={control} name='name' />
        <ControlledInput control={control} name='email' />
        <ControlledInput control={control} name='phone' />
        <ControlledInput control={control} name='subject' />
        <ControlledInput control={control} name='message' />

        <SubmitBlock>
          <Controller
            name='agreement'
            control={control}
            render={
              ({ field: { onChange, value, name }, fieldState: { error } }) => (
                <>
                  <CheckboxLabel>
                    <Checkbox
                      name={name}
                      checked={value}
                      onChange={onChange}
                    />
                    <CheckboxText>I agree that my data is <em>collected and stored</em></CheckboxText>
                  </CheckboxLabel>
                  {!isUndefined(error) && !isUndefined(error.message) && (
                    <CheckboxErrorText>{error.message}</CheckboxErrorText>
                  )}
                </>
              )
            }
          />

          <SubmitButton variant='primary' type='submit'>
            <span>Get in Touch</span>
            <IconContainer>
              <PaperPlaneIcon />
            </IconContainer>
          </SubmitButton>

          <SocialMediaBlock>
            <SocialMediaLinks />
          </SocialMediaBlock>
        </SubmitBlock>
      </FormContent>
    </form>
  );
};
