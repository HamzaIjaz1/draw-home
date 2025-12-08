import { isArrayIncludes } from '@arthurka/ts-utils';
import { closePopUpToolbar } from '../usePopUpToolbar';
import { useTempWallFurniture } from '../useTempWallFurniture';
import { furnitureCreationModes, useCreationMode } from './store';
import { useIsWallDrawToolbarShown } from '../useIsWallDrawToolbarShown';
import { useCanMoveWall } from '../useCanMoveWall';
import { unselectItem } from '../useSelectedItem';

useCreationMode.subscribe(closePopUpToolbar);
useCreationMode.subscribe(unselectItem);

useCreationMode.subscribe(({ creationMode }) => {
  if(!isArrayIncludes(furnitureCreationModes, creationMode)) {
    useTempWallFurniture.setState({ tempWallFurniture: null });
  }
});

useCreationMode.subscribe(({ creationMode }) => {
  if(creationMode === 'walls') {
    useIsWallDrawToolbarShown.setState({
      isWallDrawToolbarShown: true,
    });
  }
});

useCreationMode.subscribe(() => {
  useCanMoveWall.setState({ canMoveWall: false });
});
