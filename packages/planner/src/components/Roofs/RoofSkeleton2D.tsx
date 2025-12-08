import { isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { useEffect, useMemo, useRef } from 'react';
import { BufferGeometry, Float32BufferAttribute, LineSegments, Vector3 } from 'three';

export type RoofSkeleton2DProps = {
  boundaryLines: Array<{ start: Vector3; end: Vector3 }>;
  skeletonLines: Array<{ start: Vector3; end: Vector3 }>;
  elevation: number;
};

const makeGeometry = (lines: Array<{ start: Vector3; end: Vector3 }>) => {
  const geometry = new BufferGeometry();
  const vertices = new Float32BufferAttribute(lines.flatMap(({ start, end }) => [
    start.x,
    start.y,
    start.z,
    end.x,
    end.y,
    end.z,
  ]), 3);

  geometry.setAttribute('position', vertices);

  return geometry;
};

export const RoofSkeleton2D: React.FC<RoofSkeleton2DProps> = ({ boundaryLines, skeletonLines, elevation }) => {
  const boundaryLinesGeometry = useMemo(() => makeGeometry(boundaryLines), [boundaryLines]);
  const skeletonLinesGeometry = useMemo(() => makeGeometry(skeletonLines), [skeletonLines]);

  const boundaryLinesRef = useRef<LineSegments>(null);
  const skeletonLinesRef = useRef<LineSegments>(null);

  useEffect(() => {
    assert(!isNull(boundaryLinesRef.current), 'This should never happen. |gi62oq|');

    boundaryLinesRef.current.computeLineDistances();
  }, [boundaryLinesGeometry]);
  useEffect(() => {
    assert(!isNull(skeletonLinesRef.current), 'This should never happen. |sjl2zg|');

    skeletonLinesRef.current.computeLineDistances();
  }, [skeletonLinesGeometry]);

  return (
    <group position-y={elevation}>
      <lineSegments ref={boundaryLinesRef} geometry={boundaryLinesGeometry}>
        <lineDashedMaterial color='gray' linewidth={2} dashSize={0.3} gapSize={0.15} />
      </lineSegments>
      <lineSegments ref={skeletonLinesRef} geometry={skeletonLinesGeometry}>
        <lineDashedMaterial color='gray' linewidth={1} dashSize={0.2} gapSize={0.1} />
      </lineSegments>
    </group>
  );
};
