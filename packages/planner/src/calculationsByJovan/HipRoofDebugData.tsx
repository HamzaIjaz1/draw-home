import { RoofId } from '@draw-house/common/dist/brands';
import { useMemo } from 'react';
import { BufferGeometry, Float32BufferAttribute } from 'three';
import { useHipRoofDebugData } from './useHipRoofDebugData';

export const HipRoofDebugData: React.FC<{ roofId: RoofId; geometry: BufferGeometry }> = ({ roofId }) => {
  const { hipRoofDebugData } = useHipRoofDebugData();
  const debugData = hipRoofDebugData.find(e => e.roofId === roofId);

  const boundaryLinesGeometry = useMemo(() => {
    if(!debugData) {
      return new BufferGeometry();
    }
    const geometry = new BufferGeometry();
    // eslint-disable-next-line max-len
    const vertices = new Float32BufferAttribute(debugData.boundaryLines.flatMap(line => [line.start.x, line.start.y, line.start.z, line.end.x, line.end.y, line.end.z]), 3);
    geometry.setAttribute('position', vertices);
    return geometry;
  }, [debugData]);

  const boundaryBaseLinesGeometry = useMemo(() => {
    if(!debugData) {
      return new BufferGeometry();
    }
    const geometry = new BufferGeometry();
    // eslint-disable-next-line max-len
    const vertices = new Float32BufferAttribute(debugData.boundaryBaseLines.flatMap(line => [line.start.x, line.start.y, line.start.z, line.end.x, line.end.y, line.end.z]), 3);
    geometry.setAttribute('position', vertices);
    return geometry;
  }, [debugData]);

  const skeletonLinesGeometry = useMemo(() => {
    if(!debugData) {
      return new BufferGeometry();
    }
    const geometry = new BufferGeometry();
    // eslint-disable-next-line max-len
    const vertices = new Float32BufferAttribute(debugData.skeletonLines.flatMap(line => [line.start.x, line.start.y, line.start.z, line.end.x, line.end.y, line.end.z]), 3);
    geometry.setAttribute('position', vertices);
    return geometry;
  }, [debugData]);

  // If debug data doesn't exist yet, don't render anything
  if(!debugData) {
    return null;
  }

  return (
    <>
      {/* Commented out to avoid overlapping with colored debug lines */}
      {/* <lineSegments geometry={edgesGeometry} /> */}

      {/* Render boundary base lines */}
      <lineSegments geometry={boundaryBaseLinesGeometry}>
        <lineBasicMaterial color='black' linewidth={1} />
      </lineSegments>

      {/* Render boundary lines */}
      <lineSegments geometry={boundaryLinesGeometry}>
        <lineBasicMaterial color='blue' linewidth={3} />
      </lineSegments>

      {/* Render skeleton lines */}
      <lineSegments geometry={skeletonLinesGeometry}>
        <lineBasicMaterial color='red' linewidth={1} />
      </lineSegments>
    </>
  );
};
