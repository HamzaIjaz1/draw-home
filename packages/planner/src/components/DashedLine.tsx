import { useEffect, useMemo, useRef } from 'react';
import { Color, Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { ColorInstance } from 'color';

type DashedLineProps = {
  points: Array<Vector3 | [number, number, number]>;
  color?: ColorInstance;
  opacity?: number;
  widthWorld?: number;
  dashed?: boolean;
  dashSize?: number;
  gapSize?: number;
  overlay?: boolean;
};

export function DashedLine({
  points,
  color,
  opacity = 1,
  widthWorld = 0.015,
  dashed = true,
  dashSize = 0.15,
  gapSize = 0.1,
  overlay = true,
}: DashedLineProps) {
  const geometry = useMemo(() => {
    const g = new LineGeometry();
    const flat = new Float32Array(points.length * 3);
    for(let i = 0; i < points.length; i++) {
      const p: any = points[i];
      flat[i * 3] = p.x ?? p[0];
      flat[i * 3 + 1] = p.y ?? p[1];
      flat[i * 3 + 2] = p.z ?? p[2];
    }
    g.setPositions(flat);
    return g;
  }, [points]);

  const material = useMemo(() => {
    const m = new LineMaterial({
      color: new Color(color?.rgbNumber()),
      worldUnits: true,
      linewidth: widthWorld,
      dashed,
      dashSize,
      gapSize,
      opacity,
      transparent: true,
    } as any);
    if(overlay) {
      m.depthTest = false;
      m.depthWrite = false;
    }
    m.toneMapped = false;
    m.fog = false;
    return m;
  }, [color, widthWorld, dashed, dashSize, gapSize, opacity, overlay]);

  const lineRef = useRef<Line2>();
  const line = useMemo(() => new Line2(geometry, material), [geometry, material]);

  useEffect(() => {
    line.computeLineDistances();
    if(overlay === true) {
      line.renderOrder = 1e9;
    }
  }, [line, overlay]);

  return <primitive ref={lineRef} object={line} />;
}
