import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import MuiTextField from '@mui/material/TextField';

const TextField = styled(MuiTextField)`
  width: 100%;
  & > div {
    padding: 6px 6.5px;
  }
`;

export type PromptTextAreaProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export const PromptTextArea = ({
  className,
  value,
  onChange,
  placeholder,
}: PromptTextAreaProps & WithClassName) => (
  <TextField
    className={className}
    variant='filled'
    multiline
    minRows={3}
    maxRows={5}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
  />
);
