import { ChangeEvent } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { InputField } from '../InputField';
import { AvatarIcon, CrossOldIcon, EmailIcon, GoogleIcon, LockIcon } from '../Icons';
import {
  ButtonsSection,
  ChangeSignTypeButton,
  ChangeSignTypeWrapper,
  ConfirmationButtons,
  FormAndButtonsSection,
  FormSection,
  IconButton,
  InformationLayout,
  InformationSection,
  LogoWrapper,
  SocialButtons,
  StyledCloseButton,
  StyledConfirmationButton,
  StyledDrawHouseIcon,
  Title,
} from './styles';
import { FormDataKeys } from './useSign';

type CloseButtonProps = {
  onClick?: () => void;
  hideOnLaptop?: true;
};
export const CloseButton = (props: CloseButtonProps & WithClassName) => (
  <StyledCloseButton className={props.className} $hideOnLaptop={props.hideOnLaptop} onClick={props.onClick}>
    <CrossOldIcon />
  </StyledCloseButton>
);

type InformationBlockProps = {
  type: 'login' | 'register';
  formData: any;
  errors: any;
  texts: any;
  onInputChange: (field: FormDataKeys) => (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onChangeTypeOfSign: () => void;
  face?: true;
  withAllowingTab: boolean;
  onGoogleClick: () => void;
  onCloseModal: () => void;
  onContinueAsGuest: () => void;
};

const InformationBlock: React.FC<InformationBlockProps> = ({
  type,
  formData,
  errors,
  onInputChange,
  onSubmit,
  onChangeTypeOfSign,
  texts,
  face,
  withAllowingTab,
  onGoogleClick,
  onCloseModal,
  onContinueAsGuest,
}) => {
  const isRegister = type === 'register';

  return (
    <InformationLayout $face={face} $shown={withAllowingTab}>
      <InformationSection>
        <LogoWrapper>
          <StyledDrawHouseIcon />
          <p>DrawHome</p>
        </LogoWrapper>
        <Title>{texts[type].title}</Title>
        <FormAndButtonsSection>
          <FormSection>
            {
              !!isRegister && (
                <InputField
                  onChange={onInputChange('name')}
                  value={formData.name}
                  error={errors.name}
                  placeholder='Full name'
                  icon={<AvatarIcon />}
                  tabIndex={withAllowingTab ? 0 : -1}
                />
              )
            }
            <InputField
              onChange={onInputChange('email')}
              value={formData.email}
              error={errors.email}
              placeholder='Email Address'
              icon={<EmailIcon />}
              tabIndex={withAllowingTab ? 0 : -1}
            />
            <InputField
              hideValue
              onChange={onInputChange('password')}
              value={formData.password}
              error={errors.password}
              placeholder='Password'
              icon={<LockIcon />}
              tabIndex={withAllowingTab ? 0 : -1}
            />
            {
              !!isRegister && (
                <InputField
                  hideValue
                  onChange={onInputChange('repeatPassword')}
                  value={formData.repeatPassword}
                  error={errors.repeatPassword}
                  placeholder='Repeat Password'
                  icon={<LockIcon />}
                  tabIndex={withAllowingTab ? 0 : -1}
                />
              )
            }
          </FormSection>
          <ButtonsSection>
            <SocialButtons>
              <IconButton variant='withIcon' tabIndex={withAllowingTab ? 0 : -1} onClick={onGoogleClick}>
                <GoogleIcon />
              </IconButton>
            </SocialButtons>
            <ConfirmationButtons>
              <StyledConfirmationButton variant='primary' onClick={onSubmit} tabIndex={withAllowingTab ? 0 : -1}>
                {
                  texts[type].primaryButton
                }
              </StyledConfirmationButton>
              <StyledConfirmationButton variant='outlined' onClick={onContinueAsGuest} tabIndex={withAllowingTab ? 0 : -1}>
                {
                  texts[type].secondaryButton
                }
              </StyledConfirmationButton>
            </ConfirmationButtons>
            <ChangeSignTypeWrapper>
              <p>
                {
                  texts[type].changeSignType
                }
              </p>
              <ChangeSignTypeButton onClick={onChangeTypeOfSign} tabIndex={withAllowingTab ? 0 : -1}>
                {
                  texts[type].changeSignTypeButton
                }
              </ChangeSignTypeButton>
            </ChangeSignTypeWrapper>
          </ButtonsSection>
        </FormAndButtonsSection>
        <CloseButton hideOnLaptop onClick={onCloseModal} />
      </InformationSection>
    </InformationLayout>
  );
};

export default InformationBlock;
