import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';

const Text = styled('span')(({ theme }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
`);

export type SettingsSpaceTitleProps = {
  children: React.ReactNode;
};

export const SettingsSpaceTitle = ({ className, children }: SettingsSpaceTitleProps & WithClassName) => (
  <Text className={className}>{children}</Text>
);
