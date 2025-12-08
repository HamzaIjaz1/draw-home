import { WithClassName } from '@draw-house/common/dist/utils';
import Stack from '@mui/material/Stack';
import { isNull } from '@arthurka/ts-utils';
import { MenuOptions, MenuOptionsProps } from '../MenuOptions';
import {
  Avatar,
  Chip,
  ChipText,
  Container,
  MainHeading,
  SecondaryHeading,
} from './styles';

export type MenuAccountProps = {
  user: null | {
    name: string;
    email: string;
    avatar: string | null;
  };
  options: MenuOptionsProps['options'];
  planBadgeText: string;
  guestProfileText: string;
  closeMenu: () => void;
};

export const MenuAccount = ({
  className,
  user,
  options,
  planBadgeText,
  guestProfileText,
  closeMenu,
}: MenuAccountProps & WithClassName) => (
  <Container className={className}>
    {
      isNull(user) ? (
        <MainHeading>{guestProfileText}</MainHeading>
      ) : (
        <Stack gap='16px'>
          <Stack direction='row' alignItems='center' gap='16px'>
            <Avatar src={isNull(user.avatar) ? '' : user.avatar} alt={user.name} />
            <Chip
              label={<ChipText>{planBadgeText}</ChipText>}
              variant='outlined'
              color='primary'
            />
          </Stack>

          <Stack>
            <MainHeading>{user.name}</MainHeading>
            <SecondaryHeading>{user.email}</SecondaryHeading>
          </Stack>
        </Stack>

      )
    }

    <MenuOptions
      options={options}
      closeMenu={closeMenu}
    />
  </Container>
);
