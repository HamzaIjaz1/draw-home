import { InfoRow, Material, MenuItem, MenuSection, SwitchRow, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { isNull, isNullish } from '@arthurka/ts-utils';
import { checkIsNotNever, fixIEEE } from '@draw-house/common/dist/utils';
import { isPositive } from '@draw-house/common/dist/brands';
import {
  clearFutureWalls,
  closeSlideUpMenuLvl1,
  openSlideUpMenuLvl2,
  setWallParams,
  SlideUpMenuLvl1Store,
  useGlobalSettings,
  useLevels,
  useTempWalls,
  useWalls,
} from '../../../zustand';
import { lang } from '../../../lang';
import { getImageWithDefault, getVector2Distance, measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { MeasurementPairedInputRow } from '../../MeasurementPairedInputRow';
import { useAppearanceColor } from '../../../zustand/useAppearanceColor';
import { useTexturesMixedWithColor } from '../../../customHooks/useTextureMixedWithColor';
import { compositeOperations } from '../../../constants';
import { getWallType } from '../../../utils/getWallType';

export type WallSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'wall' }>;
};

export const WallSettings: React.FC<WallSettingsProps> = ({ slideUpMenuLvl1: { isOpened, wallId } }) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { levels } = useLevels();

  const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
  const targetWall = isNull(wallId) ? null : futureWalls.find(e => e.id === wallId);
  const targetLevel = isNullish(targetWall) ? null : levels.find(e => e.id === targetWall.levelId);
  const wallLength = (
    isNullish(targetWall)
      ? 0
      : fixIEEE(getVector2Distance(targetWall.position.start, targetWall.position.end))
  );

  const [frontTextureMixedWithColor, backTextureMixedWithColor] = useTexturesMixedWithColor([
    {
      originalImageSrc: getImageWithDefault(targetWall?.frontTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      overlayColor: isNullish(targetWall) || isNull(targetWall.frontColorOverlay) ? null : targetWall.frontColorOverlay.value.hexa(),
      compositeOperation: isNullish(targetWall) ? compositeOperations[0] : targetWall.frontCompositeOperation,
    },
    {
      originalImageSrc: getImageWithDefault(targetWall?.backTexture.attributes.preview.data?.attributes.formats?.thumbnail.url),
      overlayColor: isNullish(targetWall) || isNull(targetWall.backColorOverlay) ? null : targetWall.backColorOverlay.value.hexa(),
      compositeOperation: isNullish(targetWall) ? compositeOperations[0] : targetWall.backCompositeOperation,
    },
  ]);

  const isWallSidesTheSameType = (
    false
      || isNullish(targetWall)
      || isNull(targetWall.frontSideSpaceId) && isNull(targetWall.backSideSpaceId)
      || !isNull(targetWall.frontSideSpaceId) && !isNull(targetWall.backSideSpaceId)
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.wallSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      noDivider
    >
      <MenuItem divider>
        <InfoRow
          title={lang.type}
          value={isNullish(targetWall) ? '' : lang.wallTypes[getWallType(targetWall)]}
        />
      </MenuItem>
      <MenuItem paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.wallSettings.name}
          size='lg'
          value={isNullish(targetWall) ? '' : targetWall.commentName}
          onChange={commentName => {
            assert(!isNull(wallId), 'This should never happen. |r99js8|');

            setWallParams(wallId, { commentName });
          }}
        />
      </MenuItem>
      <MenuSection type='collapsible' defaultExpanded title={lang.slideUpMenus.appearance.title}>
        <MenuItem divider>
          <Material
            text={[
              isNullish(targetWall)
                ? lang.slideUpMenus.wallSettings.streetFacing
                : isNull(targetWall.frontSideSpaceId)
                  ? lang.slideUpMenus.wallSettings.streetFacing
                  : lang.slideUpMenus.wallSettings.roomFacing,
              isWallSidesTheSameType === true ? 1 : '',
            ].join(' ').trim()}
            image={frontTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetWall), 'This should never happen. |qk0hyf|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'wallAppearance',
                  color: targetWall.frontColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'wallAppearance',
                isOpened: true,
                wallId: targetWall.id,
                textureType: 'front',
                applyToAll: {
                  isActive: false,
                  type: 'sameFaceWallFaces',
                },
              });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text={[
              isNullish(targetWall)
                ? lang.slideUpMenus.wallSettings.streetFacing
                : isNull(targetWall.backSideSpaceId)
                  ? lang.slideUpMenus.wallSettings.streetFacing
                  : lang.slideUpMenus.wallSettings.roomFacing,
              isWallSidesTheSameType === true ? 2 : '',
            ].join(' ').trim()}
            image={backTextureMixedWithColor}
            onClick={async () => {
              assert(!isNullish(targetWall), 'This should never happen. |o12cut|');

              await closeSlideUpMenuLvl1({ preserveState: true });
              useAppearanceColor.setState({
                appearanceColor: {
                  type: 'wallAppearance',
                  color: targetWall.backColorOverlay,
                },
              });
              await openSlideUpMenuLvl2({
                type: 'wallAppearance',
                isOpened: true,
                wallId: targetWall.id,
                textureType: 'back',
                applyToAll: {
                  isActive: false,
                  type: 'sameFaceWallFaces',
                },
              });
            }}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection type='collapsible' defaultExpanded title={lang.settings}>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-thickness'
            label={lang.thickness}
            measurementSystem={measurementSystem}
            value={isNullish(targetWall) ? 0 : measurements.to(targetWall.thickness, measurementSystem)}
            min={measurements.to(0.01, measurementSystem)}
            max={measurements.to(10, measurementSystem)}
            onChange={value => {
              assert(!isNull(wallId), 'This should never happen. |563ae9|');

              const thickness = measurements.from(value, measurementSystem);
              if(!isPositive(thickness)) {
                return;
              }

              setWallParams(wallId, { thickness });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementPairedInputRow
            name='wall-height'
            label={lang.height}
            measurementSystem={measurementSystem}
            value={
              isNullish(targetWall) || isNullish(targetLevel)
                ? 0
                : measurements.to(!isNull(targetWall.height) ? targetWall.height : targetLevel.height, measurementSystem)
            }
            onChange={value => {
              assert(!isNull(wallId), 'This should never happen. |rs2a56|');

              const height = measurements.from(value, measurementSystem);
              if(!isPositive(height)) {
                return;
              }

              setWallParams(wallId, { height });
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={lang.slideUpMenus.wallSettings.length}
            value={measurements.pretty.mFtIn(wallLength, measurementSystem)}
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={lang.area}
            value={
              measurements.pretty.sqMSqFt(
                wallLength * (isNullish(targetLevel) ? 0 : targetLevel.height),
                measurementSystem,
              )
            }
          />
        </MenuItem>
        <MenuItem divider>
          <InfoRow
            title={lang.baseLevel}
            value={isNullish(targetLevel) ? '' : targetLevel.name}
          />
        </MenuItem>
      </MenuSection>
      <MenuItem divider minHeight='half-row'>{null}</MenuItem>
      <MenuItem divider>
        <SwitchRow
          title={lang.isInvisible}
          checked={isNullish(targetWall) ? true : targetWall.isVisible === false}
          onClick={() => {
            assert(!isNullish(targetWall), 'This should never happen. |5av2cx|');

            setWallParams(targetWall.id, {
              isVisible: targetWall.isVisible === false,
            });
          }}
        />
      </MenuItem>
    </SlideUpAndFloatingMenusWrapper>
  );
};
