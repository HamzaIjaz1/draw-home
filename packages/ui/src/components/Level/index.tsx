import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { IconButton } from '../IconButton';
import {
  Container,
  RightControls,
  SubTitle,
  Title,
  Titles,
} from './styles';

export type LevelProps = {
  title: string;
  subtitle: string;
  visible: boolean;
  showTransparencyOption: boolean;
  transparent: boolean;
  onTransparencyClick: () => void;
  onVisibilityChange: () => void;
  onSettingsClick: () => void;
  onDuplicationClick: () => void;
};

export const Level = ({
  className,
  title,
  subtitle,
  visible,
  showTransparencyOption,
  transparent,
  onVisibilityChange,
  onSettingsClick,
  onTransparencyClick,
  onDuplicationClick,
}: LevelProps & WithClassName) => {
  const theme = useTheme();

  return (
    <Container className={className}>
      <IconButton
        icon={visible === true ? 'eye' : 'eyeClosed'}
        state={visible === true ? 'active' : 'default'}
        size='sm'
        iconColors={{ default: theme.palette.text.disabled }}
        variant='text'
        onClick={e => {
          e.stopPropagation();
          onVisibilityChange();
        }}
      />

      <Titles>
        <Title noWrap>{title}</Title>
        <SubTitle noWrap>{subtitle}</SubTitle>
      </Titles>

      <RightControls>
        {showTransparencyOption === true && (
          <IconButton
            icon={transparent === true ? 'transparency' : 'noTransparency'}
            state={transparent === true ? 'active' : 'default'}
            size='sm'
            variant='text'
            iconColors={{ default: theme.palette.text.disabled }}
            onClick={e => {
              e.stopPropagation();
              onTransparencyClick();
            }}
          />
        )}
        <IconButton
          icon='gear'
          state='active'
          size='sm'
          variant='text'
          onClick={e => {
            e.stopPropagation();
            onSettingsClick();
          }}
        />
        <IconButton
          icon='duplicate'
          state='active'
          size='sm'
          variant='text'
          onClick={e => {
            e.stopPropagation();
            onDuplicationClick();
          }}
        />
      </RightControls>
    </Container>
  );
};
