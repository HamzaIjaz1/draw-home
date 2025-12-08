import { WithClassName } from '@draw-house/common/dist/utils';
import styled from 'styled-components';

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  pointer-events: none;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;


const Icon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='.65' y='.65' width='16.7' height='16.7' rx='3.35' stroke='currentcolor' strokeWidth='1.3' />
  </svg>
);

const CheckedIcon = () => (
  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='18' height='18' rx='4' fill='currentcolor' />
    <path d='m13.199 6.117-5.775 5.775-2.625-2.625' stroke='#fff' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const iconJSX = <Icon />;
const checkedIconJSX = <CheckedIcon />;

export type CheckboxInputProps = {
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckboxInput: React.FC<CheckboxInputProps & WithClassName> = ({
  className,
  name,
  checked,
  onChange,
}) => (
  <IconWrapper className={className}>
    <HiddenCheckbox
      name={name}
      checked={checked}
      onChange={onChange}
    />

    {checked === true ? checkedIconJSX : iconJSX}
  </IconWrapper>
);
