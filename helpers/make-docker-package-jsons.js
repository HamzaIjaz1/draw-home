// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { workspaces } = require('../package.json');

const mode = process.argv[2] === '--clean-up' ? 'remove' : 'create';

/**
  @typedef Packages
  @type {
    | import('../package.json')
    | import('../packages/common/package.json')
    | import('../packages/ui/package.json')
    | import('../packages/planner/package.json')
    | import('../packages/landing/package.json')
  }

  @typedef Package
  @type {
    & import('@arthurka/ts-utils').Union<Packages>
    & {
      scripts: import('@arthurka/ts-utils').Union<Packages['scripts']>
    }
  }
*/

const packageNames = (
  execSync(`ls -d ${workspaces.join(' ')}`)
    .toString('utf-8')
    .trim()
    .split('\n')
);

const filepaths = [
  'package.json',
  ...packageNames.map(e => `${e}/package.json`),
];

for(const filepath of filepaths) {
  const {
    name,
    version,
    workspaces,
    dependencies,
    devDependencies,
    scripts,
    main,
    types,
  } = /** @type {Package} */ (JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf-8')));

  const newFilepath = path.resolve(path.parse(filepath).dir, './docker-package.json');
  const scriptsFilepath = path.resolve(path.parse(filepath).dir, './docker-build-package.json');

  switch(mode) {
    case 'remove':
      try {
        fs.unlinkSync(newFilepath);
      } catch(e) {}
      try {
        fs.unlinkSync(scriptsFilepath);
      } catch(e) {}
      break;
    case 'create':
      fs.writeFileSync(newFilepath, `${JSON.stringify({
        name,
        version,
        scripts: {
          preinstall: scripts.preinstall,
          'start-checks': scripts['start-checks'],
        },
        dependencies,
        devDependencies,
        workspaces,
      }, null, 2)}\n`);

      fs.writeFileSync(scriptsFilepath, `${JSON.stringify({
        name,
        version,
        main,
        types,
        scripts: {
          build: scripts.build,
          start: scripts.start,
          'start-checks': scripts['start-checks'],
          'build:noRemove': scripts['build:noRemove'],
          'common:build': scripts['common:build'],
          'planner:build': scripts['planner:build'],
          'ui:build:previewPage': scripts['ui:build:previewPage'],
          'build:previewPage': scripts['build:previewPage'],
          'ui:build:lib': scripts['ui:build:lib'],
          'build:lib': scripts['build:lib'],
          'landing:build': scripts['landing:build'],
          'landing:start': scripts['landing:start'],
          'ts:noWatch': scripts['ts:noWatch'],
          'floor-plan-scanner:build': scripts['floor-plan-scanner:build'],
          'floor-plan-scanner:start': scripts['floor-plan-scanner:start'],
        },
        dependencies,
        devDependencies,
        workspaces,
      }, null, 2)}\n`);
      break;
    default:
      ((/** @type {never} */ e) => e)(mode);
      throw new Error('This should never happen. |f1bx1f|');
  }
}
