import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';

const Text = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

export type MenuItemTitleProps = {
  children: React.ReactNode;
};

export const MenuItemTitle = ({ className, children }: MenuItemTitleProps & WithClassName) => (
  <Text className={className}>{children}</Text>
);
