import { Line, Text } from '@react-three/drei';
import { DoubleSide, Vector3 } from 'three';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { fixIEEE } from '@draw-house/common/dist/utils';
import { memo, Suspense, useState } from 'react';
import { WallId } from '@draw-house/common/dist/brands';
import { ThreeEvent } from '@react-three/fiber';
import { drawingLineColor, wallSizeTakeout } from '../../constants';
import { mergeFutureWalls, useGlobalSettings, usePopUpToolbar, useTempWalls, useWalls } from '../../zustand';
import { measurements } from '../../utils';
import { useWallLengthChangeInputData } from '../../zustand/useWallLengthChangeInputData';
import { TextBorderBox } from '../TextBorderBox';

export type WallSizeProps = {
  wallId: WallId;
  start: Vector3;
  end: Vector3;
  lookDirection: Vector3;
  takeoutType: 'center' | 'inside' | 'outside';
  onPointerUp: undefined | ((e: ThreeEvent<PointerEvent>) => void);
  isOtherDirection?: boolean;
};

export const WallSize: React.FC<WallSizeProps> = memo(({
  wallId,
  start,
  end,
  takeoutType,
  lookDirection,
  onPointerUp,
  isOtherDirection = false,
}) => {
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const [textSize, setTextSize] = useState({ width: 0.5, height: 0.3 });

  const activeWall = usePopUpToolbar(({ popUpToolbar }) => {
    if(isNull(popUpToolbar) || popUpToolbar.type !== 'wall' || popUpToolbar.id === wallId) {
      return null;
    }

    const { walls } = useWalls.getState();
    const { tempWalls } = useTempWalls.getState();

    const futureWalls = mergeFutureWalls([...walls, ...tempWalls]);

    const activeWall = getNotUndefined(futureWalls.find(e => e.id === popUpToolbar.id), 'This should never happen. |1il3g0|');
    const targetWall = getNotUndefined(futureWalls.find(e => e.id === wallId), 'This should never happen. |wj5kib|');

    return (
      false
        || activeWall.position.start.equals(targetWall.position.start)
        || activeWall.position.start.equals(targetWall.position.end)
        || activeWall.position.end.equals(targetWall.position.start)
        || activeWall.position.end.equals(targetWall.position.end)
        ? activeWall
        : null
    );
  });

  const takeoutSign = isOtherDirection === false ? 1 : -1;
  const takeout = ({
    center: takeoutSign * wallSizeTakeout * 2,
    inside: takeoutSign * wallSizeTakeout,
    outside: takeoutSign * wallSizeTakeout * 2,
  } satisfies Record<typeof takeoutType, number>)[takeoutType];
  const takeoutStart = new Vector3(0, 0, takeout).add(start);
  const takeoutEnd = new Vector3(0, 0, takeout).add(end);
  const length = fixIEEE(new Vector3().subVectors(start, end).length());
  const takeoutTail = new Vector3(0, 0, takeoutSign * Math.sign(wallSizeTakeout) * 0.2);
  const takeoutCenter = new Vector3().addVectors(
    new Vector3().addVectors(takeoutStart, takeoutEnd).divideScalar(2),
    new Vector3(0, 0.015, 0),
  );

  const arrowSize = 0.06;

  const center = new Vector3().addVectors(takeoutStart, takeoutEnd).divideScalar(2);
  const wallLength = new Vector3().subVectors(takeoutStart, center).length();
  const endBeforeText = (
    takeoutStart
      .clone()
      .add(new Vector3().subVectors(center, takeoutStart).normalize().multiplyScalar(Math.max(0, wallLength - 0.6)))
  );
  const endAfterText = (
    takeoutEnd
      .clone()
      .add(new Vector3().subVectors(center, takeoutEnd).normalize().multiplyScalar(Math.max(0, wallLength - 0.6)))
  );

  const textBoxPaddings = 0.09 * 2;
  const additionalSafeArea = 0.1;
  const safeAreaThreshold = (textSize.height + textBoxPaddings) / 2 + additionalSafeArea;
  const safeAreaDiff = safeAreaThreshold - Math.abs(takeout);

  return length !== 0 && (
    <group>
      <Line
        segments
        color={drawingLineColor}
        lineWidth={0.5}
        points={[
          start,
          takeoutStart.clone().add(takeoutTail),
          takeoutStart,
          endBeforeText,
          endAfterText,
          takeoutEnd,
          takeoutEnd.clone().add(takeoutTail),
          end,
        ]}
      />
      <mesh
        position={[takeoutStart.x + arrowSize, takeoutStart.y, takeoutStart.z]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      >
        <circleGeometry args={[arrowSize, 3]} />
        <meshBasicMaterial color={drawingLineColor} side={DoubleSide} />
      </mesh>
      <mesh
        position={[takeoutEnd.x - arrowSize, takeoutEnd.y, takeoutEnd.z]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[arrowSize, 3]} />
        <meshBasicMaterial color={drawingLineColor} side={DoubleSide} />
      </mesh>
      <group
        position={
          !isNull(activeWall) && Math.abs(takeout) < safeAreaThreshold
            ? takeoutCenter.clone().add(
              new Vector3(
                0,
                0,
                Math.sign(takeout) * safeAreaDiff,
              ),
            )
            : takeoutCenter
        }
      >
        <Suspense fallback={null}>
          <Text
            rotation-x={-Math.PI / 2}
            rotation-z={
              lookDirection.z <= 0
                ? -Math.PI
                : 0
            }
            fontSize={0.24}
            color={drawingLineColor}
            font='/fonts/sofia-pro/regular.otf'
            onPointerDown={() => {
              useWallLengthChangeInputData.setState(useWallLengthChangeInputData.getInitialState());
            }}
            onPointerUp={isNull(activeWall) ? onPointerUp : e => {
              if(e.button !== 0) {
                return;
              }
              e.stopPropagation();

              useTempWalls.setState(useTempWalls.getInitialState());
              useWallLengthChangeInputData.setState({
                wallLengthChangeInputData: {
                  targetWallId: wallId,
                  activeWallId: activeWall.id,
                  length,
                },
              });
            }}
            onSync={mesh => {
              if(Array.isArray(mesh.textRenderInfo.visibleBounds)) {
                const [minX, minY, maxX, maxY] = mesh.textRenderInfo.visibleBounds;
                const width = maxX - minX;
                const height = maxY - minY;

                setTextSize({ width, height });
              }
              if(mesh.isMesh === true) {
                // eslint-disable-next-line no-param-reassign
                mesh.material.toneMapped = false;
              }
            }}
          >
            {measurements.pretty.mFtIn(length, measurementSystem)}
          </Text>
        </Suspense>
        {
          !isNull(activeWall) && (
            <TextBorderBox
              height={textSize.height + textBoxPaddings}
              width={textSize.width + textBoxPaddings}
              borderWidth={0.015}
              borderRadius={0.1}
              borderColor='#fd5631'
              rotation={[
                -Math.PI / 2,
                0,
                lookDirection.z <= 0
                  ? -Math.PI
                  : 0,
              ]}
            />
          )
        }
      </group>
    </group>
  );
});
