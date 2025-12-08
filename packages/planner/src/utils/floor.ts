import { getNotUndefined, isUndefined } from '@arthurka/ts-utils';
import cytoscape from 'cytoscape';
import { Vector2 } from 'three';
import { WallsStore } from '../zustand/useWalls/store';
import { crossLineSegments } from './crossLineSegments';
import { makeGraphNodes } from './makeGraphNodes';
import { detectFloorGraphCycles } from './detectFloorGraphCycles';

export const getFloorCoordinates = (wallPositions: Array<WallsStore['walls'][number]['position']>): Vector2[] => {
  const lineSegments = crossLineSegments(wallPositions);
  const nodes = makeGraphNodes(lineSegments);
  const elements: cytoscape.CytoscapeOptions['elements'] = [];

  for(const { id } of nodes) {
    elements.push({
      data: {
        id,
      },
    });
  }
  for(const { start, end } of lineSegments) {
    const a = getNotUndefined(nodes.find(e => e.vector.equals(start)), 'This should never happen. |qkp86j|');
    const b = getNotUndefined(nodes.find(e => e.vector.equals(end)), 'This should never happen. |48imx3|');

    elements.push({
      data: {
        id: `${a.id}-${b.id}`,
        source: a.id,
        target: b.id,
      },
    });
    elements.push({
      data: {
        id: `${b.id}-${a.id}`,
        source: b.id,
        target: a.id,
      },
    });
  }

  const cy = cytoscape({ elements });
  const [floorCycles] = detectFloorGraphCycles(cy).filter(e => e.length > 2);

  return isUndefined(floorCycles) ? [] : floorCycles.map(id => (
    getNotUndefined(nodes.find(e => e.id === id)?.vector, 'This should never happen. |yc6czm|')
  ));
};
