import { IconButton } from '@draw-house/ui/dist/components';
import { useSlideUpMenuLvl1 } from '../../zustand';
import { useStrapiAppConfigResolved } from '../../zustand/useStrapiAppConfig';
import { toggleAiToolsSlideUpMenu } from '../../utils/handlerHelpers/toggleAiToolsSlideUpMenu';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';

export const AiToolsButton: React.FC = () => {
  const isOpened = useSlideUpMenuLvl1(s => s.slideUpMenuLvl1.type === 'aiTools' && s.slideUpMenuLvl1.isOpened === true);
  const { strapiAppConfig } = useStrapiAppConfigResolved();

  return strapiAppConfig.enableFloorPlanAIFeature === true && (
    <Hotkey position='left' label={lang.tooltips.aiMenuButton.hotkey}>
      <Tooltip position='left' content={lang.tooltips.aiMenuButton}>
        <IconButton
          icon='stars'
          state={isOpened === true ? 'active' : 'default'}
          onClick={toggleAiToolsSlideUpMenu}
        />
      </Tooltip>
    </Hotkey>
  );
};
