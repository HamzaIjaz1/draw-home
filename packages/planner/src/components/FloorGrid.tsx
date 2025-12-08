import { Grid } from '@react-three/drei';
import { BackSide, DoubleSide } from 'three';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { floorSquareSize } from '../constants';
import { useIsFloorGridShown } from '../customHooks';
import { useGlobalSettings } from '../zustand';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';

export const FloorGrid: React.FC<{ elevation: number }> = ({ elevation }) => {
  const isGridShown = useGlobalSettings(s => s.isGridShown);
  const gridSpacing = useGlobalSettings(s => s.gridSpacing);
  const isOutlinesTurnedOn = useGlobalSettings(s => s.isOutlinesTurnedOn);
  const { strapiAppConfig } = useStrapiAppConfigResolved();
  const { isFloorGridShown } = useIsFloorGridShown();

  return isGridShown === true && isFloorGridShown === true && (
    <Grid
      userData={{ isNotPartOfLevelObjects: true }}
      sectionThickness={0}
      position-y={elevation}
      args={[floorSquareSize, floorSquareSize]}
      side={NODE_ENV === 'production' ? BackSide : DoubleSide}
      cellColor='#e6e6e6'
      cellSize={gridSpacing}
      cellThickness={isOutlinesTurnedOn === true && strapiAppConfig.enableOutlinesFeature === true ? 2 : 1}
    />
  );
};
