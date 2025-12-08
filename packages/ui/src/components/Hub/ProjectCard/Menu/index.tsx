import { WithClassName } from '@draw-house/common/dist/utils';
import { ClassNames } from '@emotion/react';
import { useTheme } from '@mui/material';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { getCssVar } from '../../../../utils/styles';
import {
  BinIcon,
  Container,
  getIconCss,
  iconCssVariable,
  ListItemIcon,
  MenuItem,
  MenuList,
  PencilIcon,
  Text,
} from './styles';

const icons = {
  pencil: PencilIcon,
  bin: BinIcon,
};

const Icon = ({ name }: { name: keyof typeof icons }) => {
  const Icon = icons[name];
  const theme = useTheme();
  const style = getIconCss(theme);

  return (
    <ClassNames>
      {({ css }) => (
        <Icon className={css(style)} color={getCssVar(iconCssVariable)} />
      )}
    </ClassNames>
  );
};

export type MenuProps = {
  onClose: () => void;
  items: Array<{
    title: string;
    onClick: () => void;
    icon: keyof typeof icons;
  }>;
};

export const Menu = ({
  className,
  items,
  onClose,
}: MenuProps & WithClassName) => (
  <ClickAwayListener onClickAway={onClose}>
    <Container className={className}>
      <MenuList>
        {items.map(({ icon, title, onClick }) => (
          <MenuItem
            key={`${icon}${title}`}
            tabIndex={0}
            onClick={() => {
              onClose();
              onClick();
            }}
          >
            <ListItemIcon>
              <Icon name={icon} />
            </ListItemIcon>
            <Text noWrap>{title}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Container>
  </ClickAwayListener>
);
