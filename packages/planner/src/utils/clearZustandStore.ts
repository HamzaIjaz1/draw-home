import { createProjectHashWithReset, useAmountCounters, useCreationMode, useCustomModels, useGlobalSettings, useLevels, useMyProjects, useNewCustomModelUploadData, useOnboardingJourneyEvents, usePopUpToolbar, useSlideUpMenuLvl1, useSlideUpMenuLvl2, useSpaces, useTempWallFurniture, useTempWalls, useUndoRedo, useViewMode, useWallMover, useWalls } from '../zustand';
import { useNewCustomModel } from '../zustand/useNewCustomModel';
import { useRoofs } from '../zustand/useRoofs';
import { useRoofsWallSubtraction } from '../zustand/useRoofsWallSubtraction';
import { useStairs } from '../zustand/useStairs';

export const clearZustandStore = async () => {
  useWalls.setState(useWalls.getInitialState());
  useGlobalSettings.setState(useGlobalSettings.getInitialState());

  useCreationMode.setState(useCreationMode.getInitialState());
  useMyProjects.setState(useMyProjects.getInitialState());
  usePopUpToolbar.setState(usePopUpToolbar.getInitialState());
  useSlideUpMenuLvl1.setState(useSlideUpMenuLvl1.getInitialState());
  useSlideUpMenuLvl2.setState(useSlideUpMenuLvl2.getInitialState());
  useTempWallFurniture.setState(useTempWallFurniture.getInitialState());
  useTempWalls.setState(useTempWalls.getInitialState());
  useViewMode.setState(useViewMode.getInitialState());
  useWallMover.setState(useWallMover.getInitialState());
  useCustomModels.setState(useCustomModels.getInitialState());
  useLevels.setState(useLevels.getInitialState());
  useSpaces.setState(useSpaces.getInitialState());
  useNewCustomModelUploadData.setState(useNewCustomModelUploadData.getInitialState());
  useAmountCounters.setState(useAmountCounters.getInitialState());
  useNewCustomModel.setState(useNewCustomModel.getInitialState());
  useStairs.setState(useStairs.getInitialState());
  useRoofs.setState(useRoofs.getInitialState());
  useRoofsWallSubtraction.setState(useRoofsWallSubtraction.getInitialState());
  useOnboardingJourneyEvents.setState(useOnboardingJourneyEvents.getInitialState());

  useUndoRedo.setState(useUndoRedo.getInitialState());

  await createProjectHashWithReset();
};
