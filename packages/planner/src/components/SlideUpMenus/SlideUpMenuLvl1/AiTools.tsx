import { MainButton, MenuItem, MenuSection, PromptTextArea, SliderRow, Tab, Tabs } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { useState } from 'react';
import { closeSlideUpMenuLvl1, SlideUpMenuLvl1Store } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { Animations } from '../../animations';

export type AiToolsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'aiTools' }>;
};

export const AiTools: React.FC<AiToolsProps> = ({ slideUpMenuLvl1: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const [chosenTabIndex, setChosenTabIndex] = useState(0);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.aiTools.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      header={
        <Tabs
          chosenTab={chosenTabIndex}
          stretch
          onClick={setChosenTabIndex}
        >
          <Tab label={lang.slideUpMenus.catalog.list} />
          <Tab label={lang.slideUpMenus.catalog.libraries} />
          <Tab label={lang.slideUpMenus.catalog.import} />
        </Tabs>
      }
    >
      <Animations.collapseBlock key={chosenTabIndex}>
        {
          chosenTabIndex === 0 && (
            <>
              <div style={{ margin: '8px 0' }} />
              <MenuItem paddingHorizontal>
                <MainButton
                  text='Select Room'
                  width='fill'
                  height='md'
                  onClick={() => {}}
                />
              </MenuItem>
            </>
          )
        }
        {
          (chosenTabIndex === 0 || chosenTabIndex === 1) && (
            <>
              <MenuSection
                type='static'
                title={lang.slideUpMenus.aiTools.generateFromPrompt}
                titleVariant='pale'
              >
                <MenuItem paddingHorizontal>
                  <PromptTextArea
                    value=''
                    onChange={() => {}}
                  />
                </MenuItem>
              </MenuSection>
              <div style={{ margin: '8px 0' }} />
              <MenuItem paddingHorizontal spaceBetween>
                <MainButton
                  text={lang.slideUpMenus.aiTools.preview}
                  width='lg'
                  height='md'
                  shadowless
                  onClick={() => {}}
                />
                <MainButton
                  text={lang.slideUpMenus.aiTools.remake}
                  width='lg'
                  height='md'
                  shadowless
                  onClick={() => {}}
                />
              </MenuItem>
              <MenuSection
                type='static'
                title={`${lang.slideUpMenus.aiTools.preview}:`}
                titleVariant='pale'
              >
                <MenuItem paddingHorizontal>
                  <img
                    style={{ objectFit: 'contain', width: '100%' }}
                    src='https://placehold.co/10'
                  />
                </MenuItem>
                <div style={{ margin: '8px 0' }} />
                <MenuItem paddingHorizontal spaceBetween>
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                  >
                    <MainButton
                      text='<'
                      variant='contained'
                      width='fit-content'
                      height='md'
                      onClick={() => {}}
                    />
                    <MainButton
                      text='>'
                      variant='contained'
                      width='fit-content'
                      height='md'
                      onClick={() => {}}
                    />
                  </div>
                  <MainButton
                    text={lang.slideUpMenus.aiTools.create3D}
                    variant='contained'
                    width='lg'
                    height='md'
                    onClick={() => {}}
                  />
                </MenuItem>
              </MenuSection>
            </>
          )
        }
        {
          chosenTabIndex === 2 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '8px 0',
              }}
            >
              <MenuItem paddingHorizontal>
                <MainButton
                  text={lang.slideUpMenus.aiTools.select2DAsset}
                  width='fill'
                  height='md'
                  onClick={() => {}}
                />
              </MenuItem>
              <MenuItem paddingHorizontal>
                <MainButton
                  text={lang.slideUpMenus.aiTools.create3D}
                  width='md'
                  height='md'
                  onClick={() => {}}
                />
              </MenuItem>
              <MenuItem paddingHorizontal>
                <SliderRow
                  label={lang.slideUpMenus.aiTools.accuracy}
                  min={1}
                  max={1000}
                  step={1}
                  value={500}
                  onChange={() => {}}
                />
              </MenuItem>
              <MenuItem paddingHorizontal>
                <SliderRow
                  label={lang.slideUpMenus.aiTools.wallFurnitureAccuracy}
                  min={1}
                  max={1000}
                  step={1}
                  value={500}
                  onChange={() => {}}
                />
              </MenuItem>
            </div>
          )
        }
      </Animations.collapseBlock>
    </SlideUpAndFloatingMenusWrapper>
  );
};
