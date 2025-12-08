import { InfoRow, InlineAction, MenuItem, MenuItemTitle, OptionButton, OptionButtonTitle, ScopeControlRow, ScopeText, ScopeTextHighlighted, SwitchRow, TextField } from '@draw-house/ui/dist/components';
import { getNotUndefined, isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import assert from 'assert';
import { AnimatePresence } from 'framer-motion';
import { CeilingWithCornersIcon, FloorWithCornersIcon, RoofOnlyIcon } from '@draw-house/ui/dist/components/Icons';
import { clearFutureWalls, closeSlideUpMenuLvl1, setCeilingParams, setFloorParams, setSpaceParams, setSpaceRoofUniqueness, SlideUpMenuLvl1Store, useGlobalSettings, useLevels, useSpaces, useTempWalls, useWalls } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { getSpaceAreaWithUnits, measurements } from '../../../utils';
import { setRoofParams, useRoofs } from '../../../zustand/useRoofs';
import { RoofTypeSwitcher } from './RoofSettings/RoofType';
import { Animations } from '../../animations';
import { openRoofSettingsSlideUpMenu } from '../../../utils/handlerHelpers/openRoofSettingsSlideUpMenu';

export type SpaceSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'space' }>;
};

export const SpaceSettings: React.FC<SpaceSettingsProps> = ({
  slideUpMenuLvl1: {
    isOpened,
    spaceId,
  },
}) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { spaces } = useSpaces();
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { roofs } = useRoofs();
  const { levels } = useLevels();

  const targetSpace = isNull(spaceId) ? null : spaces.find(e => e.id === spaceId);
  const targetRoof = isNullish(targetSpace) ? null : getNotUndefined(roofs.find(e => e.id === targetSpace.roofId), 'Something went wrong. |k8efa1|');

  const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
  const spaceWalls = (
    isNullish(targetSpace)
      ? []
      : targetSpace.walls.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e))
  );
  const spaceArea = isNullish(targetSpace) ? '0' : getSpaceAreaWithUnits(targetSpace.id, spaceWalls, measurementSystem);

  const spaceHeight = (() => {
    if(isNullish(targetSpace)) {
      return null;
    }

    const { levelId } = getNotUndefined(spaceWalls[0], 'Something went wrong. |hj7p0c|');
    const { height } = getNotUndefined(levels.find(e => e.id === levelId), 'Something went wrong. |0k71c9|');

    return height;
  })();

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.spaceSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuItem divider paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.spaceSettings.name}
          size='lg'
          value={isNullish(targetSpace) ? '' : targetSpace.name}
          onChange={name => {
            assert(!isNull(spaceId), 'This should never happen. |gyy9r6|');

            setSpaceParams(spaceId, { name });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <InfoRow title={lang.slideUpMenus.spaceSettings.spaceArea} value={spaceArea} />
      </MenuItem>
      <MenuItem divider>
        <InfoRow
          title={lang.height}
          value={measurements.pretty.mFtIn(isNull(spaceHeight) ? 0 : spaceHeight, measurementSystem)}
        />
      </MenuItem>
      <MenuItem paddingHorizontal paddingVertical='md' minHeight='unset'>
        <MenuItemTitle>{lang.slideUpMenus.spaceSettings.spaceOptions}</MenuItemTitle>
      </MenuItem>
      <MenuItem paddingHorizontal paddingBottom='ml' divider gap={10}>
        <OptionButton
          state={!isNull(targetRoof) && targetRoof.roofData.isVisible === true ? 'active' : 'default'}
          onClick={() => {
            assert(!isNull(targetRoof), 'This should never happen. |m6c2q6|');

            setRoofParams(targetRoof.id, null, {
              isVisible: targetRoof.roofData.isVisible === false,
            });
          }}
        >
          <RoofOnlyIcon color='currentColor' />
          <OptionButtonTitle>{lang.roof}</OptionButtonTitle>
        </OptionButton>
        <OptionButton
          state={!isNullish(targetSpace) && targetSpace.floorData.isVisible === true ? 'active' : 'default'}
          onClick={() => {
            assert(!isNullish(targetSpace), 'This should never happen. |zwa215|');

            setFloorParams(targetSpace.id, null, {
              isVisible: targetSpace.floorData.isVisible === false,
            });
          }}
        >
          <FloorWithCornersIcon color='currentColor' />
          <OptionButtonTitle>{lang.floor}</OptionButtonTitle>
        </OptionButton>
        <OptionButton
          state={!isNullish(targetSpace) && targetSpace.ceilingData.isVisible === true ? 'active' : 'default'}
          onClick={() => {
            assert(!isNullish(targetSpace), 'This should never happen. |b4yk96|');

            setCeilingParams(targetSpace.id, null, {
              isVisible: targetSpace.ceilingData.isVisible === false,
            });
          }}
        >
          <CeilingWithCornersIcon color='currentColor' />
          <OptionButtonTitle>{lang.ceiling}</OptionButtonTitle>
        </OptionButton>
      </MenuItem>
      <MenuItem minHeight='unset' paddingVertical='md'>
        <ScopeControlRow>
          <ScopeText>
            <InlineAction
              onClick={async () => {
                assert(!isNullish(targetSpace), 'This should never happen. |cc5t09|');

                await openRoofSettingsSlideUpMenu(targetSpace.roofId);
              }}
            >
              <ScopeTextHighlighted>{lang.roof}</ScopeTextHighlighted>
            </InlineAction>
            {` ${lang.slideUpMenus.spaceSettings.sharedBetween}`}
          </ScopeText>
        </ScopeControlRow>
      </MenuItem>
      <MenuItem divider minHeight='unset' paddingBottom='ml'>
        <SwitchRow
          title={[
            lang.slideUpMenus.spaceSettings.hasUniqueRoof,
            !isNullish(targetSpace) && `${lang.slideUpMenus.spaceSettings.for} ${targetSpace.name}`,
          ].filter(e => e !== false).join(' ')}
          checked={isNullish(targetSpace) ? false : targetSpace.hasUniqueRoof}
          onClick={() => {
            assert(!isNullish(targetSpace), 'This should never happen. |n2pb4u|');

            setSpaceRoofUniqueness(targetSpace.id, targetSpace.hasUniqueRoof === false);
          }}
        />
      </MenuItem>
      <AnimatePresence>
        {
          !isNullish(targetSpace) && targetSpace.hasUniqueRoof === true && (
            <Animations.collapseRow>
              <RoofTypeSwitcher targetRoof={targetRoof} />
            </Animations.collapseRow>
          )
        }
      </AnimatePresence>
    </SlideUpAndFloatingMenusWrapper>
  );
};
