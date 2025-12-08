import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

const Text = styled(Typography)(({ theme }) => css`
  color: ${theme.palette.text.disabled};
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  margin-bottom: 16px;
  overflow-wrap: anywhere;
`);

export type DialogDescriptionProps = {
  text: string;
};

export const DialogDescription = ({
  className,
  text,
}: DialogDescriptionProps & WithClassName) => (
  <Text className={className}>{text}</Text>
);
