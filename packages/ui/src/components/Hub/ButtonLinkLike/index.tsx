import { WithClassName } from '@draw-house/common/dist/utils';
import {
  CoinIcon,
  DeleteIcon,
  LogOutIcon,
  PersonIcon,
  ProjectsIcon,
  QuestionMarkIcon,
  TeamIcon,
} from '../../Icons';
import { getCssVar } from '../../../utils/styles';
import { Button, iconColorCssVariable, Text, type Version } from './styles';

const icons = {
  person: PersonIcon,
  logout: LogOutIcon,
  projects: ProjectsIcon,
  team: TeamIcon,
  coin: CoinIcon,
  questionMark: QuestionMarkIcon,
  delete: DeleteIcon,
};

export type ButtonLinkLikeProps = {
  text: string;
  icon: keyof typeof icons;
  onClick: () => void;
  state?: 'default' | 'active';
  version?: Version;
};

export const ButtonLinkLike = ({
  className,
  icon,
  text,
  onClick,
  state = 'default',
  version = 'normal',
}: ButtonLinkLikeProps & WithClassName) => {
  const Icon = icons[icon];
  const active = state === 'active';

  return (
    <Button
      className={className}
      variant='text'
      onClick={onClick}
      active={active}
      disableRipple
      version={version}
    >
      <Icon color={getCssVar(iconColorCssVariable)} />
      <Text active={active} version={version} noWrap>
        {text}
      </Text>
    </Button>
  );
};
