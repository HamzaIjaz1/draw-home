import { css, darken, styled } from '@mui/material';
import { Icon } from './Icons';

const gray = '#f3f3f3';

export const Container = styled('div')`
  position: relative;
  background-color: ${gray};
  border-radius: 6px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #ebebeb;
  }
`;

export const DropdownSelect = styled('select')(({ theme }) => css`
  width: 140px;
  height: 32px;

  padding: 4px 24px 4px 10px;

  appearance: none;
  user-select: none;
  cursor: pointer;
  border: 0;
  outline: 0;
  border-radius: 6px;

  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: right;
  color: ${theme.palette.text.primary};

  background-color: ${gray};
  :focus, :hover {
    background-color: ${darken(gray, 0.03)};
  }
`);

export const Option = styled('option')`
  background-color: ${gray};
`;

export const ArrowIcon = styled(Icon)(({ theme }) => css`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  color: ${theme.palette.primary.main};
  pointer-events: none;
`);
