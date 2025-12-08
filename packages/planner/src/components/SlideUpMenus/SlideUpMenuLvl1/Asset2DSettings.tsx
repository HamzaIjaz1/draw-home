import { LocationButtonRow, MainButton, MenuItem, MenuSection, SelectRow, SliderRow, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { isNull, isNullish } from '@arthurka/ts-utils';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useEffect, useState } from 'react';
import { closeSlideUpMenuLvl1, importScanDataFromFloorScanner, openSnackbar, setAsset2DParams, SlideUpMenuLvl1Store, useCustomModels, useLevels } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { SuspenseHOC } from '../../SuspenseHOC';
import { setAsset2DTransparencyWithUpdate, useAsset2DTransparency } from '../../../zustand/useAsset2DTransparency';
import { scanFloorPlanImage } from '../../../services';
import { useStrapiAppConfigResolved } from '../../../zustand/useStrapiAppConfig';
import { applyAsset2DAutoscale } from '../../../services/fetch/asset2DAutoscale';

export type Asset2DSettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'asset2DSettings' }>;
};

export const Asset2DSettings: React.FC<Asset2DSettingsProps> = SuspenseHOC(({
  slideUpMenuLvl1: {
    isOpened,
    asset2DId,
  },
}) => {
  checkIsNotNever(isOpened);

  const { strapiAppConfig } = useStrapiAppConfigResolved();
  const { customModels } = useCustomModels();
  const { levels } = useLevels();
  const { asset2DTransparency } = useAsset2DTransparency();

  assert(!isNull(asset2DTransparency), 'Something went wrong. |57q9cj|');

  const targetAsset2D = isNull(asset2DId) ? null : customModels.find(e => e.id === asset2DId);
  // Note: optional chaining is critical here
  assert(isNullish(targetAsset2D) || targetAsset2D?.type === 'asset-2d', 'Something went wrong. |z5eql6|');

  useEffect(() => {
    if(isNullish(targetAsset2D)) {
      return;
    }

    useAsset2DTransparency.setState({
      asset2DTransparency: targetAsset2D.transparency,
    });
  }, [targetAsset2D]);

  const [wallThreshold, setWallThreshold] = useState(150);
  const [wallFurnitureThreshold, setWallFurnitureThreshold] = useState(150);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.asset2DSettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
    >
      <MenuItem paddingHorizontal divider>
        <TextField
          type='text'
          label={lang.slideUpMenus.asset2DSettings.commentName}
          size='lg'
          value={isNullish(targetAsset2D) ? '' : targetAsset2D.commentName}
          onChange={commentName => {
            assert(!isNullish(targetAsset2D), 'This should never happen. |c91x2w|');

            setAsset2DParams(targetAsset2D.id, { commentName });
          }}
        />
      </MenuItem>
      <MenuSection
        type='collapsible'
        defaultExpanded
        title={lang.settings}
      >
        <MenuItem paddingHorizontal paddingVertical='md'>
          <SliderRow
            label={lang.slideUpMenus.asset2DSettings.transparency}
            min={0}
            max={1}
            step={0.001}
            value={asset2DTransparency}
            onChange={transparency => {
              assert(!isNullish(targetAsset2D), 'This should never happen. |w70pi6|');

              setAsset2DTransparencyWithUpdate(transparency);
            }}
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md'>
          <SliderRow
            label={lang.slideUpMenus.asset2DSettings.tilt}
            min={0}
            max={180}
            step={1}
            value={isNullish(targetAsset2D) ? 0 : targetAsset2D.tilt}
            onChange={tilt => {
              assert(!isNull(asset2DId), 'This should never happen. |1fk935|');

              setAsset2DParams(asset2DId, { tilt });
            }}
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md'>
          <LocationButtonRow
            label={lang.slideUpMenus.asset2DSettings.location(isNullish(targetAsset2D) ? 'background' : targetAsset2D.location)}
            value={isNullish(targetAsset2D) ? 'background' : targetAsset2D.location}
            onChange={location => {
              assert(!isNull(asset2DId), 'This should never happen. |p0ld3g|');

              setAsset2DParams(asset2DId, { location });
            }}
          />
        </MenuItem>
        <MenuItem>
          <SelectRow
            label={lang.baseLevel}
            value={isNullish(targetAsset2D) ? '' : targetAsset2D.levelId}
            options={levels.map(e => ({ label: e.name, value: e.id }))}
            onChange={levelId => {
              assert(!isNull(asset2DId), 'This should never happen. |r4zqg2|');

              setAsset2DParams(asset2DId, { levelId });
            }}
          />
        </MenuItem>
        {
          strapiAppConfig.enableFloorPlanAIFeature === true && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '8px 0',
              }}
            >
              <MenuItem paddingHorizontal>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <MainButton
                    text={lang.slideUpMenus.aiTools.create3D}
                    width='md'
                    height='md'
                    onClick={async () => {
                      assert(!isNullish(targetAsset2D), 'This should never happen. |sb80kt|');

                      const { success, data, error } = await scanFloorPlanImage({
                        url: targetAsset2D.url,
                        wallThreshold,
                        wallFurnitureThreshold,
                      });
                      if(success === false) {
                        await openSnackbar({
                          type: 'warning',
                          message: lang.floorPlanRecognition.error[error.type],
                        });
                        return;
                      }

                      importScanDataFromFloorScanner(data, targetAsset2D);

                      await openSnackbar({
                        type: 'success',
                        message: lang.floorPlanRecognition.success,
                      });
                    }}
                  />
                  <MainButton
                    text='Autoscale'
                    width='md'
                    height='md'
                    onClick={async () => {
                      assert(!isNullish(targetAsset2D), 'This should never happen. |d074vc|');

                      await applyAsset2DAutoscale(targetAsset2D);
                    }}
                  />
                </div>
              </MenuItem>
              <div title={lang.slideUpMenus.aiTools.accuracyTooltip}>
                <MenuItem paddingHorizontal>
                  <SliderRow
                    label={lang.slideUpMenus.aiTools.accuracy}
                    min={1}
                    max={1000}
                    step={1}
                    value={wallThreshold}
                    onChange={e => {
                      setWallThreshold(Math.round(e));
                    }}
                  />
                </MenuItem>
                <MenuItem paddingHorizontal>
                  <SliderRow
                    label={lang.slideUpMenus.aiTools.wallFurnitureAccuracy}
                    min={1}
                    max={1000}
                    step={1}
                    value={wallFurnitureThreshold}
                    onChange={e => {
                      setWallFurnitureThreshold(Math.round(e));
                    }}
                  />
                </MenuItem>
              </div>
            </div>
          )
        }
      </MenuSection>
    </SlideUpAndFloatingMenusWrapper>
  );
});
