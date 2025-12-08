import { IconButton, MenuItem, RowBackdrop, SecondaryButton } from '@draw-house/ui/dist/components';
import { getNotUndefined, isNull, round } from '@arthurka/ts-utils';
import { useEffect, useState } from 'react';
import assert from 'assert';
import { Vector2 } from 'three';
import { fixIEEE } from '@draw-house/common/dist/utils';
import { moveTempWalls, updateWallsFromWallMover, useGlobalSettings, useWallMover, useWalls } from '../zustand';
import { MeasurementPairedInputRow } from './MeasurementPairedInputRow';
import { lang } from '../lang';
import { measurements } from '../utils';
import { useWallLengthChangeInputData } from '../zustand/useWallLengthChangeInputData';

export const WallLengthChangeInput: React.FC = () => {
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { walls } = useWalls();
  const { wallLengthChangeInputData } = useWallLengthChangeInputData();
  assert(!isNull(wallLengthChangeInputData), 'This should never happen. |4l265o|');

  const [newLength, setNewLength] = useState(wallLengthChangeInputData.length);
  useEffect(() => {
    setNewLength(newLength);
  }, [newLength, setNewLength]);

  const targetWall = getNotUndefined(walls.find(e => e.id === wallLengthChangeInputData.targetWallId), 'Something went wrong. |oha5uv|');
  const activeWall = getNotUndefined(walls.find(e => e.id === wallLengthChangeInputData.activeWallId), 'Something went wrong. |qyd6dh|');

  return (
    <MenuItem>
      <RowBackdrop>
        <MeasurementPairedInputRow
          name='length'
          label={`${lang.length}:`}
          value={round(measurements.to(newLength, measurementSystem), 2)}
          measurementSystem={measurementSystem}
          min={0.01}
          onChange={value => {
            setNewLength(measurements.from(value, measurementSystem));
          }}
        />
        <SecondaryButton
          text={lang.apply}
          onClick={() => {
            const sharedPoint = ((a1: Vector2, a2: Vector2, b1: Vector2, b2: Vector2) => {
              if(a1.equals(b1) || a1.equals(b2)) {
                return a1;
              }
              if(a2.equals(b1) || a2.equals(b2)) {
                return a2;
              }

              throw new Error('Something went wrong. |37u9nv|');
            })(
              activeWall.position.start,
              activeWall.position.end,
              targetWall.position.start,
              targetWall.position.end,
            );

            const resizedWallSecondPoint = targetWall.position.start.equals(sharedPoint) ? targetWall.position.end : targetWall.position.start;
            const direction = new Vector2().subVectors(resizedWallSecondPoint, sharedPoint).normalize();
            const deltaLength = fixIEEE(newLength - wallLengthChangeInputData.length);
            const directionSign = deltaLength < 0 ? 1 : -1;
            const destinationPoint = new Vector2().addVectors(
              sharedPoint,
              direction.clone().multiplyScalar(directionSign * Math.abs(deltaLength)),
            );

            useWallMover.setState({
              wallMover: {
                type: 'parallel',
                wallId: activeWall.id,
                startPosition: sharedPoint,
              },
            });
            moveTempWalls(new Vector2(destinationPoint.x, destinationPoint.y));
            updateWallsFromWallMover();
            useWallLengthChangeInputData.setState({
              wallLengthChangeInputData: {
                ...wallLengthChangeInputData,
                length: newLength,
              },
            });
            useWallLengthChangeInputData.setState(useWallLengthChangeInputData.getInitialState());
          }}
        />
      </RowBackdrop>
      <IconButton
        icon='close'
        size='md-mobile'
        variant='text'
        onClick={() => {
          useWallLengthChangeInputData.setState(useWallLengthChangeInputData.getInitialState());
        }}
      />
    </MenuItem>
  );
};
