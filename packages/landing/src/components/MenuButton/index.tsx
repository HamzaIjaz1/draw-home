import { FC } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import styled from 'styled-components';
import { BurgerIcon, CrossIcon } from '../Icons';
import { primaryColor } from '../../commonStyles';

const Button = styled.button`
  all: unset;
  width: 44px;
  height: 44px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #222733;
  border-radius: 100px;
  cursor: pointer;

  &:active {
    color: ${primaryColor};
  }
`;

const icons = {
  burger: BurgerIcon,
  cross: CrossIcon,
};

type MenuButtonProps = {
  icon: keyof typeof icons;
  onClick: () => void;
};

export const MenuButton: FC<MenuButtonProps & WithClassName> = ({
  className,
  icon,
  onClick,
}) => {
  const Icon = icons[icon];

  return (
    <Button
      className={className}
      onClick={onClick}
    >
      <Icon />
    </Button>
  );
};
