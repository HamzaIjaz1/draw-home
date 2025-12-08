import { WithClassName } from '@draw-house/common/dist/utils';
import {
  CoinIcon,
  LogOutIcon,
  PersonIcon,
  ProjectsIcon,
  QuestionMarkIcon,
  TeamIcon,
} from '../../Icons';
import { iconColorCssVariable, StyledLink, Text } from './styles';
import { getCssVar } from '../../../utils/styles';

const icons = {
  person: PersonIcon,
  logout: LogOutIcon,
  projects: ProjectsIcon,
  team: TeamIcon,
  coin: CoinIcon,
  questionMark: QuestionMarkIcon,
};

export type LinkProps = {
  href: string;
  text: string;
  icon: keyof typeof icons;
  state?: 'default' | 'active';
};

export const Link = ({
  className,
  href,
  icon,
  text,
  state = 'default',
}: LinkProps & WithClassName) => {
  const Icon = icons[icon];
  const active = state === 'active';

  return (
    <StyledLink
      className={className}
      href={href}
      active={active}
    >
      <Icon color={getCssVar(iconColorCssVariable)} />
      <Text active={active} noWrap>{text}</Text>
    </StyledLink>
  );
};
