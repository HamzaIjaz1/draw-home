import { AnchorTo, Box, CompassIcon, IconButton, IconButtonProps, IconMenuContainer, MainScreenOverlay } from '@draw-house/ui/dist/components';
import { isArrayIncludes, isArrayLength, isNull } from '@arthurka/ts-utils';
import styled from 'styled-components';
import { mainScreenOverlayTopRightMenuGap } from '@draw-house/ui/dist/components/MainScreenOverlay/styles';
import { useTheme } from '@mui/material';
import { useCallback } from 'react';
import assert from 'assert';
import { furnitureCreationModes, resetCurrentCamera, useCreationMode, useFeatureMapState, useFeatureTipsResolved, useOnboardingJourneyEvents } from '../../zustand';
import { GlobalSettingsButton } from './GlobalSettingsButton';
import { UndoRedoButtons } from './UndoRedoButtons';
import { BackSaveButtons } from './BackSaveButtons';
import { LevelButton } from './LevelButton';
import { Animations } from '../animations';
import { VisibilityButton } from './VisibilityButton';
import { CatalogButton } from './CatalogButton';
import { floatingMenuDOMNodeId, quickTourClassNames } from '../../constants';
import { ViewModeToggle } from './ViewModeToggle';
import { AiToolsButton } from './AiToolsButton';
import { useQuickTour } from '../../customHooks';
import { MeasureScale2DInput } from '../MeasureScale2DInput';
import { WallDrawToolbar } from './WallDrawToolbar';
import { OnboardingInfoPanel } from './OnboardingInfoPanel';
import { LocalStorageService } from '../../services/LocalStorageService';
import { GenericInfoPanel } from './GenericInfoPanel';
import { useWallLengthChangeInputData } from '../../zustand/useWallLengthChangeInputData';
import { WallLengthChangeInput } from '../WallLengthChangeInput';
import { ShareButton } from './ShareButton';
import { ImageAssetsPopupButton } from './ImageAssetsPopupButton';
import { clickPointerModeButton } from '../../utils/creationModeOrigin';
import { useSelectedItem } from '../../zustand/useSelectedItem';
import { useIsInfoPanelOpened } from '../../zustand/useIsInfoPanelOpened';
import { Hotkey } from '../Hotkey';
import { clickWallCreationButton } from '../../utils/handlerHelpers/clickWallCreationButton';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';
import { IdleClose } from '../IdleClose';

const FloatingMenuWrapper = styled.div`
  display: flex;
  margin: 0 -${mainScreenOverlayTopRightMenuGap / 2}px;
`;

export const AppScreenOverlay: React.FC = () => {
  const { creationMode } = useCreationMode();
  const { selectedItem } = useSelectedItem();
  const { wallLengthChangeInputData } = useWallLengthChangeInputData();
  const { quickTourState, openQuickTour } = useQuickTour();
  const { featureMapState } = useFeatureMapState();
  const { isInfoPanelOpened } = useIsInfoPanelOpened();

  const theme = useTheme();
  const { onboardingJourneyEvents } = useOnboardingJourneyEvents();
  const { featureTips } = useFeatureTipsResolved();
  const onboardingState = LocalStorageService.infoPanel.onboarding.get();

  const removeCurrentOnboardingEvent = useCallback(() => {
    useOnboardingJourneyEvents.setState({
      onboardingJourneyEvents: onboardingJourneyEvents.slice(1),
    });
  }, [onboardingJourneyEvents]);

  if(
    true
      && onboardingJourneyEvents.length > 0
      && isInfoPanelOpened === false
      && onboardingState === 'not-initiated'
      && quickTourState === 'completed'
      && featureMapState !== 'show'
  ) {
    useIsInfoPanelOpened.setState({ isInfoPanelOpened: true });
  }

  return (
    <MainScreenOverlay
      topLeft={
        <>
          <Animations.fromLeft>
            <BackSaveButtons />
          </Animations.fromLeft>
          <CompassIcon />
        </>
      }
      topCenter={<ViewModeToggle />}
      topRight={
        <>
          <Box row justify='flex-end' gap={10}>
            <ShareButton />
            <GlobalSettingsButton />
          </Box>
          <Box row justify='flex-end' gap={mainScreenOverlayTopRightMenuGap}>
            <WallDrawToolbar />
            <FloatingMenuWrapper id={floatingMenuDOMNodeId} />
            <Animations.fromRight>
              <IconMenuContainer>
                <Hotkey position='left' label={lang.tooltips.wallCreationButton.hotkey}>
                  <Tooltip position='left' content={lang.tooltips.wallCreationButton}>
                    <IconButton
                      icon='layout'
                      state={creationMode === 'walls' ? 'active' : 'default'}
                      onClick={clickWallCreationButton}
                    />
                  </Tooltip>
                </Hotkey>
                <Hotkey position='left' label={lang.tooltips.pointerModeButton.hotkey}>
                  <Tooltip position='left' content={lang.tooltips.pointerModeButton}>
                    <IconButton
                      className={quickTourClassNames.menuPointer}
                      icon={isArrayIncludes(furnitureCreationModes, creationMode) ? 'close' : 'pointer'}
                      state={creationMode === 'pointer' ? 'active' : 'default'}
                      onClick={clickPointerModeButton}
                    />
                  </Tooltip>
                </Hotkey>
                <LevelButton />
                <VisibilityButton />
                <ImageAssetsPopupButton />
                <AiToolsButton />
                <CatalogButton />
              </IconMenuContainer>
            </Animations.fromRight>
          </Box>
        </>
      }
      bottomLeft={
        <Animations.fromLeft>
          <UndoRedoButtons />
        </Animations.fromLeft>
      }
      bottomCenter={
        <Animations.fromBottom>
          <Hotkey position='top' label='R'>
            <IconButton
              icon='circleAroundDot'
              onClick={resetCurrentCamera}
            />
          </Hotkey>
        </Animations.fromBottom>
      }
      bottomCenterPriority={
        !isNull(selectedItem) && selectedItem.type === 'asset2D' && selectedItem.mode === 'measure-scale-mode' && !isNull(selectedItem.measuredDistanceWorld)
          ? <MeasureScale2DInput />
          : !isNull(wallLengthChangeInputData)
            ? <WallLengthChangeInput />
            : null
      }
      bottomRight={
        !isArrayLength(featureTips, '>', 0) ? null : (
          <AnchorTo
            xDirection='left'
            yDirection='top'
            yOffset='calc(100% + 10px)'
            anchored={
              <IdleClose
                delay={3000}
                getIsOpened={() => isInfoPanelOpened}
                onClose={() => {
                  useIsInfoPanelOpened.setState({ isInfoPanelOpened: false });
                }}
              >
                {
                  isArrayLength(onboardingJourneyEvents, '>', 0)
                    ? (
                      <OnboardingInfoPanel
                        featureTips={featureTips}
                        getOnboardingEvent={() => onboardingJourneyEvents[0]}
                        onClose={e => {
                          e.stopPropagation();

                          if(onboardingState === 'not-initiated') {
                            LocalStorageService.infoPanel.onboarding.set('closed-popup');
                          }

                          removeCurrentOnboardingEvent();
                          useIsInfoPanelOpened.setState({ isInfoPanelOpened: false });
                        }}
                        onNext={onboardingJourneyEvents.length <= 1 ? undefined : e => {
                          e.stopPropagation();

                          removeCurrentOnboardingEvent();
                        }}
                      />
                    )
                    : (
                      <GenericInfoPanel
                        featureTips={featureTips}
                        onOpenQuickTour={e => {
                          e.stopPropagation();

                          useIsInfoPanelOpened.setState({ isInfoPanelOpened: false });
                          openQuickTour();
                        }}
                        onClose={e => {
                          e.stopPropagation();

                          useIsInfoPanelOpened.setState({ isInfoPanelOpened: false });
                        }}
                      />
                    )
                }
              </IdleClose>
            }
          >
            <Hotkey position='topCloser' label='Alt, /'>
              <IconButton
                icon='hint'
                borderRadius='circle'
                iconColors={{ default: theme.palette.primary.main }}
                {
                  ...isInfoPanelOpened === true
                    ? {
                      state: 'disabled',
                      variant: 'text',
                    } satisfies Partial<IconButtonProps>
                    : (
                      onboardingState === 'closed-popup' && onboardingJourneyEvents.length > 0
                        ? {
                          variant: 'default',
                          state: 'active',
                          pulseGlow: onboardingJourneyEvents.length > 1 ? 2 : 1,
                        } satisfies Partial<IconButtonProps>
                        : {
                          variant: 'text',
                        } satisfies Partial<IconButtonProps>
                    )
                }
                onClick={e => {
                  e.stopPropagation();

                  assert(isInfoPanelOpened === false, 'This should never happen. |4yf4qt|');
                  useIsInfoPanelOpened.setState({ isInfoPanelOpened: true });
                }}
              />
            </Hotkey>
          </AnchorTo>
        )
      }
    />
  );
};
