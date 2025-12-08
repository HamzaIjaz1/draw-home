import { IconButton } from '@draw-house/ui/dist/components';
import { useSlideUpMenuLvl1 } from '../../zustand';
import { toggleLevelsSlideUpMenu } from '../../utils/handlerHelpers/toggleLevelsSlideUpMenu';
import { Hotkey } from '../Hotkey';
import { lang } from '../../lang';
import { Tooltip } from '../Tooltip';

export const LevelButton: React.FC = () => {
  const isOpened = useSlideUpMenuLvl1(s => s.slideUpMenuLvl1.type === 'levels' && s.slideUpMenuLvl1.isOpened === true);

  return (
    <Hotkey position='left' label={lang.tooltips.levelsMenuButton.hotkey}>
      <Tooltip position='left' content={lang.tooltips.levelsMenuButton}>
        <IconButton
          icon='layers'
          state={isOpened === true ? 'active' : 'default'}
          onClick={toggleLevelsSlideUpMenu}
        />
      </Tooltip>
    </Hotkey>
  );
};
