import { WithClassName } from '@draw-house/common/dist/utils';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { DrawHouseIcon } from '../../Icons';
import { MenuOptions, MenuOptionsProps } from '../MenuOptions';
import { Container, MainHeading } from './styles';

export type MenuCategoriesProps = {
  appName: string;
  options: MenuOptionsProps['options'];
  appLogoLink: string;
  closeMenu: () => void;
};

export const MenuCategories = ({
  className,
  appName,
  options,
  appLogoLink,
  closeMenu,
}: MenuCategoriesProps & WithClassName) => (
  <Container className={className}>
    <Link href={appLogoLink} underline='none'>
      <Stack direction='row' alignItems='flex-end' gap='0'>
        <DrawHouseIcon />
        <MainHeading>{appName}</MainHeading>
      </Stack>
    </Link>

    <MenuOptions
      options={options}
      closeMenu={closeMenu}
    />
  </Container>
);
