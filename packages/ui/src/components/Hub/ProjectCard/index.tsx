import { WithClassName } from '@draw-house/common/dist/utils';
import { useState } from 'react';
import { Union } from '@arthurka/ts-utils';
import { Menu, MenuProps } from './Menu';
import { getCssVar } from '../../../utils/styles';
import {
  Card,
  Image,
  Input,
  InputContainer,
  Link,
  MoreIcon,
  moreIconCssVariable,
  Title,
  TitleButton,
} from './styles';
import { usePrevious } from '../../../hooks/usePrevious';

type ExitModeParam = Union<(
  | { action: 'discard' }
  | { action: 'save'; value: string }
)>;

export type ProjectCardProps = {
  image: string;
  name: string;
  href: string;
  options: MenuProps['items'];
  nameEditMode: boolean;
  onNameEditModeExit: (params: ExitModeParam) => void;
};

export const ProjectCard = ({
  className,
  image,
  name,
  href,
  options,
  nameEditMode,
  onNameEditModeExit,
}: ProjectCardProps & WithClassName) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(name);

  const prevName = usePrevious(name);

  const nameHasChanged = prevName !== name;
  const localValueOutOfSync = value !== name;
  if(nameHasChanged && localValueOutOfSync) {
    setValue(name);
  }

  const saveOnExit = () => {
    const newValue = value.replace(/\s+/g, ' ').trim();
    onNameEditModeExit({ action: 'save', value: newValue });
    setValue(newValue);
  };

  const discardOnExit = () => {
    onNameEditModeExit({ action: 'discard' });
    setValue(name);
  };

  return (
    <Card className={className}>
      <Link href={href}>
        <Image src={image} />
      </Link>

      {nameEditMode === true ? (
        <InputContainer>
          <Input
            value={value}
            onBlur={saveOnExit}
            onChange={e => setValue(e.target.value)}
            onKeyUp={({ key }) => {
              if(key === 'Escape') {
                discardOnExit();
              }
              if(key === 'Enter') {
                saveOnExit();
              }
            }}
            autoFocus
          />
        </InputContainer>
      ) : (
        <TitleButton onClick={() => setOpen(!open)}>
          <Title noWrap>{name}</Title>
          <MoreIcon color={getCssVar(moreIconCssVariable)} />
        </TitleButton>
      )}

      {open === true ? (
        <Menu
          items={options}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </Card>
  );
};
