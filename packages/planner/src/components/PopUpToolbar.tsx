import { PopUpToolbar as UIPopUpToolbar } from '@draw-house/ui/dist/components';
import { isNull } from '@arthurka/ts-utils';
import { usePopUpToolbar, useViewMode } from '../zustand';
import { useCanMoveWall } from '../zustand/useCanMoveWall';
import { makePopUpToolbarItems } from '../utils';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';

export const PopUpToolbar: React.FC = () => {
  const { popUpToolbar } = usePopUpToolbar();
  const { canMoveWall } = useCanMoveWall();
  const { viewMode } = useViewMode();
  const { strapiAppConfig } = useStrapiAppConfigResolved();

  return !isNull(popUpToolbar) && (
    <UIPopUpToolbar
      x={popUpToolbar.coords.x}
      y={popUpToolbar.coords.y - 15}
      items={makePopUpToolbarItems({ popUpToolbar, canMoveWall, viewMode, strapiAppConfig })}
    />
  );
};
