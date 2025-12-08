import { Line } from '@react-three/drei';
import { Vector3 } from 'three';
import { GlobalSettingsStore } from '../zustand';

type RulerVisual3DProps = {
  p1: Vector3;
  p2: Vector3;
  measurementSystem: GlobalSettingsStore['measurementSystem'];
  worldScaleX: number;
  showSmallestTicks: boolean;
};

export const RulerVisual3D = ({ p1, p2, measurementSystem, worldScaleX, showSmallestTicks }: RulerVisual3DProps) => {
  const dir = p2.clone().sub(p1);
  const perpendicular = new Vector3(-dir.z, 0, dir.x).normalize();
  const realDistance = p1.distanceTo(p2) * worldScaleX;

  const markerLength = 0.25;
  const startMarkerP1 = p1.clone().add(perpendicular.clone().multiplyScalar(markerLength / 2));
  const startMarkerP2 = p1.clone().add(perpendicular.clone().multiplyScalar(-markerLength / 2));
  const endMarkerP1 = p2.clone().add(perpendicular.clone().multiplyScalar(markerLength / 2));
  const endMarkerP2 = p2.clone().add(perpendicular.clone().multiplyScalar(-markerLength / 2));

  const tickPositions: number[] = [];
  const shortestTickLength = 0.08;

  if(measurementSystem === 'metric') {
    const tickStep = 0.1;
    const tickCount = Math.floor(realDistance / tickStep);

    for(let i = 1; i <= tickCount; i++) {
      if(!showSmallestTicks && i % 5 !== 0) {
        continue;
      }

      const t = i * tickStep / realDistance;
      const tickPos = p1.clone().lerp(p2, t);

      let length = shortestTickLength;
      if(i % 10 === 0) {
        length = shortestTickLength * 2.2;
      } else if(i % 5 === 0) {
        length = shortestTickLength * 1.6;
      }
      const tickDir = new Vector3(-dir.z, 0, dir.x).normalize().multiplyScalar(length);

      const a = tickPos.clone();
      const b = tickPos.clone().add(tickDir);
      tickPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  } else if(measurementSystem === 'imperial') {
    const meterToFeet = 3.28084;
    const realDistanceFt = realDistance * meterToFeet;
    const inchStep = 1 / 12;
    const tickCountFt = Math.floor(realDistanceFt / inchStep);

    for(let i = 1; i <= tickCountFt; i++) {
      if(!showSmallestTicks && i % 6 !== 0) {
        continue;
      }

      const feet = i * inchStep;
      const t = feet / realDistanceFt;
      const tickPos = p1.clone().lerp(p2, t);

      let length = shortestTickLength;
      if(i % 12 === 0) {
        length = shortestTickLength * 2.2;
      } else if(i % 6 === 0) {
        length = shortestTickLength * 1.6;
      }
      const tickDir = new Vector3(-dir.z, 0, dir.x).normalize().multiplyScalar(length);

      const a = tickPos.clone();
      const b = tickPos.clone().add(tickDir);
      tickPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  return (
    <>
      <Line points={[p1, p2]} color='#fd5631' lineWidth={2} />
      <Line points={[startMarkerP1, startMarkerP2]} color='#fd5631' lineWidth={2} />
      <Line points={[endMarkerP1, endMarkerP2]} color='#fd5631' lineWidth={2} />
      {
        tickPositions.length > 0 && (
          <Line points={tickPositions} color='#fd5631' segments />
        )
      }
    </>
  );
};
