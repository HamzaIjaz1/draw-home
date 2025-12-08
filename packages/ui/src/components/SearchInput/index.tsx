import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { SearchInputIcon } from '../Icons';

const StyledInput = styled(InputBase)(({ theme }) => css`
  & .MuiInputBase-input {
    border-radius: 10px;
    background-color: #f3f3f3;
    border: none;
    font-size: 16px;
    height: 40px;
    padding: 0 0 0 40px;
  }
  & ::placeholder {
    color: ${theme.palette.text.disabled};
    opacity: 1;
    font-weight: 400;
  }
`);

const StyledAdornment = styled('div')`
  position: absolute;
  width: 40px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

export type SearchInputProps = {
  placeholder: string;
  value: string;
  setValue: (val: string) => void;
};

export const SearchInput = ({
  className,
  placeholder,
  value,
  setValue,
}: SearchInputProps & WithClassName) => (
  <StyledInput
    className={className}
    placeholder={placeholder}
    fullWidth
    startAdornment={
      <StyledAdornment>
        <SearchInputIcon />
      </StyledAdornment>
    }
    value={value}
    onChange={e => setValue(e.target.value)}
  />
);
