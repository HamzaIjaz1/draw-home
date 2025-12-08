import { withLoadedAppPage } from '../useAppPage';
import { createProjectHash } from '../useProjectHash';
import { useRoofs } from '../useRoofs/store';
import { useWalls } from '../useWalls';
import { updateRoofsSubtractions } from './actions';
import { useRoofsWallSubtraction } from './store';

useRoofsWallSubtraction.subscribe(withLoadedAppPage(createProjectHash));

useRoofs.subscribe(withLoadedAppPage(() => {
  updateRoofsSubtractions();
}));

useWalls.subscribe(withLoadedAppPage(() => {
  updateRoofsSubtractions();
}));
