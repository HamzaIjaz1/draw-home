import { WithClassName } from '@draw-house/common/dist/utils';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';

export type TooltipButtonProps = {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = styled(IconButton)`
  padding: 4px;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const TooltipButton = ({ className, children, onClick }: TooltipButtonProps & WithClassName) => (
  <Button
    className={className}
    onClick={onClick}
  >
    {children}
  </Button>
);
