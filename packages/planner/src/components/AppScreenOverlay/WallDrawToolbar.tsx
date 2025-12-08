import { PopUpToolbar, ToolbarButton } from '@draw-house/ui/dist/components';
import { useCreationMode, useCreationModeConfig, useFeatureMapState } from '../../zustand';
import { quickTourClassNames } from '../../constants';
import { useIsWallDrawToolbarShown } from '../../zustand/useIsWallDrawToolbarShown';
import { ComingSoonWrapper } from '../ComingSoonWrapper';
import { IsRoofActiveButton } from './IsRoofActiveButton';
import { LocalStorageService } from '../../services/LocalStorageService';
import { Tooltip } from '../Tooltip';
import { lang } from '../../lang';
import { useTouchScreen } from '../../zustand/useTouchScreen';
import { IdleClose } from '../IdleClose';

export const WallDrawToolbar: React.FC = () => {
  const { creationMode } = useCreationMode();
  const { isTouchScreen } = useTouchScreen();
  const { creationModeConfig } = useCreationModeConfig();
  const { featureMapState } = useFeatureMapState();
  const { isWallDrawToolbarShown } = useIsWallDrawToolbarShown();

  return (
    <IdleClose
      delay={4000}
      ignore={() => LocalStorageService.quickTour.isCompleted.get() === false || featureMapState === 'show'}
      getIsOpened={() => creationMode === 'walls' && isWallDrawToolbarShown === true}
      onClose={() => {
        useIsWallDrawToolbarShown.setState({
          isWallDrawToolbarShown: false,
        });
      }}
    >
      <PopUpToolbar
        mode='static'
        orientation='vertical'
        items={
          <>
            <ToolbarButton
              className={quickTourClassNames.drawLineTool}
              icon='straightLine'
              state={creationModeConfig.mode === 'straightLine' ? 'active' : 'default'}
              onClick={() => {
                useCreationModeConfig.setState({
                  creationModeConfig: {
                    ...creationModeConfig,
                    mode: 'straightLine',
                  },
                });
              }}
            />
            {
              isTouchScreen === false && (
                <ToolbarButton
                  icon='multipleStraightLines'
                  state={creationModeConfig.mode === 'multipleStraightLines' ? 'active' : 'default'}
                  onClick={() => {
                    useCreationModeConfig.setState({
                      creationModeConfig: {
                        ...creationModeConfig,
                        mode: 'multipleStraightLines',
                      },
                    });
                  }}
                />
              )
            }
            <ComingSoonWrapper>
              <ToolbarButton
                icon='rectangle'
                state='disabled'
                onClick={() => {}}
              />
            </ComingSoonWrapper>
            <ComingSoonWrapper>
              <ToolbarButton
                icon='hexagon'
                state='disabled'
                onClick={() => {}}
              />
            </ComingSoonWrapper>
            <ComingSoonWrapper>
              <ToolbarButton
                icon='curvedLine'
                state='disabled'
                onClick={() => {}}
              />
            </ComingSoonWrapper>
            <ComingSoonWrapper>
              <ToolbarButton
                icon='brokenCurvedLine'
                state='disabled'
                onClick={() => {}}
              />
            </ComingSoonWrapper>
          </>
        }
        expandableItems={
          <>
            <Tooltip position='left' content={lang.tooltips.wallDrawToolbarWall}>
              <ToolbarButton
                icon='wall'
                state={creationModeConfig.isWallVisible === true ? 'active' : 'default'}
                onClick={() => {
                  useCreationModeConfig.setState({
                    creationModeConfig: {
                      ...creationModeConfig,
                      isWallVisible: creationModeConfig.isWallVisible === false,
                    },
                  });
                }}
              />
            </Tooltip>
            <Tooltip position='left' content={lang.tooltips.wallDrawToolbarFloor}>
              <ToolbarButton
                icon='floor'
                state={creationModeConfig.isFloorVisible === true ? 'active' : 'default'}
                onClick={() => {
                  useCreationModeConfig.setState({
                    creationModeConfig: {
                      ...creationModeConfig,
                      isFloorVisible: creationModeConfig.isFloorVisible === false,
                    },
                  });
                }}
              />
            </Tooltip>
            <IsRoofActiveButton />
            <Tooltip position='left' content={lang.tooltips.wallDrawToolbarCeiling}>
              <ToolbarButton
                icon='ceiling'
                state={creationModeConfig.isCeilingVisible === true ? 'active' : 'default'}
                onClick={() => {
                  useCreationModeConfig.setState({
                    creationModeConfig: {
                      ...creationModeConfig,
                      isCeilingVisible: creationModeConfig.isCeilingVisible === false,
                    },
                  });
                }}
              />
            </Tooltip>
          </>
        }
      />
    </IdleClose>
  );
};
