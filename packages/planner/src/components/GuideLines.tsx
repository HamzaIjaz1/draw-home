import { Html } from '@react-three/drei';
import { useMemo } from 'react';
import { Euler, Quaternion, Vector3 } from 'three';
import Color from 'color';
import { isUndefined } from '@arthurka/ts-utils';
import { arrayToVector3 } from '../utils/helpers';
import { wallGuideLineLabelTextColor } from '../constants';
import { DashedLine } from './DashedLine';
import { measurements } from '../utils/measurements';
import { useGlobalSettings } from '../zustand/useGlobalSettings/store';

type Vec3 = Vector3 | [number, number, number];

type GuideLinesProps = {
  from: Vec3;
  to: Vec3;
  unitScale?: number;
  showLabel?: boolean;
  showLine?: boolean;
  lineColor?: string;
  labelNormal?: Vec3;
  dashedLine?: boolean;
  labelBackgroundColor?: string;
  showEndpoints?: boolean;
  endpointColor?: string;
  endpointRadius?: number;
};

export const GuideLines = (props: GuideLinesProps) => {
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);

  const unitScale = !isUndefined(props.unitScale) ? props.unitScale : 1;
  const showLabel = !isUndefined(props.showLabel) ? props.showLabel : true;
  const showLine = !isUndefined(props.showLine) ? props.showLine : true;
  const lineColor = !isUndefined(props.lineColor) ? props.lineColor : '#0008';
  const dashedLine = !isUndefined(props.dashedLine) ? props.dashedLine : true;
  const labelBackgroundColor = !isUndefined(props.labelBackgroundColor) ? props.labelBackgroundColor : lineColor;
  const showEndpoints = !isUndefined(props.showEndpoints) ? props.showEndpoints : true;
  const endpointColor = !isUndefined(props.endpointColor) ? props.endpointColor : lineColor;
  const endpointRadius = !isUndefined(props.endpointRadius) ? props.endpointRadius : 0.03;

  const a = arrayToVector3(props.from);
  const b = arrayToVector3(props.to);

  const mid = useMemo(() => a.clone().lerp(b, 0.5), [a, b]);
  const dist = useMemo(() => a.distanceTo(b) * unitScale, [a, b, unitScale]);

  const labelRotation = useMemo(() => {
    if(isUndefined(props.labelNormal)) {
      return;
    }
    const normal = arrayToVector3(props.labelNormal).clone().negate().normalize();
    const q = new Quaternion().setFromUnitVectors(new Vector3(0, 0, -1), normal);
    const euler = new Euler().setFromQuaternion(q);
    return [euler.x, euler.y, euler.z] as [number, number, number];
  }, [props.labelNormal]);

  return (
    <>
      {
        showLine !== false && (
          <DashedLine points={[a, b]} dashed={dashedLine} color={Color(lineColor)} opacity={Color(lineColor).alpha()} />
        )
      }
      {/* spheres on endpoints */}
      {
        showEndpoints !== false && (
          <>
            <mesh position={a}>
              <sphereGeometry args={[endpointRadius, 8, 8]} />
              <meshBasicMaterial color={Color(endpointColor).rgbNumber()} depthTest={false} transparent opacity={255} />
            </mesh>
            <mesh position={b}>
              <sphereGeometry args={[endpointRadius, 8, 8]} />
              <meshBasicMaterial color={Color(endpointColor).rgbNumber()} depthTest={false} transparent opacity={255} />
            </mesh>
          </>
        )
      }
      {/* labels on the middle of line */}
      {
        showLabel === true && (
          <Html
            position={mid}
            rotation={labelRotation}
            center
            transform
            distanceFactor={8}
            occlude={false}
            style={{ pointerEvents: 'none' }}
          >
            <div
              style={{
                padding: '3px 5px',
                borderRadius: 6,
                fontSize: 10,
                color: wallGuideLineLabelTextColor,
                background: labelBackgroundColor,
                whiteSpace: 'nowrap',
              }}
            >
              {measurements.pretty.mFtIn(dist, measurementSystem)}
            </div>
          </Html>
        )
      }
    </>
  );
};
