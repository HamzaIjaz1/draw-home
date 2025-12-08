import { ChangeEventHandler, useState } from 'react';
import styled, { css } from 'styled-components';
import { WithClassName } from '@draw-house/common/dist/utils';
import { breakpointMd, primaryColor } from '../../commonStyles';
import { CrossedEyeIcon, EyeIcon } from '../Icons';
import { SofiaPro } from '../../fonts';

const textColorLightGray = 'rgb(139, 142, 146)';

const InputContainer = styled.div<{ $error?: string }>`
  position: relative;
  ${p => p.$error && css`
    &::after {
      content: '${p.$error}';
      height: 15px;
      width: 100%;
      position: absolute;
      bottom: -15px;
      left: 0;
      font-family: ${SofiaPro};
      font-size: 12px;
      color: red;
    }
  `}
`;

const StyledInput = styled.input<{ $withIcon: boolean; $hideValue?: boolean }>`
  width: 100%;
  padding: 10px ${p => p.$hideValue ? '40px' : '10px'} 10px ${p => p.$withIcon ? '40px' : '10px'};
  font-size: 16px;
  border: none;
  border-bottom: 2px solid #ccc;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-bottom: 2px solid ${primaryColor};
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -10px;
    font-size: 12px;
    color: ${primaryColor};
  }
`;

const Icon = styled.button<{ $right?: boolean; $pointers?: boolean }>`
  width: 30px;
  z-index: 10;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: ${p => p.$pointers ? 'auto' : 'none'};
  color: ${textColorLightGray};
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => css`
    ${p.$right ? `
      right: 0;
    ` : `
      left: 0;
    `}
  `}
`;

const Label = styled.label<{ $withIcon: boolean }>`
  position: absolute;
  left: ${p => p.$withIcon ? '40px' : '0'};
  top: 10px;
  transition: all 0.3s ease;
  pointer-events: none;

  font-family: ${SofiaPro};
  font-weight: 400;
  font-size: 15px;
  line-height: 1em;
  vertical-align: middle;
  color: #7a7e83;
  @media (min-width: ${breakpointMd}) {
    font-size: 17px;
  }
`;

type InputFieldProps = {
  icon?: JSX.Element;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  hideValue?: boolean;
  error?: string;
  tabIndex?: -1 | 0 | 1;
};
export const InputField: React.FC<InputFieldProps & WithClassName> = ({
  icon,
  placeholder,
  className,
  onChange,
  value,
  name,
  hideValue,
  error,
  tabIndex,
  ...props
}) => {
  const [shownHidden, setShownHidden] = useState(false);
  return (
    <InputContainer className={className} $error={error}>
      {!!icon && (
        <Icon tabIndex={-1}>
          {icon}
        </Icon>
      )}
      <StyledInput
        {...props}
        value={value}
        onChange={onChange}
        name={name}
        placeholder=' '
        $withIcon={!!icon}
        $hideValue={hideValue}
        type={hideValue && !shownHidden ? 'password' : 'text'}
        tabIndex={tabIndex}
      />
      <Label $withIcon={!!icon}>
        {
          placeholder
        }
      </Label>
      {!!hideValue && (
        <Icon
          $right
          $pointers
          onClick={() => setShownHidden(!shownHidden)}
          tabIndex={tabIndex}
        >
          {
            !shownHidden ? (
              <CrossedEyeIcon />
            ) : (
              <EyeIcon />
            )
          }
        </Icon>
      )}
    </InputContainer>
  );
};
