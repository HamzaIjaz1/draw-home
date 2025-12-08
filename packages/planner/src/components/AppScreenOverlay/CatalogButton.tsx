import { IconButton } from '@draw-house/ui/dist/components';
import { isNull } from '@arthurka/ts-utils';
import { useSlideUpMenuLvl1 } from '../../zustand';
import { useNewCustomModel } from '../../zustand/useNewCustomModel';
import { toggleCatalogSlideUpMenu } from '../../utils/handlerHelpers/toggleCatalogSlideUpMenu';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';

export const CatalogButton: React.FC = () => {
  const isOpened = useSlideUpMenuLvl1(s => s.slideUpMenuLvl1.type === 'catalog' && s.slideUpMenuLvl1.isOpened === true);
  const { newCustomModel } = useNewCustomModel();

  return (
    <Hotkey position='left' label={lang.tooltips.catalogButton.hotkey}>
      <Tooltip position='left' content={lang.tooltips.catalogButton}>
        <IconButton
          icon={isNull(newCustomModel) ? 'plus' : 'close'}
          variant='outlined'
          state={isNull(newCustomModel) && isOpened === true ? 'active' : 'default'}
          onClick={toggleCatalogSlideUpMenu}
        />
      </Tooltip>
    </Hotkey>
  );
};
