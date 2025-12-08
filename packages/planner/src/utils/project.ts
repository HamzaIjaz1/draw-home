import { ProjectId, StrapiProjectId } from '@draw-house/common/dist/brands';
import { isNull } from '@arthurka/ts-utils';
import { ShouldBeNever } from '@draw-house/common/dist/utils';
import {
  deleteMyProject as _deleteMyProject,
  updateMyProject as _updateMyProject,
  createProject,
  getProject,
  queryParams,
} from '../services';
import { Project } from '../zod';
import { GlobalSettingsStore, useGlobalSettings } from '../zustand/useGlobalSettings/store';
import { useWalls } from '../zustand/useWalls/store';
import { useUndoRedo } from '../zustand/useUndoRedo';
import { createProjectHashWithReset } from '../zustand/useProjectHash';
import { useMyProjects } from '../zustand/useMyProjects/store';
import { useMyProjectsResolved } from '../zustand/useMyProjects/requestToLoad';
import { useCustomModels } from '../zustand/useCustomModels/store';
import { createProjectDataForSave } from './createProjectData';
import { useLevels } from '../zustand/useLevels/store';
import { useSpaces } from '../zustand/useSpaces/store';
import { useAmountCounters } from '../zustand/useAmountCounters';
import { useStairs } from '../zustand/useStairs/store';
import { useRoofs } from '../zustand/useRoofs/store';
import { useCreationMode } from '../zustand/useCreationMode/store';
import { isResolved } from './isResolved';
import { updateRoofsSubtractions } from '../zustand/useRoofsWallSubtraction/actions';

export const loadProject = async (id: ProjectId) => {
  const {
    projectName,
    projectData: {
      globalSettings,
      walls,
      customModels,
      levels,
      spaces,
      amountCounters,
      stairs,
      roofs,
      ...rest
    },
  } = await getProject(id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type NoExtraData = ShouldBeNever<keyof typeof rest>;

  {
    const {
      isMeasurementsShown1,
      isMeasurementsShown2,
      measurementSystem,
      withLandscapeTextures,
      landscapeTexture,
      withFloorTextures,
      gridSpacing,
      snapToWallEnd,
      snapToWallLine,
      snapToGrid,
      snapToLockedAxis,
      isRoofsShown,
      isGridShown,
      isZoomToSelectionActive,
      isLabelsIn3DShown,
      isExteriorWallsShown,
      isInteriorWallsShown,
      isFloorsShown,
      isCeilingsShown,
      isDoorsShown,
      isWindowsShown,
      isCustomModelsShown,
      isSpaceNamesShown,
      isColumnsShown,
      isAssets2DShown,
      isRoofLinesIn2DShown,
      isOutlinesTurnedOn,
      isStairsShown,
      defaultRoof,
      outlinesSettings,
      defaultExteriorWallThickness,
      defaultInteriorWallThickness,
      snapDistanceFactor,
      ...rest
    } = globalSettings;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type NoExtraData = ShouldBeNever<keyof typeof rest>;

    useGlobalSettings.setState({
      projectName,
      isMeasurementsShown1,
      isMeasurementsShown2,
      measurementSystem,
      withLandscapeTextures,
      landscapeTexture,
      withFloorTextures,
      gridSpacing,
      snapToWallEnd,
      snapToWallLine,
      snapToGrid,
      snapToLockedAxis,
      isRoofsShown,
      isGridShown,
      isZoomToSelectionActive,
      isLabelsIn3DShown,
      isExteriorWallsShown,
      isInteriorWallsShown,
      isFloorsShown,
      isCeilingsShown,
      isDoorsShown,
      isWindowsShown,
      isCustomModelsShown,
      isSpaceNamesShown,
      isColumnsShown,
      isAssets2DShown,
      isRoofLinesIn2DShown,
      isOutlinesTurnedOn,
      isStairsShown,
      defaultRoof,
      outlinesSettings,
      defaultExteriorWallThickness,
      defaultInteriorWallThickness,
      snapDistanceFactor,
    } satisfies GlobalSettingsStore);
  }
  useWalls.setState({ walls });
  useCustomModels.setState({ customModels });
  useLevels.setState({ levels });
  useSpaces.setState({ spaces });
  useAmountCounters.setState(amountCounters);
  useStairs.setState({ stairs });
  useRoofs.setState({ roofs });
  updateRoofsSubtractions();

  useCreationMode.setState({ creationMode: 'pointer' });
  useUndoRedo.setState(useUndoRedo.getInitialState());
  await createProjectHashWithReset();
};

export const deleteMyProject = async (id: StrapiProjectId) => {
  const projectId = await _deleteMyProject(id);
  const { myProjects } = useMyProjectsResolved.getState();

  if(isNull(projectId)) {
    return false;
  }

  useMyProjects.setState({
    myProjects: myProjects.filter(e => e.projectId !== projectId),
  });

  return true;
};

export const updateMyProject = async (
  id: StrapiProjectId,
  project: Pick<Project, 'name'> | Pick<Project, 'name' | 'data'>,
) => {
  const result = await _updateMyProject(id, project);
  const { myProjects } = useMyProjects.getState();

  if(isNull(result)) {
    return false;
  }

  if(isResolved(myProjects)) {
    useMyProjects.setState({
      myProjects: myProjects.map(e => e.projectId !== result.projectId ? e : {
        ...e,
        name: result.name,
      }),
    });
  }

  return true;
};

export const saveProject = async (): ReturnType<typeof createProject> => {
  const saveData = await createProjectDataForSave();
  const projectId = queryParams.projectId.get();

  if(!isNull(projectId)) {
    const { id } = await getProject(projectId);
    const result = await updateMyProject(id, saveData);

    if(result === true) {
      return { success: true, projectId };
    }
  }

  return createProject(saveData);
};
