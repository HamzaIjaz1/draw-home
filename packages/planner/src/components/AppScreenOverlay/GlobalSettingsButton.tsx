import { IconButton } from '@draw-house/ui/dist/components';
import { useSlideUpMenuLvl1 } from '../../zustand';
import { toggleGlobalSettingsSlideUpMenu } from '../../utils/handlerHelpers/toggleGlobalSettingsSlideUpMenu';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';

export const GlobalSettingsButton: React.FC = () => {
  const isOpened = useSlideUpMenuLvl1(s => s.slideUpMenuLvl1.type === 'globalSettings' && s.slideUpMenuLvl1.isOpened === true);

  return (
    <Hotkey position='bottom' label={lang.tooltips.globalSettingsButton.hotkey}>
      <Tooltip position='bottom-to-left' content={lang.tooltips.globalSettingsButton}>
        <IconButton
          icon='gear'
          state={isOpened === true ? 'active' : 'default'}
          onClick={toggleGlobalSettingsSlideUpMenu}
        />
      </Tooltip>
    </Hotkey>
  );
};
