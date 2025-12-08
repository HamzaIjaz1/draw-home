import styled from 'styled-components';
import { Button } from '../../../Button';
import { InputField } from '../../../InputField';
import type { FormFields } from '.';
import { breakpointMd } from '../../../../commonStyles';
import { Europa, SofiaPro } from '../../../../fonts';
import { CheckboxInput } from '../../../CheckboxInput';

export const FormContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 30px;
  padding: 30px;
  max-width: 660px;

  @media (min-width: 740px) {
    justify-content: flex-start;
  }
  @media (min-width: ${breakpointMd}) {
    padding: 40px;
    gap: 30px 20px;
  }
`;

export const Input = styled(InputField)`
  width: fit-content;

  input {
    width: 298px;
    height: 50px;
  }

  @media (min-width: 740px) {
    input {
      width: 280px;
      height: 46px;
    }

    input[name="${'message' satisfies keyof FormFields}"] {
      width: 580px;
    }
  }
`;

export const SubmitBlock = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 24px;
  width: 298px;
  @media (min-width: 740px) {
    width: 580px;
  }
`;

export const SubmitButton = styled(Button)`
  width: 182px;
  height: 48px;

  && {
    color: #fff;
  }

  @media (min-width: ${breakpointMd}) {
    width: 239px;
    height: 58px;
  }
`;

export const IconContainer = styled.div`
  color: #fff;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  @media (min-width: 740px) {
    align-items: center;
  }
`;

export const Checkbox = styled(CheckboxInput)`
  color: #222733;
`;

export const CheckboxText = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #7a7e83;

  em {
    text-decoration: underline solid 1px;
    text-underline-position: under;
  }

  @media (min-width: ${breakpointMd}) {
    font-size: 18px;
  }
`;

export const CheckboxErrorText = styled.span`
  position: absolute;
  top: 45px;
  left: 0;
  font-family: ${SofiaPro};
  font-size: 12px;
  color: red;
  @media (min-width: 740px) {
    top: 25px;
  }
`;

export const SocialMediaBlock = styled.div`
  margin-top: 6px;
`;
