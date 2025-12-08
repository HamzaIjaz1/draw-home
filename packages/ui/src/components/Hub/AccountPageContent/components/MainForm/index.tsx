import { WithClassName } from '@draw-house/common/dist/utils';
import { ButtonsContainer, Container, FieldContainer } from './styles';
import { FormInput } from '../../../Form/Input';
import { EnvelopeIcon, InformationIcon } from '../../../../Icons';
import { FormButton } from '../../../Form/Button';

type FormFieldProp = {
  text: string;
  value: string;
};

type ButtonProp = {
  text: string;
  handler: () => void;
};

export type MainFormProps = {
  formFields: {
    fullName: FormFieldProp;
    email: FormFieldProp;
  };
  buttons: {
    changeName: ButtonProp;
    changeEmail: ButtonProp;
    changePassword: ButtonProp;
  };
  passwordLess: boolean;
};


export const MainForm = ({
  className,
  formFields,
  buttons,
  passwordLess,
}: MainFormProps & WithClassName) => (
  <Container className={className}>
    <FieldContainer>
      <FormInput
        startAdornment={<InformationIcon />}
        text={formFields.fullName.text}
        disabled
        value={formFields.fullName.value}
      />
      <FormInput
        startAdornment={<EnvelopeIcon />}
        text={formFields.email.text}
        disabled
        value={formFields.email.value}
      />
    </FieldContainer>
    <ButtonsContainer>
      <FormButton text={buttons.changeName.text} size='large' onClick={buttons.changeName.handler} />
      {
        passwordLess === false && (
          <>
            <FormButton text={buttons.changeEmail.text} size='large' onClick={buttons.changeEmail.handler} />
            <FormButton text={buttons.changePassword.text} size='large' onClick={buttons.changePassword.handler} />
          </>
        )
      }
    </ButtonsContainer>
  </Container>
);
