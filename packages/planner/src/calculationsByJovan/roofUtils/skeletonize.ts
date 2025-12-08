import { EdgeEvent, EventQueue, LAVertex, SLAV, SplitEvent } from './slav';
import { Subtree } from '../types';
import { approximatelySame } from '../Utils/Vector/point';
import { cleanPolygon, cleanupSkeleton } from './geometryCleanup';

/**
 * Merges skeleton nodes with identical source points
 * This handles duplicate nodes created during skeleton generation
 */
function mergeSources(skeleton: Subtree[]) {
  const sources: Record<string, number> = {};
  const toRemove: number[] = [];

  for(let i = 0; i < skeleton.length; i++) {
    const p = skeleton[i];

    if(p === undefined) {
      continue;
    }

    const sourceKey = JSON.stringify(p.source);

    if(sources[sourceKey] !== undefined) {
      const sourceIndex = sources[sourceKey];
      const existing = skeleton[sourceIndex];

      if(existing !== undefined) {
        p.sinks.forEach(sink => {
          if(!existing.sinks.some(existingSink => approximatelySame(existingSink, sink))) {
            existing.sinks.push(sink);
          }
        });
      }

      toRemove.push(i);
    } else {
      sources[sourceKey] = i;
    }
  }

  for(let i = toRemove.length - 1; i >= 0; i--) {
    const indexToRemove = toRemove[i];
    if(indexToRemove !== undefined) {
      skeleton.splice(indexToRemove, 1);
    }
  }
}


export function skeletonize(
  polygon: Array<[number, number]>,
  holes: Array<Array<[number, number]>> = [],
): Subtree[] {
  // Polygon should already be cleaned by prepareCoordinates before calling this function
  const cleanedHoles = holes.map(hole => cleanPolygon(hole));

  // Generate straight skeleton
  const slav = new SLAV(polygon, cleanedHoles);
  const output = [];
  const eventQueue = new EventQueue();

  slav.lavs.forEach(lav => {
    Array.from(lav).forEach((vertex: LAVertex) => {
      if(!vertex.isValid()) {
        return;
      }
      const event = vertex.nextEvent();
      if(event) {
        eventQueue.put(event);
      }
    });
  });

  while(!eventQueue.isEmpty() && slav.lavs.length > 0) {
    const event = eventQueue.get();
    if(event instanceof EdgeEvent) {
      if(!event.vertexA.isValid() || !event.vertexB.isValid()) {
        continue;
      }
      const result = slav.handleEdgeEvent(event);
      if(result) {
        output.push(result.subtree);
        eventQueue.putAll(result.events);
      }
    } else if(event instanceof SplitEvent) {
      if(!event.vertex.isValid()) {
        continue;
      }
      const result = slav.handleSplitEvent(event);
      if(result) {
        output.push(result.subtree);
        eventQueue.putAll(result.events);
      }
    }
  }

  // Merge duplicate sources
  mergeSources(output);

  // Apply comprehensive cleanup pipeline
  const cleanedOutput = cleanupSkeleton(output, polygon);

  return cleanedOutput;
}
