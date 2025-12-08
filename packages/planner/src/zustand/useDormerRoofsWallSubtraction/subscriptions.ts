import { withLoadedAppPage } from '../useAppPage';
import { createProjectHash } from '../useProjectHash';
import { useDormerRoofsWallSubtraction } from './store';

useDormerRoofsWallSubtraction.subscribe(withLoadedAppPage(createProjectHash));
