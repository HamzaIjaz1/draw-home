import { isNull } from '@arthurka/ts-utils';
import { H } from 'highlight.run';
import { HIGHLIGHT_PROJECT_ID, NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { useRef } from 'react';
import { Group } from 'three';
import { useUser } from '../../zustand';
import { UI } from '../UI';
import { CustomEnvironment } from '../CustomEnvironment';
import { Camera } from '../Camera';
import { Helpers } from '../Helpers';
import { WallCreationPlane } from '../WallCreationPlane';
import { Walls } from '../Walls';
import { Floors } from '../Floors';
import { Roofs } from '../Roofs';
import { BeforeUnloadCheck } from '../BeforeUnloadCheck';
import { BorderSphere } from '../BorderSphere';
import { CustomModels } from '../CustomModels';
import { R3FDataChange } from '../R3FDataChange';
import { useCatalogData } from '../../zustand/useCatalogData';
import { Spaces } from '../Spaces';
import { NewCustomModelPlane } from '../NewCustomModelPlane';
import { Stairs } from '../Stairs';
import { NewCustomModelGhost } from '../NewCustomModelGhost';
import { Ceilings } from '../Ceilings';
import { CustomCanvas } from '../CustomCanvas';
import { GlobalStyles } from '../GlobalStyles';
import { useLoadAppRunNecessaryData } from '../../customHooks/useLoadAppRunNecessaryData';
import { useTextureAssets } from '../../zustand/useTextureAssets';
import { OutlinePostProcessing } from '../OutlinePostProcessing';
import { isResolved } from '../../utils/isResolved';
import { useQuickTourData } from '../../zustand/useQuickTourData';
import { useModelTextureOverlays } from '../../zustand/useModelTextureOverlays';
import { useFeatureTips } from '../../zustand/useFeatureTips';
import { Hotkeys } from '../Hotkeys';
import { MousePositionOnWindowTracker } from '../MousePositionOnWindowTracker';
import { ActiveRaycasterLayersManager } from '../ActiveRaycasterLayersManager';
import { PlacementAreaPreview } from '../PlacementAreaPreview';
import { TempWallFurniturePreview } from '../Walls/WallFurnitures/TempWallFurniturePreview';
import { usePaymentPlans } from '../../zustand/usePaymentPlans';
import { LevelRailsPublisher } from '../LevelRailsPublisher';
import { LevelPlanesOverlay } from '../LevelPlanesOverlay';
import { LevelPlanesPublisher } from '../LevelPlanesPublisher';
import { InstancingHost } from '../Instancing/InstancingHost';
import { TempRoofDormerPreview } from '../Roofs/TempRoofDormerPreview';

export const AppPage: React.FC = () => {
  useLoadAppRunNecessaryData();

  const { textureAssets } = useTextureAssets();
  const { catalogData } = useCatalogData();
  const { quickTourData } = useQuickTourData();
  const { featureTips } = useFeatureTips();
  const { modelTextureOverlays } = useModelTextureOverlays();
  const { paymentPlans } = usePaymentPlans();
  const { user } = useUser();
  const levelTargetGroupRef = useRef<Group>(null);

  if(NODE_ENV === 'production') {
    H.init(HIGHLIGHT_PROJECT_ID, {
      enableCanvasRecording: true,
      samplingStrategy: {
        canvas: 2,
        canvasMaxSnapshotDimension: 480,
      },
    });
  }

  return (
    true
      && isResolved(catalogData)
      && isResolved(textureAssets)
      && isResolved(quickTourData)
      && isResolved(featureTips)
      && isResolved(modelTextureOverlays)
      && isResolved(paymentPlans)
      && !isNull(user)
      && (
        <>
          <GlobalStyles />
          <UI />
          <BeforeUnloadCheck />
          <Hotkeys />
          <MousePositionOnWindowTracker />
          <CustomCanvas>
            <R3FDataChange />
            <ActiveRaycasterLayersManager />
            <PlacementAreaPreview />
            <TempWallFurniturePreview />
            <TempRoofDormerPreview />
            <BorderSphere />
            <CustomEnvironment />
            <Camera />
            <Helpers />
            <WallCreationPlane />
            <group ref={levelTargetGroupRef}>
              <Walls />
              <Floors />
              <Ceilings />
              <Roofs />
              <Spaces />
              <Stairs />
            </group>
            <CustomModels />
            <NewCustomModelPlane />
            <NewCustomModelGhost />
            <InstancingHost />
            <OutlinePostProcessing />
            <LevelPlanesOverlay levelTargetGroupRef={levelTargetGroupRef} />
            <LevelPlanesPublisher levelTargetGroupRef={levelTargetGroupRef} />
            <LevelRailsPublisher levelTargetGroupRef={levelTargetGroupRef} />
          </CustomCanvas>
        </>
      )
  );
};
