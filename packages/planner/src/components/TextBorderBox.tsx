import { useMemo } from 'react';
import { DoubleSide, MeshBasicMaterial, Shape, ShapeGeometry } from 'three';

const createRoundedRectShape = (w: number, h: number, r: number) => {
  const shape = new Shape();
  const halfW = w / 2;
  const halfH = h / 2;
  const radius = Math.max(0, Math.min(r, halfW, halfH));

  shape.moveTo(-halfW + radius, halfH);
  shape.lineTo(halfW - radius, halfH);
  shape.absarc(halfW - radius, halfH - radius, radius, Math.PI / 2, 0, true);
  shape.lineTo(halfW, -halfH + radius);
  shape.absarc(halfW - radius, -halfH + radius, radius, 0, -Math.PI / 2, true);
  shape.lineTo(-halfW + radius, -halfH);
  shape.absarc(-halfW + radius, -halfH + radius, radius, -Math.PI / 2, -Math.PI, true);
  shape.lineTo(-halfW, halfH - radius);
  shape.absarc(-halfW + radius, halfH - radius, radius, -Math.PI, -3 * Math.PI / 2, true);

  return shape;
};

type TextBorderBoxProps = {
  width: number;
  height: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  rotation: [number, number, number];
};

export const TextBorderBox = ({
  width,
  height,
  borderWidth,
  borderColor,
  borderRadius,
  rotation,
}: TextBorderBoxProps) => {
  const geometry = useMemo(() => {
    const innerWidth = width - borderWidth * 2;
    const innerHeight = height - borderWidth * 2;

    if(innerWidth <= 0 || innerHeight <= 0) {
      const outerShape = createRoundedRectShape(width, height, borderRadius);
      return new ShapeGeometry(outerShape);
    }

    const outerShape = createRoundedRectShape(width, height, borderRadius);
    const innerShape = createRoundedRectShape(
      innerWidth,
      innerHeight,
      Math.max(0, borderRadius - borderWidth),
    );
    outerShape.holes.push(innerShape);

    return new ShapeGeometry(outerShape);
  }, [width, height, borderWidth, borderRadius]);

  const backgroundGeometry = useMemo(() => {
    const bgWidth = width - borderWidth * 2;
    const bgHeight = height - borderWidth * 2;
    const bgRadius = Math.max(0, borderRadius - borderWidth);
    return new ShapeGeometry(createRoundedRectShape(bgWidth, bgHeight, bgRadius));
  }, [width, height, borderWidth, borderRadius]);

  const material = useMemo(() => new MeshBasicMaterial({
    color: borderColor,
    side: DoubleSide,
    transparent: true,
  }), [borderColor]);

  const backgroundMaterial = useMemo(() => new MeshBasicMaterial({
    color: 'white',
    side: DoubleSide,
    toneMapped: false,
  }), []);

  return (
    <group rotation={rotation} position={[0, 0, -0.01]}>
      <mesh geometry={backgroundGeometry} material={backgroundMaterial} />
      <mesh geometry={geometry} material={material} />
    </group>
  );
};
