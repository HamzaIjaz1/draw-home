import { Levels, LevelsProps, MainButton, MenuItem } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { freeUserLevelsLimit } from '@draw-house/common/dist/constants';
import { activateLevel, closeSlideUpMenuLvl1, duplicateLevel, openSlideUpMenuLvl2, setLevelParams, SlideUpMenuLvl1Store, updateNewLevelData, useGlobalSettings, useLevels, useUserResolved } from '../../../zustand';
import { lang } from '../../../lang';
import { measurements } from '../../../utils';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { usePaywallPopUpState } from '../../../zustand/usePaywallPopUpState';
import { isPrivilegedUser } from '../../../utils/isPrivilegedUser';

export type LevelsSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'levels' }>;
};

export const LevelsSettings: React.FC<LevelsSettingsProps> = ({ slideUpMenuLvl1: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const theme = useTheme();
  const { levels } = useLevels();
  const { user } = useUserResolved();

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.levelsSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      header={
        <MenuItem paddingHorizontal minHeight='unset'>
          <MainButton
            icon='plusCircled'
            text={lang.slideUpMenus.levelsSettings.addNewLevel}
            variant='text'
            height='md'
            padding='sm'
            iconColors={{ default: theme.palette.primary.main }}
            onClick={async () => {
              const hasLimitedAccess = user === 'guest' || !isPrivilegedUser(user);
              if(hasLimitedAccess === true && levels.length >= freeUserLevelsLimit) {
                usePaywallPopUpState.setState({
                  paywallPopUpState: { type: 'paywall' },
                });
                return;
              }

              updateNewLevelData();

              await closeSlideUpMenuLvl1({ preserveState: true });
              await openSlideUpMenuLvl2({
                type: 'newLevel',
                isOpened: true,
              });
            }}
          />
        </MenuItem>
      }
    >
      <Levels
        items={
          levels.map(({ id, isActive, name, elevation, height, isLevelVisible, isSemiTransparent }): LevelsProps['items'][number] => ({
            id,
            title: name,
            visible: isLevelVisible,
            transparent: isSemiTransparent,
            highlighted: isActive,
            subtitle: [
              measurements.pretty.mFtIn(elevation, measurementSystem),
              '+',
              measurements.pretty.mFtIn(height, measurementSystem),
            ].join(' '),
            onVisibilityChange() {
              setLevelParams(id, {
                isLevelVisible: isLevelVisible === false,
              });
            },
            onTransparencyClick() {
              setLevelParams(id, {
                isSemiTransparent: isSemiTransparent === false,
              });
            },
            onClick() {
              activateLevel(id);
            },
            onDuplicationClick() {
              const hasLimitedAccess = user === 'guest' || !isPrivilegedUser(user);
              if(hasLimitedAccess === true && levels.length >= freeUserLevelsLimit) {
                usePaywallPopUpState.setState({
                  paywallPopUpState: { type: 'paywall' },
                });
                return;
              }

              duplicateLevel(id);
            },
            async onSettingsClick() {
              await closeSlideUpMenuLvl1({ preserveState: true });
              await openSlideUpMenuLvl2({
                type: 'levelSettings',
                levelId: id,
                isOpened: true,
              });
            },
          }))
        }
      />
    </SlideUpAndFloatingMenusWrapper>
  );
};
