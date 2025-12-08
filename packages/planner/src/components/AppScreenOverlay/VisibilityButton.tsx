import { IconButton } from '@draw-house/ui/dist/components';
import { useSlideUpMenuLvl1 } from '../../zustand';
import { toggleVisibilitySlideUpMenu } from '../../utils/handlerHelpers/toggleVisibilitySlideUpMenu';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';

export const VisibilityButton: React.FC = () => {
  const isOpened = useSlideUpMenuLvl1(s => s.slideUpMenuLvl1.type === 'visibilitySettings' && s.slideUpMenuLvl1.isOpened === true);

  return (
    <Hotkey position='left' label={lang.tooltips.visibilityMenuButton.hotkey}>
      <Tooltip position='left' content={lang.tooltips.visibilityMenuButton}>
        <IconButton
          icon='eye'
          state={isOpened === true ? 'active' : 'default'}
          onClick={toggleVisibilitySlideUpMenu}
        />
      </Tooltip>
    </Hotkey>
  );
};
