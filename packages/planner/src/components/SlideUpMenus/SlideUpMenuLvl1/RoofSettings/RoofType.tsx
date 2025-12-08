import { FieldButton, IconPickerRow, MenuItem, MenuSection, TextField } from '@draw-house/ui/dist/components';
import { isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { AnimatePresence } from 'framer-motion';
import { lang } from '../../../../lang';
import { clearFutureWalls, setCeilingParams, useSpaces, useTempWalls, useWalls } from '../../../../zustand';
import { RoofsStore, rotateSlantedRoof, setRoofParams } from '../../../../zustand/useRoofs';
import { removeRepeatedValues } from '../../../../utils/removeRepeatedValues';
import { getRoofType } from '../../../../utils';
import { Animations } from '../../../animations';
import { calculateHipRoofDataCached, calculateSlantedRoofDataCached, calculateWraparoundRoofDataCached } from '../../../../utils/roofCache';
import { ComingSoonWrapper } from '../../../ComingSoonWrapper';
import { RoofParts } from '../../../../calculationsByJovan/types';
import { findSpaceClosedContours } from '../../../../utils/findSpaceClosedContours';
import { calculateCoplanarPolygonArea } from '../../../../utils/getAreaOfSmallerContour';
import { defaultRoofOverhang } from '../../../../constants';

export type RoofTypeSwitcherProps = {
  targetRoof: null | undefined | RoofsStore['roofs'][number];
};

export const RoofTypeSwitcher: React.FC<RoofTypeSwitcherProps> = ({ targetRoof }) => {
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { spaces } = useSpaces();

  const targetRoofIsVisible = isNullish(targetRoof) ? false : targetRoof.roofData.isVisible;
  const targetSpace = isNullish(targetRoof) ? null : spaces.find(e => e.roofId === targetRoof.id);
  const targetRoofType = getRoofType(targetRoof);

  const roofPartsData = (() => {
    if(isNullish(targetRoof)) {
      return null;
    }

    const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === targetRoof.id).flatMap(e => e.walls));
    const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
    const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
    const biggestContour = (() => {
      const { contours } = findSpaceClosedContours(spaceWalls);
      const [biggestContour] = (
        contours
          .map(e => ({
            area: calculateCoplanarPolygonArea(e),
            contour: e,
          }))
          .toSorted((a, b) => b.area - a.area)
      );

      return isUndefined(biggestContour) ? [] : biggestContour.contour.slice(0, -1);
    })();

    let gableIndices: number[] = [];

    return {
      hip: (() => {
        const { roofParts, transformableGableToHipRoofParts } = calculateHipRoofDataCached({
          roofId: targetRoof.id,
          coords: biggestContour,
          offset: targetRoof.roofData.overhang,
          roofHeightFromBase: targetRoof.roofData.heightFromBase,
          roofSlope: targetRoof.roofData.hipSlope,
          gableIndices: [],
          isClosedGable: false,
        });

        gableIndices = transformableGableToHipRoofParts.map(e => e.index);

        return roofParts;
      })(),
      'hip-with-all-gable-corners': (() => {
        const { roofParts } = calculateHipRoofDataCached({
          roofId: targetRoof.id,
          coords: biggestContour,
          offset: targetRoof.roofData.overhang,
          roofHeightFromBase: targetRoof.roofData.heightFromBase,
          roofSlope: targetRoof.roofData.hipSlope,
          gableIndices,
          isClosedGable: false,
        });

        return roofParts;
      })(),
      slanted: (() => {
        const { roofParts } = calculateSlantedRoofDataCached({
          coords: biggestContour,
          offset: targetRoof.roofData.overhang,
          roofHeightFromBase: targetRoof.roofData.heightFromBase,
          roofSlope: targetRoof.roofData.slantedSlope,
          slopeOrientation: targetRoof.roofData.slantedSlopeOrientation,
        });

        return roofParts;
      })(),
      wraparound: (() => {
        const { roofParts } = calculateWraparoundRoofDataCached({
          coords: biggestContour,
          offset: targetRoof.roofData.overhang,
          roofHeightFromBase: targetRoof.roofData.heightFromBase,
          roofSlope: targetRoof.roofData.slantedSlope,
          flipSide: targetRoof.roofData.isFlippedWraparound,
        });

        return roofParts;
      })(),
      flat: [],
    } satisfies Record<typeof targetRoofType, RoofParts>;
  })();

  return (
    <MenuSection
      title={lang.slideUpMenus.roofSettings.roofType}
      type='collapsible'
      divider='content'
      defaultExpanded
    >
      <MenuItem>
        <ComingSoonWrapper>
          <IconPickerRow
            items={[
              {
                icon: 'gableRoof',
                label: lang.roofType('hip-with-all-gable-corners'),
                ...(
                  !isNull(roofPartsData) && roofPartsData['hip-with-all-gable-corners'].length === 0
                    ? {
                      state: 'disabled',
                    }
                    : {
                      id: 'hip-with-all-gable-corners',
                      state: targetRoofIsVisible === true && targetRoofType === 'hip-with-all-gable-corners' ? 'active' : 'default',
                    }
                ),
              },
              {
                icon: 'hipRoof',
                label: lang.roofType('hip'),
                ...(
                  !isNull(roofPartsData) && roofPartsData.hip.length === 0
                    ? {
                      state: 'disabled',
                    }
                    : {
                      id: 'hip',
                      state: targetRoofIsVisible === true && targetRoofType === 'hip' ? 'active' : 'default',
                    }
                ),
              },
              {
                icon: 'wraparoundRoof',
                label: lang.roofType('wraparound'),
                ...(
                  !isNull(roofPartsData) && roofPartsData.wraparound.length === 0
                    ? {
                      state: 'disabled',
                    }
                    : {
                      id: 'wraparound',
                      state: targetRoofIsVisible === true && targetRoofType === 'wraparound' ? 'active' : 'default',
                    }
                ),
              },
              {
                icon: 'slantedRoof',
                label: lang.roofType('slanted'),
                ...(
                  !isNull(roofPartsData) && roofPartsData.slanted.length === 0
                    ? {
                      state: 'disabled',
                    }
                    : {
                      id: 'slanted',
                      state: targetRoofIsVisible === true && targetRoofType === 'slanted' ? 'active' : 'default',
                    }
                ),
              },
              {
                id: 'flat',
                icon: 'flatRoof',
                state: targetRoofIsVisible === true && targetRoofType === 'flat' ? 'active' : 'default',
                label: lang.roofType('flat'),
              },
              {
                id: 'none',
                icon: 'noRoof',
                state: targetRoofIsVisible === false ? 'active' : 'default',
                label: lang.roofType('none'),
              },
            ]}
            onClick={(type, e) => {
              assert(!isNullish(targetRoof), 'This should never happen. |hfp6dz|');
              assert(!isNullish(targetSpace), 'This should never happen. |3x6jdr|');

              e.stopPropagation();
              switch(type) {
                case 'none':
                  setRoofParams(targetRoof.id, null, {
                    isVisible: false,
                  });
                  setCeilingParams(targetSpace.id, null, {
                    isVisible: false,
                  });

                  break;
                case 'hip':
                  setRoofParams(targetRoof.id, null, {
                    isVisible: true,
                    type: 'hip',
                    activeGableIndices: [],
                    overhang: defaultRoofOverhang,
                  });

                  break;
                case 'hip-with-all-gable-corners': {
                  const { spaces } = useSpaces.getState();
                  const { walls } = useWalls.getState();
                  const { tempWalls } = useTempWalls.getState();

                  const biggestContour = (() => {
                    const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === targetRoof.id).flatMap(e => e.walls));
                    const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
                    const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
                    const biggestContour = (() => {
                      const { contours } = findSpaceClosedContours(spaceWalls);
                      const [biggestContour] = (
                        contours
                          .map(e => ({
                            area: calculateCoplanarPolygonArea(e),
                            contour: e,
                          }))
                          .toSorted((a, b) => b.area - a.area)
                      );

                      return isUndefined(biggestContour) ? [] : biggestContour.contour.slice(0, -1);
                    })();

                    return biggestContour;
                  })();

                  const { transformableGableToHipRoofParts } = calculateHipRoofDataCached({
                    roofId: targetRoof.id,
                    coords: biggestContour,
                    offset: targetRoof.roofData.overhang,
                    roofHeightFromBase: targetRoof.roofData.heightFromBase,
                    roofSlope: targetRoof.roofData.hipSlope,
                    gableIndices: targetRoof.roofData.activeGableIndices,
                    isClosedGable: false,
                  });

                  setRoofParams(targetRoof.id, null, {
                    isVisible: true,
                    type: 'hip',
                    activeGableIndices: transformableGableToHipRoofParts.map(e => e.index),
                    overhang: defaultRoofOverhang,
                  });

                  break;
                }
                case 'flat':
                  setRoofParams(targetRoof.id, null, {
                    isVisible: true,
                    type,
                    overhang: 0,
                  });

                  break;
                case 'slanted':
                case 'wraparound':
                  setRoofParams(targetRoof.id, null, {
                    isVisible: true,
                    type,
                    overhang: defaultRoofOverhang,
                  });

                  break;
                default:
                  ((e: never) => e)(type);
                  throw new Error('This should never happen. |rju92l|');
              }
            }}
          />
        </ComingSoonWrapper>
      </MenuItem>
      <AnimatePresence>
        {
          targetRoofType === 'slanted' && (
            <Animations.collapseIconButtons>
              <MenuItem grow spaceBetween minHeight='unset' paddingHorizontal>
                <FieldButton
                  icon='arrowRotateLeft'
                  text={lang.slideUpMenus.roofSettings.rotate}
                  onClick={() => {
                    assert(!isNullish(targetRoof), 'This should never happen. |u28wb7|');

                    rotateSlantedRoof(targetRoof.id, 'counterclockwise');
                  }}
                />
                <FieldButton
                  icon='arrowRotateRight'
                  text={lang.slideUpMenus.roofSettings.rotate}
                  onClick={() => {
                    assert(!isNullish(targetRoof), 'This should never happen. |cg5cq6|');

                    rotateSlantedRoof(targetRoof.id, 'clockwise');
                  }}
                />
              </MenuItem>
            </Animations.collapseIconButtons>
          )
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          targetRoofType === 'wraparound' && (
            <Animations.collapseIconButtons>
              <MenuItem grow center minHeight='unset' paddingHorizontal>
                <FieldButton
                  icon='flipHorizontal'
                  text={lang.slideUpMenus.roofSettings.flip}
                  onClick={() => {
                    assert(!isNullish(targetRoof), 'This should never happen. |w8x9y2|');

                    setRoofParams(targetRoof.id, null, {
                      isFlippedWraparound: targetRoof.roofData.isFlippedWraparound === false,
                    });
                  }}
                />
              </MenuItem>
            </Animations.collapseIconButtons>
          )
        }
      </AnimatePresence>
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.roofSettings.commentName}
          size='lg'
          value={isNullish(targetRoof) ? '' : targetRoof.roofData.commentName}
          onChange={commentName => {
            assert(!isNullish(targetRoof), 'This should never happen. |xps3zv|');

            setRoofParams(targetRoof.id, null, { commentName });
          }}
        />
      </MenuItem>
    </MenuSection>
  );
};
