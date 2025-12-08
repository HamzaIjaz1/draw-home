import { ToolbarButton } from '@draw-house/ui/dist/components';
import { useGlobalSettings } from '../../zustand';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';

export const IsRoofActiveButton: React.FC = () => {
  const isVisible = useGlobalSettings(e => e.defaultRoof.isVisible);

  return (
    <Tooltip position='left' content={lang.tooltips.wallDrawToolbarRoof}>
      <ToolbarButton
        icon='roofOnly'
        state={isVisible === true ? 'active' : 'default'}
        onClick={() => {
          const { defaultRoof } = useGlobalSettings.getState();

          useGlobalSettings.setState({
            defaultRoof: {
              ...defaultRoof,
              isVisible: defaultRoof.isVisible === false,
            },
          });
        }}
      />
    </Tooltip>
  );
};
