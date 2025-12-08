import { withLoadedAppPage } from '../useAppPage';
import { createProjectHash } from '../useProjectHash';
import { useGlobalSettings } from './store';

useGlobalSettings.subscribe(withLoadedAppPage(createProjectHash));
