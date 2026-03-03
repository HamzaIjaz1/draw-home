import { memo, useState } from 'react';
import { ButtonOptionsRow, ButtonRow, Checkbox, IconButton, IconPickerRow, IconPickerRowProps, IllustrationButton, IllustrationButtonProps, IllustrationButtonRow, InfoRow, MainButton, Material, MenuItem, MenuItemTitle, MenuSection, OptionButton, OptionButtonTitle, RoofLegendIcon, SelectRow, SettingsSpaceTitle, SwitchRow, TextField, TextOptionRow } from '../components';
import { noop } from '../utils/noop';
import { negate } from '../utils/negate';
import { theme } from '../theme';
import { CeilingWithCornersIcon, FloorWithCornersIcon, RoofOnlyIcon, WallIcon } from '../components/Icons';

const SelectRowWrap = memo(() => {
  const [value, setValue] = useState<'' | 1 | 2 | 3>(2);

  return (
    <SelectRow
      label='Parent level'
      value={value}
      options={[
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 },
        { label: 'label3', value: 3 },
      ]}
      onChange={setValue}
    />
  );
});

export const MiscMenuContent = memo(() => {
  const [spaceOption, setSpaceOption] = useState<null | 'wall' | 'roof' | 'floor' | 'ceiling'>(null);

  const [iconPickerItems, setIconPickerItems] = useState<IconPickerRowProps<string>['items']>([
    { id: 'hipRoof', icon: 'hipRoof', state: 'active' },
    { id: 'gableRoof', icon: 'gableRoof', state: 'default' },
    { id: 'wraparoundRoof', icon: 'wraparoundRoof', state: 'default' },
    { id: 'slantedRoof', icon: 'slantedRoof', state: 'default' },
    { id: 'flatRoof', icon: 'flatRoof', state: 'default' },
    { id: 'noRoof', icon: 'noRoof', state: 'default' },
  ]);

  const [expanded, setExpanded] = useState(true);

  const [iconPickerItems2, setIconPickerItems2] = useState<IconPickerRowProps<number>['items']>([
    { id: 0, icon: 'floor', state: 'default', variant: 'highlight-on-active' },
    { id: 1, icon: 'roof', state: 'active', variant: 'highlight-on-active' },
    { id: 2, icon: 'ceiling', state: 'default', variant: 'highlight-on-active' },
  ]);

  const [value, setValue] = useState('0.24');
  const [value2, setValue2] = useState('My project 1');

  const [illustrationBtnState, setIllustrationBtnState] = useState<IllustrationButtonProps['state']>('general');

  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  return (
    <>
      <MenuSection
        title='This is a shared roof. To change Roof settings of one room, use space settings'
        type='collapsible'
        titleVariant='pale'
        titleSize='14px'
        icon='hint'
        divider='content'
      >
        <MenuItem paddingHorizontal spaceBetween>
          <SettingsSpaceTitle>Living Room 1</SettingsSpaceTitle>
          <IconButton
            icon='gear'
            variant='text'
            size='sm'
            state='active'
            onClick={noop}
          />
        </MenuItem>
        <MenuItem paddingHorizontal spaceBetween>
          <SettingsSpaceTitle>Area 1</SettingsSpaceTitle>
          <IconButton
            icon='gear'
            variant='text'
            size='sm'
            state='active'
            onClick={noop}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection
        title='Roof hint'
        type='collapsible'
        titleVariant='pale'
        icon='hint'
        divider='content'
        defaultExpanded
      >
        <MenuItem center>
          <RoofLegendIcon />
        </MenuItem>
      </MenuSection>
      <MenuSection
        title={`Roof type / ${
          iconPickerItems
            .filter(e => e.state === 'active')
            .map(e => e.icon.replace('Roof', ''))
            .join('+')
        }`}
        type='collapsible'
        titleVariant='pale'
        icon='roof'
        divider='content'
        defaultExpanded
      >
        <MenuItem>
          <IconPickerRow
            items={iconPickerItems}
            onClick={idx => {
              setIconPickerItems(items => items.map((e): typeof items[number] => (
                e.id !== idx ? e : {
                  ...e,
                  state: e.state === 'active' ? 'default' : 'active',
                }
              )));
            }}
          />
        </MenuItem>
        <MenuItem paddingHorizontal>
          <TextField
            name='roof-overhang'
            label='Overhang'
            size='sm'
            onChange={noop}
            type='number'
            value='30'
            adornment='cm'
            max={200}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection
        title='Construction'
        type='collapsible'
        expanded={expanded}
        onChange={e => setExpanded(e)}
      >
        <MenuItem divider>
          <TextOptionRow
            label='Language'
            value='English'
            onClick={noop}
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md' minHeight='unset'>
          <MenuItemTitle>Space options</MenuItemTitle>
        </MenuItem>
        <MenuItem paddingHorizontal paddingBottom='ml' divider gap={10}>
          <OptionButton
            state={spaceOption === 'wall' ? 'active' : 'default'}
            onClick={() => setSpaceOption(e => e === 'wall' ? null : 'wall')}
          >
            <WallIcon color='currentColor' />
            <OptionButtonTitle>Wall</OptionButtonTitle>
          </OptionButton>
          <OptionButton
            state={spaceOption === 'roof' ? 'active' : 'default'}
            onClick={() => setSpaceOption(e => e === 'roof' ? null : 'roof')}
          >
            <RoofOnlyIcon color='currentColor' />
            <OptionButtonTitle>Roof</OptionButtonTitle>
          </OptionButton>

          <OptionButton
            state={spaceOption === 'floor' ? 'active' : 'default'}
            onClick={() => setSpaceOption(e => e === 'floor' ? null : 'floor')}
          >
            <FloorWithCornersIcon color='currentColor' />
            <OptionButtonTitle>Floor</OptionButtonTitle>
          </OptionButton>

          <OptionButton
            state={spaceOption === 'ceiling' ? 'active' : 'default'}
            onClick={() => setSpaceOption(e => e === 'ceiling' ? null : 'ceiling')}
          >
            <CeilingWithCornersIcon color='currentColor' />
            <OptionButtonTitle>Ceiling</OptionButtonTitle>
          </OptionButton>
        </MenuItem>
        <MenuItem divider paddingVertical='md'>
          <IconPickerRow
            items={iconPickerItems2}
            onClick={idx => {
              setIconPickerItems2(items => items.map((e): typeof items[number] => (
                e.id !== idx ? e : {
                  ...e,
                  state: e.state === 'active' ? 'default' : 'active',
                }
              )));
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <ButtonRow
            label='Replace / Wall'
            startIcon='replace'
            onClick={noop}
          />
        </MenuItem>
        <MenuItem divider paddingHorizontal>
          <TextField
            name='wall-length'
            label='Length'
            type='number'
            size='sm'
            value={value}
            onChange={e => setValue(e)}
            adornment='m'
            min={1}
            max={50}
          />
        </MenuItem>
        <MenuItem divider paddingHorizontal>
          <TextField
            type='text'
            name='project-name'
            label='Project name'
            size='lg'
            value={value2}
            onChange={e => setValue2(e)}
          />
        </MenuItem>
        <MenuItem>
          <SelectRowWrap />
        </MenuItem>
        <MenuItem divider>
          <ButtonOptionsRow
            label='Wall attachment'
            options={[
              { icon: 'centerWallAttachment', onClick: noop, selected: false },
              { icon: 'outsideWallAttachment', onClick: noop, selected: false },
              { icon: 'insideWallAttachment', onClick: noop, selected: true },
            ]}
          />
        </MenuItem>
        <MenuItem divider>
          <ButtonOptionsRow
            label='Measurements'
            options={[
              { text: 'M, cm', onClick: noop, selected: true },
              { text: 'F, inch', onClick: noop, selected: false },
            ]}
          />
        </MenuItem>
        <MenuItem divider paddingBottom='md'>
          <IllustrationButtonRow
            text={
              illustrationBtnState === 'general'
                ? 'Number of similar items: 3'
                : 'One of a kind'
            }
            beforeText={
              <Checkbox
                checked={isActive2}
                onClick={() => setIsActive2(negate)}
                text='Make the item unique'
              />
            }
            afterText={
              <IllustrationButton
                state={illustrationBtnState}
                generalLabel='General Item'
                uniqueLabel='Unique Item'
                onClick={() => {
                  setIllustrationBtnState(s => s === 'general' ? 'unique' : 'general');
                }}
              />
            }
          />
        </MenuItem>
      </MenuSection>
      <MenuSection
        title='Windows'
        type='static'
      >
        <MenuItem divider>
          <Material
            text='Door material'
            image='https://placehold.co/80x28'
            onClick={noop}
          />
        </MenuItem>
        <MenuItem divider>
          <Material
            text='Glass type'
            image='https://placehold.co/80x28'
            onClick={noop}
            disabled
          />
        </MenuItem>
        <MenuItem divider>
          <SwitchRow
            title='Threshold'
            checked={isActive}
            onClick={() => setIsActive(negate)}
          />
        </MenuItem>
        <MenuItem divider paddingHorizontal='row 3/4'>
          <MainButton
            icon='saveCopy'
            text='Save a Copy'
            variant='text'
            width='fit-content'
            height='md'
            padding='row 1/4'
            iconColors={{ default: theme.palette.primary.main }}
            textColors={{ default: theme.palette.text.secondary }}
            onClick={noop}
          />
        </MenuItem>
      </MenuSection>
      <MenuSection
        title='Door information'
        type='static'
      >
        <MenuItem divider>
          <InfoRow
            title='Door area'
            value='1,89 m²'
          />
        </MenuItem>
      </MenuSection>
    </>
  );
});
