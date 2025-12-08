'use strict';

import lzbase62 from 'lzbase62';
import { Project } from '../zod/Project/get';
import { extendedJSON } from '../utils/safeJSONParse';

/** @param {Project} project */
export const migrateProject = project => {
  const res = Project.safeParse(project);
  if(res.success === false) {
    return null;
  }

  return lzbase62.compress(extendedJSON.stringify(res.data.data));
};
