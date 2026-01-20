import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';
import { memo, useCallback, useState } from 'react';
import { useTheme } from '@mui/material';
import { capitalize, SafeOmit } from '@draw-house/common/dist/utils';
import { ReactCompareSliderImage } from 'react-compare-slider';
import assert from 'assert';
import { isUndefined } from '@arthurka/ts-utils';
import { colorPickerBlue, colorPickerGreen, colorPickerRed, theme } from './theme';
import {
  AnchoredMenu,
  AnchorTo,
  AnnotatedTabs,
  AppearanceContainer,
  AppearanceIconButton,
  AppearanceInputsContainer,
  AppearanceSectionTitle,
  AppearanceTab,
  AppearanceTabs,
  Box,
  ButtonOptionsRow,
  ButtonRow,
  Checkbox,
  Dialog,
  DialogActions,
  DialogDescription,
  Divider,
  DropdownItem,
  ExportTabFormatPicker,
  FeatureMapOverlay,
  FieldButton,
  FileUploadArea,
  FloatingMenu,
  FloatingMenuContainer,
  IconButton,
  IconButtonProps,
  IconMenuContainer,
  IconPickerRow,
  IconPickerRowProps,
  ImageCompareSlider,
  InfoPanel,
  InfoRow,
  InitialMenuWrapper,
  InlineAction,
  Levels,
  LevelsProps,
  LocationButtonRow,
  MainButton,
  MainScreenOverlay,
  Material,
  MaterialCategoryPicker,
  MaterialPicker,
  Measurement,
  MeasurementInputRow,
  MenuItem,
  MenuSection,
  PopUp,
  PopUpToolbar,
  PreviewImage,
  PromptTextArea,
  PublicLink,
  RadioGroup,
  ReplaceElementInfoRow,
  RowBackdrop,
  ScopeCheckbox,
  ScopeControlRow,
  ScopeText,
  ScopeTextHighlighted,
  SearchInput,
  SecondaryButton,
  Select,
  SelectedUploadItem,
  ShareExportPopUpContentWrapper,
  SliderRow,
  SliderRowProps,
  SlideUpMenu,
  Snackbar,
  Tab,
  Tabs,
  Tag,
  TextField,
  TextOptionRow,
  ToolbarButton,
  TopToolbar,
  TopToolbarProps,
  Upload2DAssetsMenuContent,
  VisibilityMenuContent,
} from './components';
import {
  AccountPageContent,
  BillingBadge,
  BillingContent,
  BillingDividerBlock,
  BillingIsle,
  BillingIsles,
  BillingIsleSubTitle,
  BillingIsleTitle,
  BillingPaymentMethod,
  BillingSection,
  BillingSectionTitle,
  BillingUsageSummaries,
  BillingUsageSummary,
  BillingWithBadgeContainer,
  ButtonLinkLike,
  ComingSoonPageContent,
  FormButton,
  FormInput,
  Dialog as HubDialog,
  DialogActions as HubDialogActions,
  PageWithMenu,
  ProjectsPageContent,
  SupportPageContent,
  TabButton,
  TemplateScreen,
} from './components/Hub';
import { SideMenuProps } from './components/Hub/SideMenu';
import { CommonErrorTexts } from './components/Hub/Form';
import { ArrowClockwiseIcon, BidirectionalHorizontalArrowIcon, BidirectionalVerticalArrowIcon, CompassIcon, EnvelopeIcon, InformationIcon, LockIcon, PersonWalkingIcon, StairsLegendIcon } from './components/Icons';
import { Switch } from './components/Switch';
import { visibilityMenuItems } from './data';
import { useCheckDnDSupport } from './hooks';
import { encodeSvgAsDataUri, makeSolidColorImageUri } from './utils';
import { negate } from './utils/negate';
import { noop } from './utils/noop';
import { generateHSLColor } from './utils/generateHSLColor';
import { getPlusCircledSvgString } from './components/Icons/string';
import { mainScreenOverlayTopRightMenuGap } from './components/MainScreenOverlay/styles';
import { CatalogMenuDemo } from './demo/CatalogMenuDemo';
import { CatalogMenuContentDemo } from './demo/CatalogMenuContentDemo';
import { PaywallMenuDemo } from './demo/PaywallMenuDemo';
import { PaywallFloatingMenuDemo } from './demo/PaywallFloatingMenuDemo';
import { HotkeysDemo } from './demo/HotkeysDemo';
import { AllHotkeysMenuDemo } from './demo/AllHotkeysDemo';
import { MiscMenuContent } from './demo/MiscMenuContent';
import { IconsDemo } from './demo/IconsDemo';

import './styles.css';


const Container = styled('div')`
  padding: 8px;
`;

const HorizontalSection = styled('section')`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;

const Base = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

const PopUpToolbarGeneric = memo(() => {
  type Btn = 'tools' | 'plus' | 'duplicate' | 'eye' | 'image' | 'bin';
  const [chosenBtn, setChosenBtn] = useState<Btn | null>(null);

  return (
    <PopUpToolbar
      mode='static'
      items={
        <>
          <ToolbarButton
            icon='tools'
            state={chosenBtn === 'tools' ? 'active' : 'default'}
            onClick={() => setChosenBtn('tools')}
          />
          <ToolbarButton
            icon='plus'
            state={chosenBtn === 'plus' ? 'active' : 'default'}
            onClick={() => setChosenBtn('plus')}
          />
          <ToolbarButton
            icon='duplicate'
            state={chosenBtn === 'duplicate' ? 'active' : 'default'}
            onClick={() => setChosenBtn('duplicate')}
          />
          <ToolbarButton
            icon='eye'
            state={chosenBtn === 'eye' ? 'active' : 'default'}
            onClick={() => setChosenBtn('eye')}
          />
          <ToolbarButton
            image={makeSolidColorImageUri('#ed8282')}
            onClick={() => setChosenBtn('image')}
          />
          <ToolbarButton
            icon='bin'
            state={chosenBtn === 'bin' ? 'active' : 'default'}
            onClick={() => setChosenBtn('bin')}
          />
        </>
      }
    />
  );
});

const PopUpToolbarExpandable = memo(() => (
  <PopUpToolbar
    mode='static'
    orientation='vertical'
    items={
      <ToolbarButton
        icon='tools'
        onClick={noop}
      />
    }
    expandableItems={
      <ToolbarButton
        icon='eye'
        onClick={noop}
      />
    }
  />
));

const TopToolbarDefault = memo(({ closeMainOverlay }: { closeMainOverlay: () => void }) => {
  const render: TopToolbarProps['children'] = mode => {
    const propsByMode = {
      desktop: {
        variant: 'default',
        size: 'md',
      },
      mobile: {
        variant: 'text',
        size: 'sm',
        state: 'active',
      },
    } satisfies Record<typeof mode, Partial<IconButtonProps>>;

    const props = propsByMode[mode];

    return (
      <>
        <IconButton
          {...props}
          icon='back'
          onClick={closeMainOverlay}
        />
        <IconButton
          {...props}
          icon='save'
          onClick={noop}
          state='disabled'
        />
      </>
    );
  };

  return (
    <TopToolbar>
      {render}
    </TopToolbar>
  );
});

const commonErrorTexts: CommonErrorTexts = {
  required: 'This field is required',
  passwordsMismatch: 'Passwords are different',
};

const MaterialsMenuDemo = memo(() => {
  const title = 'Materials';
  const [open, setOpen] = useState(false);
  const [chosenMaterial, setChosenMaterial] = useState<number>();
  const [chosenMaterialCategory, setChosenMaterialCategory] = useState<number>();
  const [radioValue, setRadioValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
        header={
          <>
            <MaterialCategoryPicker
              options={[
                { id: 0 as number, image: 'https://placehold.co/56', name: 'None' },
                { id: 1 as number, image: 'https://placehold.co/56', name: 'Paint' },
                { id: 2 as number, image: 'https://placehold.co/56', name: 'Tiles' },
                { id: 3 as number, image: makeSolidColorImageUri('#ed8282'), name: 'Wallpapers' },
                { id: 4 as number, image: makeSolidColorImageUri('#81c14b', { width: 56, height: 56 }), name: 'Panels' },
                { id: 5 as number, image: 'https://placehold.co/56', name: 'Plaster' },
              ]}
              chosenOption={chosenMaterialCategory}
              onClick={id => setChosenMaterialCategory(id)}
            />

            <MenuItem paddingHorizontal>
              <RadioGroup
                name='wall-picker'
                value={radioValue}
                options={[
                  { label: 'Load-bearing wall', value: '1' },
                  { label: 'Partition wall', value: '2' },
                ]}
                onChange={setRadioValue}
                direction='row'
              />
            </MenuItem>
            <MenuItem paddingHorizontal>
              <Checkbox
                checked={isActive}
                onClick={() => setIsActive(!isActive)}
                text='Apply to all walls'
              />
            </MenuItem>
          </>
        }
      >
        <MaterialPicker
          shape='round'
          options={
            [
              ...(
                [
                  '# F2F2F2',
                  '# C5B2AE',
                  '# A8B0A5',
                  '# F8B0A5',
                  '# E8B0A5',
                  '# B8B0A5 Lorem ipsum',
                  '# A8C0A5',
                ].map((name, i) => ({
                  id: i,
                  name,
                  image: 'https://placehold.co/82',
                }))
              ),
              {
                id: -1,
                name: 'Add New',
                image: encodeSvgAsDataUri(getPlusCircledSvgString(theme.palette.primary.main)),
                noBorder: true,
              },
            ]
          }
          chosenOption={chosenMaterial}
          onClick={idx => setChosenMaterial(idx)}
        />
      </SlideUpMenu>
    </>
  );
});

const MiscMenuDemo = memo(() => {
  const title = 'Misc';
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
      >
        <MiscMenuContent />
      </SlideUpMenu>
    </>
  );
});

const InitMenuDemo = memo(() => {
  const title = 'Init';
  const [open, setOpen] = useState(false);

  const [iconPickerItems, setIconPickerItems] = useState<IconPickerRowProps<string>['items']>([
    { id: 'hipRoof', icon: 'hipRoof', state: 'active' },
    { id: 'gableRoof', icon: 'gableRoof', state: 'default' },
    { id: 'wraparoundRoof', icon: 'wraparoundRoof', state: 'default' },
    { id: 'slantedRoof', icon: 'slantedRoof', state: 'default' },
    { id: 'flatRoof', icon: 'flatRoof', state: 'default' },
    { id: 'noRoof', icon: 'noRoof', state: 'default' },
  ]);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      {open === true && (
        <InitialMenuWrapper>
          <FloatingMenu
            title='float'
            onClose={() => setOpen(false)}
          >
            <MenuItem>
              <InfoRow title='Name' value='kitchen' />
            </MenuItem>
            <MenuSection
              title='Auto Generated Roof Style'
              type='static'
              titleVariant='pale'
              divider='content'
              paddingBottom='20px'
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
            </MenuSection>
            <MenuItem paddingHorizontal paddingTop='ml'>
              <MainButton
                text='Continue'
                width='fill'
                height='md'
                onClick={() => setOpen(false)}
              />
            </MenuItem>
          </FloatingMenu>
        </InitialMenuWrapper>
      )}
    </>
  );
});

const StairsMenuDemo = memo(() => {
  const title = 'Stairs';
  const [open, setOpen] = useState(false);
  const [checkedUnique, setCheckedUnique] = useState(false);
  const [stairs, setStairs] = useState<number>();

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
      >
        <MenuSection
          title='Stairs hint'
          type='collapsible'
          titleVariant='pale'
          icon='hint'
          divider='content'
          defaultExpanded
        >
          <MenuItem center>
            <StairsLegendIcon />
          </MenuItem>
        </MenuSection>
        <MenuSection
          title='Stairs Type'
          type='collapsible'
          divider='content'
          defaultExpanded
        >
          <MenuItem divider>
            <IconPickerRow
              items={[
                { id: 0, icon: 'straightStairs', state: stairs === 0 ? 'active' : 'default', size: 'lg', label: 'Straight' },
                { id: 1, icon: 'LShapedStairs', state: stairs === 1 ? 'active' : 'default', size: 'lg', label: 'L-Shaped' },
                { icon: 'UShapedStairs', state: 'disabled', size: 'lg', label: 'U-Shaped' },
                { icon: 'spiralStairs', state: 'disabled', size: 'lg', label: 'Spiral' },
              ]}
              onClick={setStairs}
            />
          </MenuItem>
          <MenuItem paddingHorizontal>
            <TextField
              type='text'
              name='stairs-name'
              label='Name'
              size='lg'
              value='Straight stairs 1'
              onChange={noop}
            />
          </MenuItem>
          <MenuItem>
            <ScopeControlRow>
              <ScopeText>
                Changes apply to
                {' '}
                <InlineAction onClick={() => window.alert('hi')}>
                  <ScopeTextHighlighted>(5)</ScopeTextHighlighted>
                </InlineAction>
                {' '}
                items in the Project
              </ScopeText>

              <ScopeCheckbox
                checked={checkedUnique}
                text='Make Unique'
                onClick={() => setCheckedUnique(!checkedUnique)}
              />
            </ScopeControlRow>
          </MenuItem>
        </MenuSection>
        <MenuSection
          title='Settings'
          type='collapsible'
          defaultExpanded
        >
          <MenuItem divider>
            <ButtonOptionsRow
              label='Railings location'
              options={[
                { icon: 'railingsLeft', onClick: noop, state: 'active', selected: true },
                { icon: 'railingsRight', onClick: noop, state: 'default', selected: false },
              ]}
            />
          </MenuItem>
          <MenuItem divider>
            <ButtonOptionsRow
              label='Stringer location'
              options={[
                { icon: 'stringerLeft', onClick: noop, state: 'default', selected: true },
                { icon: 'stringerCenter', onClick: noop, state: 'active', selected: false },
                { icon: 'stringerRight', onClick: noop, state: 'active', selected: false },
              ]}
            />
          </MenuItem>
          <MenuItem divider>
            <InfoRow
              title='Area'
              value='10 m²'
            />
          </MenuItem>
          <MenuItem divider paddingHorizontal>
            <TextField
              label='Width'
              type='number'
              size='sm'
              value='1.8'
              onChange={noop}
              adornment='m'
            />
          </MenuItem>
          <MenuItem divider paddingHorizontal>
            <TextField
              label='Maximum rise'
              type='number'
              size='sm'
              value='2.9'
              onChange={noop}
              adornment='m'
            />
          </MenuItem>
          <MenuItem divider paddingHorizontal>
            <TextField
              label='Run'
              type='number'
              size='sm'
              value='0.3'
              onChange={noop}
              adornment='m'
            />
          </MenuItem>
          <MenuItem divider>
            <ButtonRow
              label='Railings'
              startIcon='railings'
              onClick={noop}
            />
          </MenuItem>
        </MenuSection>
        <MenuSection
          title='Color'
          type='collapsible'
          defaultExpanded
        >
          <MenuItem divider>
            <Material
              text='Color 1'
              image='https://placehold.co/80x28'
              onClick={noop}
            />
          </MenuItem>
          <MenuItem divider>
            <Material
              text='Color 2'
              image='https://placehold.co/80x28'
              onClick={noop}
            />
          </MenuItem>
          <MenuItem divider>
            <Material
              text='Railing color'
              image='https://placehold.co/80x28'
              onClick={noop}
            />
          </MenuItem>
        </MenuSection>
        <MenuSection
          title='Assembly'
          type='collapsible'
          defaultExpanded
        >
          <MenuItem divider paddingHorizontal>
            <TextField
              type='text'
              label='Stairs'
              size='lg'
              value='Tile'
              onChange={noop}
            />
          </MenuItem>
          <MenuItem divider paddingHorizontal>
            <TextField
              type='text'
              label='Stringer'
              size='lg'
              value='Concrete'
              onChange={noop}
            />
          </MenuItem>
          <MenuItem divider paddingHorizontal>
            <TextField
              type='text'
              label='Railings'
              size='lg'
              value='Wood'
              onChange={noop}
            />
          </MenuItem>
        </MenuSection>

        <MenuItem divider paddingHorizontal='row 3/4'>
          <MainButton
            icon='bin'
            text='Delete the item'
            padding='row 1/4'
            variant='text'
            width='fit-content'
            height='md'
            iconColors={{ default: theme.palette.primary.main }}
            textColors={{ default: theme.palette.primary.main }}
            onClick={() => {
              window.confirm('Are you sure?');
            }}
          />
        </MenuItem>
        <MenuItem spaceBetween paddingVertical='lg' paddingHorizontal>
          <MainButton
            text='Cancel'
            variant='text'
            width='lg'
            height='md'
            onClick={noop}
          />
          <MainButton
            text='Apply'
            width='lg'
            height='md'
            shadowless
            onClick={noop}
          />
        </MenuItem>

      </SlideUpMenu>
    </>
  );
});

const LevelsMenuDemo = memo(() => {
  const title = 'Levels';
  const [open, setOpen] = useState(false);

  const [levels, setLevels] = useState(
    [
      { title: 'Level 3: Second floor', subtitle: 'Floor 2: + 6.000' },
      { title: 'Level 2: First floor', subtitle: 'Floor 1: ± 3.000' },
      { title: 'Level 1: First Floor', subtitle: 'Custom: ± 0.000' },
    ].map(({ title, subtitle }, idx): LevelsProps['items'][number] => {
      const id = `level-${idx}`;

      return {
        id,
        title,
        subtitle,
        visible: idx % 2 === 1,
        transparent: false,
        onVisibilityChange: () => alert(`change visibility for ${id}`),
        onSettingsClick: () => alert(`open settings for ${id}`),
        onTransparencyClick: () => (
          setLevels(levels => (
            levels.map((lvl, i) => ({
              ...lvl,
              transparent: i === idx ? !lvl.transparent : lvl.transparent,
            }))
          ))
        ),
        highlighted: false,
        onClick: () => (
          setLevels(levels => (
            levels.map((lvl, i) => ({
              ...lvl,
              highlighted: i === idx ? !lvl.highlighted : false,
            }))
          ))
        ),
        onDuplicationClick: () => alert(`duplication for ${id}`),
      };
    }),
  );

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
        header={
          <MenuItem paddingHorizontal='row 3/4'>
            <MainButton
              icon='plusCircled'
              text='Add new level'
              variant='text'
              height='md'
              padding='row 1/4'
              iconColors={{ default: theme.palette.primary.main }}
              onClick={noop}
            />
          </MenuItem>
        }
      >
        <Levels items={levels} />
      </SlideUpMenu>
    </>
  );
});

const NewLevelMenuDemo = memo(() => {
  const title = 'New Level';
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState('0.24');
  const [value2, setValue2] = useState('My project 1');
  const [levelElevationMajor, setLevelElevationMajor] = useState('4');
  const [levelElevationMinor, setLevelElevationMinor] = useState('11');

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
      >
        <MenuItem divider paddingHorizontal>
          <TextField
            type='text'
            name='level-name'
            label='Level name'
            size='lg'
            value={value2}
            onChange={e => setValue2(e)}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementInputRow
            icon='levelElevationHint'
            label='Floor level elevation'
            firstInput={{
              name: 'floor-level-elevation-major',
              value: levelElevationMajor,
              onChange: setLevelElevationMajor,
              min: 0,
              adornment: '′',
            }}
            secondInput={{
              name: 'floor-level-elevation-minor',
              value: levelElevationMinor,
              onChange: setLevelElevationMinor,
              min: 0,
              adornment: '″',
            }}
          />
        </MenuItem>
        <MenuItem divider>
          <MeasurementInputRow
            icon='floorHeightHint'
            label='Floor height'
            firstInput={{
              name: 'floor-height',
              value,
              onChange: e => setValue(e),
              min: 1,
              max: 50,
              adornment: 'm',
            }}
          />
        </MenuItem>
        <MenuItem paddingHorizontal='row 3/4'>
          <MainButton
            icon='bin'
            text='Delete the level'
            padding='row 1/4'
            variant='text'
            width='fit-content'
            height='md'
            iconColors={{ default: theme.palette.primary.main }}
            textColors={{ default: theme.palette.primary.main }}
            onClick={() => {
              window.confirm('Are you sure?');
            }}
          />
        </MenuItem>
        <MenuItem spaceBetween paddingVertical='lg' paddingHorizontal>
          <MainButton
            text='Cancel'
            variant='text'
            width='lg'
            height='md'
            onClick={noop}
          />
          <MainButton
            text='Create a level'
            width='lg'
            height='md'
            shadowless
            onClick={noop}
          />
        </MenuItem>
      </SlideUpMenu>
    </>
  );
});

const UploadModelMenuDemo = memo(() => {
  const title = 'Upload Model';
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
        noDivider
        headerSpacing={{ top: 'sm', bottom: 'sm' }}
        header={
          <Tabs
            chosenTab={2}
            onClick={noop}
            stretch
          >
            <Tab label='List' />
            <Tab label='Libraries' />
            <Tab label='Import' />
          </Tabs>
        }
      >
        <MenuItem paddingVertical='md'>
          <SelectedUploadItem
            name='Model 345_4'
            sizeBytes={35869024}
            extension='.glb'
          />
        </MenuItem>
        <MenuItem divider paddingHorizontal>
          <TextField
            type='text'
            name='catalog-upload-model-name'
            label='Name'
            size='lg'
            value='Door 76'
            onChange={noop}
          />
        </MenuItem>
        <MenuItem divider>
          <TextOptionRow
            label='Category'
            value='Doors'
            onClick={noop}
          />
        </MenuItem>
        <MenuItem>
          <TextOptionRow
            label='Libraries'
            value='None'
            onClick={noop}
            disabled
          />
        </MenuItem>
        <MenuItem spaceBetween paddingVertical='lg' paddingHorizontal>
          <MainButton
            text='Cancel'
            variant='text'
            width='lg'
            height='md'
            onClick={noop}
          />
          <MainButton
            text='Import'
            width='lg'
            height='md'
            shadowless
            onClick={noop}
          />
        </MenuItem>
      </SlideUpMenu>
    </>
  );
});

const VisibilityMenuDemo = memo(() => {
  const title = 'Visibility';
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
      >
        <VisibilityMenuContent items={visibilityMenuItems} />
      </SlideUpMenu>
    </>
  );
});

const SliderRowWrap = memo(({
  label,
  max,
  min,
  step,
  initialValue,
  color,
}: SafeOmit<SliderRowProps, 'value' | 'onChange'> & { initialValue: number }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SliderRow
      label={label}
      value={value}
      onChange={setValue}
      min={min}
      max={max}
      step={step}
      color={color}
    />
  );
});

const LocationButtonRowWrap = memo(() => {
  const [value, setValue] = useState<'background' | 'foreground'>('background');

  return (
    <LocationButtonRow
      label={`Location: ${capitalize(value)}`}
      value={value}
      onChange={setValue}
    />
  );
});

const Asset2dMenuDemo = memo(() => {
  const title = '2D Asset';
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
      >
        <MenuItem paddingHorizontal>
          <TextField
            type='text'
            name='2d-asset-name'
            label='Name'
            size='lg'
            value='Underlay Plan IMG'
            onChange={noop}
          />
        </MenuItem>
        <MenuSection type='collapsible' defaultExpanded title='Settings' divider='content'>
          <MenuItem paddingHorizontal paddingVertical='md'>
            <SliderRowWrap
              label='Transparency'
              initialValue={0.4}
              min={0}
              max={1}
              step={0.001}
            />
          </MenuItem>
          <MenuItem paddingHorizontal paddingVertical='md'>
            <LocationButtonRowWrap />
          </MenuItem>
        </MenuSection>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '8px 0',
        }}
        >
          <MenuItem paddingHorizontal>
            <MainButton
              text='Create 3D'
              width='md'
              height='md'
              onClick={noop}
            />
          </MenuItem>
          <MenuItem paddingHorizontal>
            <SliderRowWrap
              initialValue={0.988}
              label='AI Interpretation Precision Control'
              min={0}
              max={1}
              step={0.001}
            />
          </MenuItem>
        </div>
      </SlideUpMenu>
    </>
  );
});

const ColorOverlayMenuDemo = memo(() => {
  const title = 'Color overlay';
  const [open, setOpen] = useState(false);
  const [shouldCompare, setShouldCompare] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [chosenMaterial, setChosenMaterial] = useState<number>();
  const [chosenTexture, setChosenTexture] = useState<number>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [applyToValue, setApplyToValue] = useState(0);

  const tabs: Array<{ label: string; badge?: string }> = [
    { label: 'Walls', badge: '125' },
    { label: 'Recent', badge: '3' },
    { label: 'Favorites' },
    { label: 'Brands', badge: '37' },
    { label: 'Hidden' },
  ];

  const constraints = {
    min: 0,
    max: 255,
    step: 1,
  } as const;

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
        noDivider
      >
        <MenuItem paddingHorizontal minHeight='unset' gap={10}>
          <SearchInput
            placeholder='Search'
            value=''
            setValue={noop}
          />
          <MenuItem minHeight='unset' gap={4}>
            <AppearanceIconButton
              icon='download'
              onClick={noop}
            />
            <AppearanceIconButton
              icon='stars'
              state='disabled'
              onClick={noop}
            />
          </MenuItem>
        </MenuItem>
        <AppearanceContainer>
          <MenuItem paddingHorizontal minHeight='unset'>
            <AppearanceTabs>
              {tabs.map(({ label, badge }, i) => (
                <AppearanceTab
                  key={label}
                  label={label}
                  badgeLabel={badge}
                  state={activeTab === i ? 'active' : 'default'}
                  onClick={() => setActiveTab(i)}
                />
              ))}
            </AppearanceTabs>
          </MenuItem>
        </AppearanceContainer>
        <AppearanceContainer>
          <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
            <AppearanceSectionTitle>Collections</AppearanceSectionTitle>
          </MenuItem>
        </AppearanceContainer>
        <MenuItem>
          <MaterialCategoryPicker
            options={
              Array.from({ length: 10 }, () => null).map((_, idx) => ({
                id: idx,
                name: String(idx + 1),
                image: makeSolidColorImageUri(generateHSLColor(idx)),
              }))
            }
            chosenOption={chosenMaterial}
            onClick={setChosenMaterial}
          />
        </MenuItem>
        <AppearanceContainer>
          <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
            <AppearanceSectionTitle>Textures</AppearanceSectionTitle>
          </MenuItem>
        </AppearanceContainer>
        <MenuItem>
          <MaterialCategoryPicker
            options={
              Array.from({ length: 10 }, () => null).map((_, idx) => ({
                id: idx,
                name: String(idx + 1),
                image: makeSolidColorImageUri(generateHSLColor(idx + 10)),
              }))
            }
            chosenOption={chosenTexture}
            onClick={setChosenTexture}
            // wrap
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md'>
          <SliderRowWrap
            label='Red'
            initialValue={225}
            color={colorPickerRed}
            {...constraints}
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md'>
          <SliderRowWrap
            label='Green'
            initialValue={227}
            color={colorPickerGreen}
            {...constraints}
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md'>
          <SliderRowWrap
            label='Blue'
            initialValue={141}
            color={colorPickerBlue}
            {...constraints}
          />
        </MenuItem>
        <MenuItem paddingHorizontal paddingVertical='md'>
          <SliderRowWrap
            label='Transparency'
            initialValue={0.4}
            min={0}
            max={1}
            step={0.001}
          />
        </MenuItem>
        <AppearanceContainer>
          <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
            <AppearanceSectionTitle>Preview</AppearanceSectionTitle>
            <Checkbox
              checked={shouldCompare}
              onClick={() => setShouldCompare(s => s === false)}
              text='Compare to Original'
            />
          </MenuItem>
        </AppearanceContainer>
        {
          shouldCompare === true ? (
            <MenuItem paddingHorizontal spaceBetween>
              <ImageCompareSlider
                imgOne={<ReactCompareSliderImage src={makeSolidColorImageUri('#ed8282')} />}
                imgTwo={<ReactCompareSliderImage src={makeSolidColorImageUri('#81c14b')} />}
              />

              <AppearanceInputsContainer>
                <MenuItem divider>
                  <TextField
                    type='number'
                    size='sm'
                    label={<BidirectionalHorizontalArrowIcon />}
                    value='0.5'
                    onChange={noop}
                    adornment='m'
                  />
                </MenuItem>
                <MenuItem divider>
                  <TextField
                    type='number'
                    size='sm'
                    label={<BidirectionalVerticalArrowIcon />}
                    value='0.5'
                    onChange={noop}
                    adornment='m'
                  />
                </MenuItem>
                <MenuItem divider>
                  <TextField
                    type='number'
                    size='sm'
                    label={<ArrowClockwiseIcon />}
                    value='45'
                    onChange={noop}
                    adornment='°'
                  />
                </MenuItem>
              </AppearanceInputsContainer>
            </MenuItem>
          ) : (
            <MenuItem paddingHorizontal center>
              <PreviewImage src={makeSolidColorImageUri('#81c14b')} />
            </MenuItem>
          )
        }
        <AppearanceContainer>
          <MenuItem paddingHorizontal spaceBetween gap={10}>
            <TextField
              type='text'
              label='Name'
              size='lg'
              value='Monolith #868686'
              onChange={noop}
            />
            <IconButton
              icon={isFavourite === true ? 'favouriteFilled' : 'circleAroundDot'}
              size='sm-mobile'
              variant='text'
              state='active'
              onClick={() => setIsFavourite(negate)}
            />
          </MenuItem>
        </AppearanceContainer>

        <AppearanceContainer>
          <MenuItem paddingLeft='row 3/4' paddingRight spaceBetween minHeight='unset'>
            <Checkbox
              checked={false}
              onClick={noop}
              text='Apply to all'
            />
            <Select
              value={applyToValue}
              onChange={setApplyToValue}
              options={[
                'Exterior walls',
                'Interior walls',
              ].map((e, i) => ({ label: e, value: i }))}
            />
          </MenuItem>
        </AppearanceContainer>
      </SlideUpMenu>
    </>
  );
});

const ReplaceElementMenuDemo = memo(() => {
  const title = 'Replace element';
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
      >
        <MenuItem paddingHorizontal>
          <ReplaceElementInfoRow
            img={makeSolidColorImageUri('brown')}
            text='Default Vanity'
            highlightedText='2 selected'
          />
        </MenuItem>
        <MenuItem paddingHorizontal>
          <Checkbox
            checked={false}
            onClick={noop}
            text='Select all similar items'
          />
        </MenuItem>
        <MenuItem paddingHorizontal>
          <SearchInput
            placeholder='Search'
            value=''
            setValue={noop}
          />
        </MenuItem>
      </SlideUpMenu>
    </>
  );
});

const AIToolsMenuDemo = memo(() => {
  const title = 'AI Tools';
  const [open, setOpen] = useState(false);

  const [exteriorPrompt, setExteriorPrompt] = useState('');
  const [interiorPrompt, setInteriorPrompt] = useState('');

  const exteriorTab = 'Exterior';
  const interiorTab = 'Interior';
  const asset2DTab = '2D asset';
  const tabs = [
    { text: exteriorTab },
    { text: interiorTab },
    { text: asset2DTab },
  ];
  const [chosenTab, setChosenTab] = useState(0);
  const activeTab = tabs[chosenTab];

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
        noDivider
      >
        <Tabs
          chosenTab={chosenTab}
          onClick={setChosenTab}
          stretch
        >
          {tabs.map(e => (
            <Tab key={e.text} label={e.text} />
          ))}
        </Tabs>
        {activeTab?.text === interiorTab && (
          <>
            <div style={{ margin: '8px 0' }} />
            <MenuItem paddingHorizontal>
              <MainButton
                text='Select Room'
                width='fill'
                height='md'
                onClick={noop}
              />
            </MenuItem>
          </>
        )}
        {(activeTab?.text === exteriorTab || activeTab?.text === interiorTab) && (
          <>
            <MenuSection
              type='static'
              title='Generate from Prompt'
              titleVariant='pale'
            >
              <MenuItem paddingHorizontal>
                <PromptTextArea
                  value={activeTab.text === exteriorTab ? exteriorPrompt : interiorPrompt}
                  onChange={activeTab.text === exteriorTab ? setExteriorPrompt : setInteriorPrompt}
                />
              </MenuItem>
            </MenuSection>
            <div style={{ margin: '8px 0' }} />
            <MenuItem paddingHorizontal spaceBetween>
              <MainButton
                text='Preview'
                width='lg'
                height='md'
                shadowless
                onClick={noop}
              />
              <MainButton
                text='Remake'
                width='lg'
                height='md'
                shadowless
                onClick={noop}
              />
            </MenuItem>

            <MenuSection
              type='static'
              title='Preview:'
              titleVariant='pale'
            >
              <MenuItem paddingHorizontal>
                <img
                  style={{ objectFit: 'contain', width: '100%' }}
                  src='https://placehold.co/10'
                  alt='prompt result preview'
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
                    text='&nbsp;<&nbsp;'
                    variant='contained'
                    width='fit-content'
                    height='md'
                    onClick={noop}
                  />
                  <MainButton
                    text='&nbsp;>&nbsp;'
                    variant='contained'
                    width='fit-content'
                    height='md'
                    onClick={noop}
                  />
                </div>
                <MainButton
                  text='Create 3D'
                  variant='contained'
                  width='lg'
                  height='md'
                  onClick={noop}
                />
              </MenuItem>
            </MenuSection>
          </>
        )}
        {activeTab?.text === asset2DTab && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '8px 0',
          }}
          >
            <MenuItem paddingHorizontal>
              <MainButton
                text='Select 2D asset'
                width='fill'
                height='md'
                onClick={noop}
              />
            </MenuItem>
            <MenuItem paddingHorizontal>
              <MainButton
                text='Create 3D'
                width='md'
                height='md'
                onClick={noop}
              />
            </MenuItem>
            <MenuItem paddingHorizontal>
              <SliderRowWrap
                initialValue={0.988}
                label='AI Interpretation Precision Control'
                min={0}
                max={1}
                step={0.001}
              />
            </MenuItem>
          </div>
        )}
      </SlideUpMenu>
    </>
  );
});

const ImageAssetsPopup = memo(({ onClick: _onClick }: { onClick: () => void }) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(false);
    _onClick();
  };

  return (
    <AnchoredMenu
      TriggerComp={
        <IconButton
          icon='landscape'
          state={open === true ? 'active' : 'default'}
          onClick={() => setOpen(negate)}
        />
      }
      open={open}
      onClose={() => setOpen(false)}
    >
      <DropdownItem
        image='https://placehold.co/24'
        label='Trace 2D Floorplan'
        onClick={onClick}
      />
      <Divider fullWidth />
      <DropdownItem
        image='https://placehold.co/24'
        label='2D Scene'
        onClick={onClick}
      />
      <Divider fullWidth />
      <DropdownItem
        image='https://placehold.co/24'
        label='Sticker'
        onClick={onClick}
      />
      <Divider fullWidth />
      <DropdownItem
        image='https://placehold.co/24'
        label='Texture'
        onClick={onClick}
      />
      <Divider fullWidth />
      <DropdownItem
        icon='myAssets'
        label='My 2D Assets'
        onClick={onClick}
      />
    </AnchoredMenu>
  );
});

const UploadImageAssetsMenu = memo(({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [chosenMaterial, setChosenMaterial] = useState<number>();
  const addNewOptionId = -1;

  return (
    <SlideUpMenu
      opened={open}
      title='Trace 2D Floorplan'
      onClose={onClose}
      noDivider
    >
      <Upload2DAssetsMenuContent
        description='Similar to tracing paper, floorplans will be placed flat on the canvas with a 0° tilt. Draw over existing walls, doors, etc. Quickly create 3D models from 2D floorplans.'
        title='Select or add a floorplan to trace'
      >
        <MaterialPicker
          shape='round'
          options={
            [
              {
                id: addNewOptionId,
                name: 'Add New',
                image: encodeSvgAsDataUri(getPlusCircledSvgString(theme.palette.primary.main)),
                noBorder: true,
                textColor: theme.palette.primary.main,
              },
              ...(
                [
                  '# F2F2F2',
                  '# C5B2AE',
                  '# A8B0A5',
                  '# F8B0A5',
                  '# E8B0A5',
                  '# B8B0A5 Lorem ipsum',
                  '# A8C0A5',
                ].map((name, i) => ({
                  id: i,
                  name,
                  image: 'https://placehold.co/82',
                }))
              ),
            ]
          }
          chosenOption={chosenMaterial}
          onClick={idx => setChosenMaterial(idx)}
        />
      </Upload2DAssetsMenuContent>
    </SlideUpMenu>
  );
});

const MainOverlayDemo = memo(({ closeMainOverlay }: { closeMainOverlay: () => void }) => {
  const [isActive, setIsActive] = useState(false);
  type FloatingMenuContent = 'settings' | 'none' | 'visibility' | '3d-catalog';
  const [showFloatingMenu, setShowFloatingMenu] = useState<FloatingMenuContent>('none');
  const [tabIndex, setTabIndex] = useState(0);
  const [showDrawToolbar, setShowDrawToolbar] = useState(true);
  const [showBottom, setShowBottom] = useState<null | 'priority' | 'infopanel'>(null);
  const [showFeatureMap, setShowFeatureMap] = useState(false);
  const [isTouchScreen, setIsTouchScreen] = useState(false);
  const [showImageAssetsMenu, setShowImageAssetsMenu] = useState(false);

  const stateProps = {
    state: isActive ? 'active' : 'default',
    onClick: () => setIsActive(!isActive),
  } as const;

  const floatingMenuContent = {
    none: null,
    settings: {
      title: 'Settings',
      comp: <MiscMenuContent />,
    },
    visibility: {
      title: 'Hide/Show',
      comp: <VisibilityMenuContent items={visibilityMenuItems} />,
    },
    '3d-catalog': {
      title: 'Catalog',
      comp: <CatalogMenuContentDemo />,
    },
  } satisfies Record<typeof showFloatingMenu, { title: string; comp: unknown } | null>;

  return (
    <Base>
      {showFeatureMap === true && (
        <FeatureMapOverlay
          isTouchScreen={isTouchScreen}
          viewModesText='Draw walls and rooms in 2D, view and design building in 3D'
          wallModesText='Switch between draw and select modes'
          drawToolsText='Draw using paths, Single lines, Poly lines, and other tools'
          autoGenerationToolsText='Use or turn off auto generation options - wall, floor, roof, ceiling etc.'
          featureTipButtonText='View tips, tutorials, and more'
        />
      )}
      <UploadImageAssetsMenu
        open={showImageAssetsMenu}
        onClose={() => setShowImageAssetsMenu(false)}
      />
      <MainScreenOverlay
        topLeft={
          <>
            <TopToolbarDefault closeMainOverlay={closeMainOverlay} />
            <CompassIcon />
          </>
        }
        topCenter={
          <AnnotatedTabs
            chosenTab={tabIndex}
            onClick={index => setTabIndex(index)}
            levelName='Level 2: Second floor'
          >
            <Tab label='2D' />
            <Tab label='3D' />
            {isTouchScreen === false && (
              <Tab label={<PersonWalkingIcon color={theme.palette.text.secondary} />} />
            )}
          </AnnotatedTabs>
        }
        topRight={
          <>
            <Box row justify='flex-end' gap={10}>
              <IconButton
                icon='share'
                state='default'
                onClick={noop}
              />
              <IconButton
                icon='gear'
                state={showFloatingMenu === 'settings' ? 'active' : 'default'}
                onClick={() => setShowFloatingMenu(e => e !== 'none' ? 'none' : 'settings')}
              />
            </Box>
            <Box row justify='flex-end' gap={mainScreenOverlayTopRightMenuGap}>
              {showDrawToolbar === true && (
                <PopUpToolbar
                  mode='static'
                  orientation='vertical'
                  items={
                    <>
                      <ToolbarButton
                        icon='straightLine'
                        onClick={noop}
                      />
                      {isTouchScreen === true ? null : (
                        <ToolbarButton
                          icon='multipleStraightLines'
                          onClick={noop}
                        />
                      )}
                      <ToolbarButton
                        icon='rectangle'
                        onClick={noop}
                      />
                      <ToolbarButton
                        icon='hexagon'
                        onClick={noop}
                      />
                      <ToolbarButton
                        icon='curvedLine'
                        onClick={noop}
                      />
                      <ToolbarButton
                        icon='brokenCurvedLine'
                        onClick={noop}
                      />
                    </>
                  }
                  expandableItems={
                    <>
                      <ToolbarButton
                        icon='wall'
                        onClick={noop}
                      />
                      <ToolbarButton
                        icon='floor'
                        onClick={noop}
                      />
                      <ToolbarButton
                        icon='roofOnly'
                        onClick={noop}
                      />
                      <ToolbarButton
                        icon='ceiling'
                        onClick={noop}
                      />
                    </>
                  }
                />
              )}
              {showFloatingMenu !== 'none' && (
                <FloatingMenuContainer>
                  <FloatingMenu
                    title={floatingMenuContent[showFloatingMenu].title}
                    onClose={() => setShowFloatingMenu('none')}
                  >
                    {floatingMenuContent[showFloatingMenu].comp}
                  </FloatingMenu>
                </FloatingMenuContainer>
              )}

              <IconMenuContainer>
                <IconButton
                  icon='layout'
                  state={showDrawToolbar === true ? 'active' : 'default'}
                  onClick={() => setShowDrawToolbar(negate)}
                />
                <IconButton
                  icon='pointer'
                  state={showFeatureMap === true ? 'active' : 'default'}
                  onClick={() => setShowFeatureMap(negate)}
                />
                <IconButton
                  icon='layers'
                  state={isTouchScreen === true ? 'active' : 'default'}
                  onClick={() => setIsTouchScreen(negate)}
                />
                <IconButton
                  icon='eye'
                  state={showFloatingMenu === 'visibility' ? 'active' : 'default'}
                  onClick={() => setShowFloatingMenu(s => s === 'visibility' ? 'none' : 'visibility')}
                />
                <ImageAssetsPopup
                  onClick={() => setShowImageAssetsMenu(true)}
                />
                <IconButton
                  icon='stars'
                  variant='default'
                  state='active'
                  onClick={noop}
                />
                <IconButton
                  icon='plus'
                  variant='outlined'
                  state={showFloatingMenu === '3d-catalog' ? 'active' : 'default'}
                  onClick={() => setShowFloatingMenu(s => s === '3d-catalog' ? 'none' : '3d-catalog')}
                />
              </IconMenuContainer>
            </Box>
          </>
        }
        bottomLeft={
          <>
            <IconButton
              icon='undo'
              {...stateProps}
            />
            <IconButton
              icon='redo'
              {...stateProps}
            />
          </>
        }
        bottomCenter={
          <IconButton
            icon='circleAroundDot'
            onClick={() => setShowBottom('priority')}
          />
        }
        bottomRight={
          <AnchorTo
            xDirection='left'
            yDirection='top'
            yOffset='calc(100% + 10px)'
            anchored={
              showBottom !== 'infopanel'
                ? null
                : (
                  <InfoPanel
                    title='Draw Mode: Line Drawing'
                    description='Draw lines to complete a room/space. Switch to 3D view to see the space in 3D.'
                    onClose={() => setShowBottom(null)}
                    onPrevious={noop}
                    onNext={noop}
                    onStartQuickTour={() => window.alert('open tutorials')}
                    onOpenTutorials={() => window.alert('start quick tour')}
                  />
                )
            }
          >
            <IconButton
              icon='hint'
              variant='text'
              // variant='default'
              // state='active'
              // pulseGlow={1}
              // borderRadius='circle'
              iconColors={{
                default: theme.palette.primary.main,
              }}
              onClick={() => setShowBottom(e => e === 'infopanel' ? null : 'infopanel')}
            />
          </AnchorTo>
        }
        bottomCenterPriority={
          showBottom !== 'priority'
            ? null
            : (
              <MenuItem paddingLeft>
                <RowBackdrop>
                  <MeasurementInputRow
                    label='Length:'
                    firstInput={{
                      variant: 'light',
                      name: '2d-asset-length-primary-unit',
                      value: '0',
                      onChange: noop,
                      min: 0,
                      adornment: '′',
                    }}
                    secondInput={{
                      variant: 'light',
                      name: '2d-asset-length-sub-unit',
                      value: '0',
                      onChange: noop,
                      min: 0,
                      adornment: '″',
                    }}
                  />
                  <SecondaryButton
                    text='Apply'
                    onClick={() => alert('apply')}
                  />
                </RowBackdrop>
                <IconButton
                  icon='close'
                  size='md-mobile'
                  variant='text'
                  onClick={() => setShowBottom(null)}
                />
              </MenuItem>
            )
        }
      />
    </Base>
  );
});

const TemplateScreenDemo = memo(({ closeTemplateScreen }: { closeTemplateScreen: () => void }) => (
  <Base>
    <TemplateScreen
      title='Choose a Template'
      tabs={[
        {
          title: 'Room',
          state: 'active',
          onClick: noop,
          items: [
            {
              title: 'Create New',
              image: 'blank',
              onClick: noop,
            },
            {
              title: 'Rectangular',
              image: 'rectangular',
              onClick: noop,
            },
            {
              title: 'T-shape',
              image: 'TShape',
              onClick: noop,
            },
            {
              title: 'L-shape',
              image: 'LShape',
              onClick: noop,
            },
            {
              title: 'Custom',
              image: 'https://placehold.co/100',
              onClick: noop,
            },
          ],
        },
        {
          title: 'House',
          state: 'disabled',
          onClick: noop,
          items: [],
        },
        {
          title: 'Close',
          state: 'default',
          onClick: closeTemplateScreen,
          items: [],
        },
      ]}
    />
  </Base>
));

const PagesDemo = memo(({ closePages }: { closePages: () => void }) => {
  const [pageContent, setPageContent] = useState<PageContent>('Projects');
  const [editProjectNameId, setEditProjectNameId] = useState<string>();
  const [projectName, setProjectName] = useState('My Home');
  const [openSnackbarWithSuccess, setOpenSnackbarWithSuccess] = useState(false);

  const user = {
    name: 'John Smith',
    email: 'johnsmith@gmail.com',
    avatar: null,
    passwordLess: false,
  };

  type MenuOptions = {
    accountOptions: SideMenuProps['accountOptions'];
    categoryOptions: SideMenuProps['categoryOptions'];
  };
  const menuOptions: MenuOptions = {
    accountOptions: (
      user === null ? [
        { title: 'Sign Up', icon: 'person', onClick: () => alert('sign up') },
      ] : [
        {
          title: 'Account',
          icon: 'person',
          onClick: () => setPageContent('Account'),
          state: pageContent === 'Account' ? 'active' : 'default',
        },
        { title: 'Log Out', icon: 'logout', onClick: closePages },
      ]
    ),
    categoryOptions: [
      {
        title: 'My Projects',
        icon: 'projects',
        onClick: () => setPageContent('Projects'),
        state: pageContent === 'Projects' ? 'active' : 'default',
      },
      {
        title: 'My Team',
        icon: 'team',
        onClick: () => setPageContent('Team'),
        state: pageContent === 'Team' ? 'active' : 'default',
      },
      {
        title: 'Billing',
        icon: 'coin',
        onClick: () => setPageContent('Billing'),
        state: pageContent === 'Billing' ? 'active' : 'default',
      },
      {
        title: 'Support',
        icon: 'questionMark',
        onClick: () => setPageContent('Support'),
        state: pageContent === 'Support' ? 'active' : 'default',
      },
    ],
  };

  const titles: Record<PageContent, string> = {
    Projects: 'My Projects',
    Team: 'My Team',
    Billing: 'Billing',
    Support: 'Support',
    Account: 'Account',
  };

  const subTitles: Record<PageContent, null | string> = {
    Projects: null,
    Team: null,
    Billing: 'Manage your billing and payment details.',
    Support: null,
    Account: null,
  };

  const logInSuggestionProps = {
    logInSuggestionText: 'Sign In to Unlock More Features',
    logInButtonText: 'Log in',
    onLoginButtonClick: () => alert('login'),
  };

  const ComingSoonPageContentJSX = <ComingSoonPageContent />;

  const contents = {
    Projects: (
      <ProjectsPageContent
        isGuestUser={user === null}
        templateSectionTitle='Start With a Template'
        templateSectionOptions={[
          {
            title: 'Create New',
            image: 'blank',
            onClick: noop,
          },
          {
            title: 'Rectangular',
            image: 'rectangular',
            onClick: noop,
          },
          {
            title: 'L-shape',
            image: 'LShape',
            onClick: noop,
          },
          {
            title: 'T-shape',
            image: 'TShape',
            onClick: noop,
          },
          {
            title: 'Custom',
            image: 'https://placehold.co/100',
            onClick: noop,
          },
        ]}
        emptyProjectsSuggestionText='Create Your First Project'
        {...logInSuggestionProps}
        projectsSectionTitle='Recent Projects'
        projects={(
          Array.from({ length: 5 }, (_, idx) => ({
            name: projectName,
            href: `/${idx}`,
            image: `/project-review-image-${idx % 2 === 0 ? 1 : 2}.png`,
            nameEditMode: String(idx) === editProjectNameId,
            onNameEditModeExit: ({ action, value }) => {
              if(action === 'save') {
                setProjectName(value);
              }
              setEditProjectNameId(undefined);
            },
            options: [
              { title: 'Edit Name', icon: 'pencil', onClick: () => setEditProjectNameId(String(idx)) },
              { title: 'Delete', icon: 'bin', onClick: () => alert(`delete #${idx}`) },
            ],
          }))
        )}
      />
    ),
    Team: ComingSoonPageContentJSX,
    Billing: (
      <BillingContent>
        <BillingSection>
          <BillingSectionTitle>Subscription Overview</BillingSectionTitle>
          <BillingIsles>
            <BillingIsle>
              <BillingIsleTitle>Current Plan</BillingIsleTitle>
              <BillingDividerBlock />
            </BillingIsle>
            <BillingIsle>
              <BillingIsleTitle>Usage Summary</BillingIsleTitle>
              <BillingDividerBlock />
              <BillingUsageSummaries>
                <BillingUsageSummary
                  used='4.27 GB'
                  total='/8.0 GB'
                  percentage={78}
                  label='Storage usage'
                />
                <BillingUsageSummary
                  used='5 credits'
                  total='/12 credits'
                  percentage={40}
                  label='AI Capabilities'
                />
              </BillingUsageSummaries>
            </BillingIsle>
          </BillingIsles>
        </BillingSection>
        <BillingSection>
          <BillingSectionTitle>Billing History</BillingSectionTitle>
          <BillingIsle>...</BillingIsle>
        </BillingSection>
        <BillingSection>
          <BillingSectionTitle>Payment Info</BillingSectionTitle>
          <BillingIsles>
            <BillingIsle>
              <Box column gap={6}>
                <BillingWithBadgeContainer>
                  <BillingIsleTitle>Payment Method</BillingIsleTitle>
                  <BillingBadge>Primary</BillingBadge>
                </BillingWithBadgeContainer>
                <BillingIsleSubTitle>Change how you pay for your plan</BillingIsleSubTitle>
              </Box>
              <BillingDividerBlock />
              <BillingPaymentMethod
                last4='4224'
                brand='mastercard2'
                expiry='Expiry 08/2027'
                Button={
                  <FormButton
                    type='button'
                    size='small'
                    text='Change'
                    onClick={() => {}}
                  />
                }
                address={{
                  line1: '12 Maple Crescent',
                  line2: '7 apt',
                  city: 'Bristol',
                  postalCode: 'BS3 4HT',
                  country: 'UK',
                }}
              />
            </BillingIsle>
          </BillingIsles>
        </BillingSection>
      </BillingContent>
    ),
    Support: (
      <>
        <Snackbar
          type='success'
          text='Thank you for your message. It has been sent.'
          open={openSnackbarWithSuccess}
          handleClose={() => setOpenSnackbarWithSuccess(false)}
        />

        <SupportPageContent
          isGuestUser={user === null}
          mainSectionTitle='How can we help you?'
          subjectFieldLabel='Subject'
          requestFieldLabel='How can we help you?'
          requiredErrorText='The field is required.'
          submitButtonText='Send'
          onSubmit={(data, resetForm) => {
            console.info('support form data', data);
            setOpenSnackbarWithSuccess(true);
            resetForm();
          }}
          {...logInSuggestionProps}
        />
      </>
    ),
    Account: (
      <AccountPageContent
        user={user}
        templateSectionTitle='Account Settings'
        mainFormTexts={{
          fields: { fullName: 'Full name', email: 'Email' },
          buttons: {
            changeName: 'Change Name',
            changeEmail: 'Change Email',
            changePassword: 'Change Password',
          },
        }}
        logoutTexts={{
          bottomLink: 'Log out',
          dialog: {
            title: 'Do you want to log out?',
            buttons: {
              confirm: 'Confirm',
              cancel: 'Cancel',
            },
          },
        }}
        deleteAccountTexts={{
          bottomLink: 'Delete account',
          dialog: {
            title: 'Do you want to delete your account?',
            description: 'This action can not be reversed.',
            description2: 'Enter password to confirm.',
            passwordField: 'Password',
            buttons: {
              confirm: 'Confirm',
              cancel: 'Cancel',
              confirmSuccess: 'Confirm',
            },
            deleteSuccessMessage: 'Account was successfully deleted',
            deleteErrorMessage: 'Error in deleting account',
          },
        }}
        changeNameDialogTexts={{
          title: 'Change Name',
          formTexts: {
            formFields: { name: { text: 'New Name' } },
            buttons: {
              confirm: { text: 'Confirm' },
              cancel: { text: 'Cancel' },
            },
          },
        }}
        changeEmailDialogTexts={{
          title: 'Change Email',
          description: 'You will receive a confirmation code on your new email',
          formTexts: {
            formFields: {
              newEmailAddress: { text: 'New Email address' },
              password: { text: 'Password' },
            },
            buttons: {
              confirm: { text: 'Confirm' },
              cancel: { text: 'Cancel' },
            },
          },
        }}
        changePasswordDialogTexts={{
          title: 'Change Password',
          formTexts: {
            formFields: {
              oldPassword: { text: 'Old Password' },
              newPassword: { text: 'New Password' },
              newPasswordRepeat: { text: 'Repeat New Password' },
            },
            buttons: {
              confirm: { text: 'Confirm' },
              cancel: { text: 'Cancel' },
            },
          },
        }}
        commonErrorTexts={commonErrorTexts}
        handlers={{
          logout: closePages,
          changeNameSubmit: data => {
            if(data.name !== 'q') {
              return Promise.resolve({
                ok: false,
                errors: { name: 'type "q" in this field to fix error' },
              });
            }

            return Promise.resolve({ ok: true });
          },
          changeEmailSubmit: data => {
            if(data.password !== 'q') {
              return Promise.resolve({
                ok: false,
                errors: { password: 'type "q" in this field to fix error' },
              });
            }

            return Promise.resolve({ ok: true });
          },
          deleteAccountSubmit: data => {
            if(data.password !== 'q') {
              return Promise.resolve({
                ok: false,
                errors: { password: 'type "q" in this field to fix error' },
              });
            }

            return Promise.resolve({ ok: true });
          },
          changePasswordSubmit: data => {
            if(data.oldPassword !== 'q') {
              return Promise.resolve({
                ok: false,
                errors: { oldPassword: 'type "q" in this field to fix error' },
              });
            }

            return Promise.resolve({ ok: true });
          },
          changeAvatar(file) {
            console.info(file);
          },
        }}
      />
    ),
  } satisfies Record<PageContent, unknown>;

  return (
    <Base>
      <PageWithMenu
        pageTitle={titles[pageContent]}
        pageSubTitle={subTitles[pageContent]}
        appName='DrawHome'
        appLogoLink='https://dev.drawhome.com'
        user={user}
        planBadgeText='Free Plan'
        guestProfileText='Guest Profile'
        menuOptions={menuOptions}
      >
        {contents[pageContent]}
      </PageWithMenu>
    </Base>
  );
});

const IconsPage = memo(({ close }: { close: () => void }) => (
  <Base>
    <IconsDemo close={close} />
  </Base>
));

const DialogDemo = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        text='dialog'
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title='Unlock with Premium!'
        icon='unlock'
      >
        <DialogDescription
          text='Get access to additional features for even more precise and convenient space modeling.'
        />
        <DialogActions
          primaryActionText='Unlock all'
          onPrimaryAction={() => window.alert('primary action')}
          secondaryActionText='Try later'
          onSecondaryAction={() => window.alert('secondary action')}
        />
      </Dialog>
    </>
  );
});

const ShareDemo = memo(() => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const formats = ['PNG', 'GLTF', 'GLB'] as const;
  const [format, setFormat] = useState<typeof formats[number]>('PNG');

  const tabs = [
    {
      title: 'Export the project',
      tab: 'Export',
      content: (
        <>
          <ExportTabFormatPicker
            title='Format'
            chosenFormat={format}
            formats={formats}
            onChange={setFormat}
          />
          <Divider />
          <DialogActions
            paddingHorizontal
            primaryActionText='Export'
            onPrimaryAction={() => {}}
            secondaryActionText='Cancel'
            onSecondaryAction={() => {}}
          />
        </>
      ),
    },
    {
      title: 'Share the project',
      tab: 'Share',
      content: (
        <PublicLink
          title='Public link'
          url='https://app.drawhome.com/?projectId=nJ97WmHQJF'
          buttonText='Copy link'
          copySuccessStatusText='Copied!'
        />
      ),
    },
  ];

  const tab = tabs[tabIndex];
  assert(!isUndefined(tab), 'Unreachable. |0q5hvl|');

  return (
    <>
      <MainButton
        icon='plus'
        text='export/share'
        onClick={() => setOpen(true)}
      />

      <PopUp
        open={open}
        onClose={() => setOpen(false)}
      >
        <ShareExportPopUpContentWrapper
          title={tab.title}
          onClose={() => setOpen(false)}
        >
          <Tabs
            chosenTab={tabIndex}
            onClick={setTabIndex}
            stretch
          >
            {tabs.map(e => (
              <Tab key={e.tab} label={e.tab} />
            ))}
          </Tabs>

          {tab.content}
        </ShareExportPopUpContentWrapper>
      </PopUp>
    </>
  );
});

const HubDialogDemo = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        text='hub dialog'
        onClick={() => setOpen(true)}
      />

      <HubDialog
        open={open}
        onClose={() => setOpen(false)}
        title='Do you want to delete this project?'
      >
        <HubDialogActions
          primaryActionText='Confirm'
          onPrimaryAction={() => window.alert('primary action')}
          secondaryActionText='Cancel'
          onSecondaryAction={() => window.alert('secondary action')}
        />
      </HubDialog>
    </>
  );
});

const SnackbarSuccessDemo = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text='Success message'
      />
      <Snackbar
        text='Password was successfully changed'
        open={open}
        handleClose={() => setOpen(false)}
        type='success'
      />
    </>
  );
});

const SnackbarWarningDemo = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text='Success message'
      />
      <Snackbar
        text='Password was successfully changed'
        open={open}
        handleClose={() => setOpen(false)}
        type='warning'
      />
    </>
  );
});

const SlideUpMenuSection = memo(() => (
  <>
    <h4>Slide-up menus ⬇</h4>
    <HorizontalSection>
      <MaterialsMenuDemo />
      <MiscMenuDemo />
      <InitMenuDemo />
      <StairsMenuDemo />
      <CatalogMenuDemo />
      <LevelsMenuDemo />
      <NewLevelMenuDemo />
      <UploadModelMenuDemo />
      <VisibilityMenuDemo />
      <Asset2dMenuDemo />
      <ColorOverlayMenuDemo />
      <ReplaceElementMenuDemo />
      <AIToolsMenuDemo />
      <PaywallMenuDemo />
      <PaywallFloatingMenuDemo />
    </HorizontalSection>
  </>
));

const PopupsSection = memo(() => (
  <>
    <h4>Popups ⬇</h4>
    <HorizontalSection>
      <DialogDemo />
      <HubDialogDemo />
      <ShareDemo />
      <SnackbarSuccessDemo />
      <SnackbarWarningDemo />
      <AllHotkeysMenuDemo />
    </HorizontalSection>
  </>
));

const ButtonsSection = memo(() => {
  const [active, setActive] = useState(false);

  const stateProps = {
    state: active === true ? 'active' : 'default',
    onClick: () => setActive(negate),
  } as const;

  return (
    <>
      <HorizontalSection>
        <MainButton
          icon='plus'
          onClick={stateProps.onClick}
        />
        <MainButton
          icon='plus'
          onClick={stateProps.onClick}
          state='disabled'
        />
        <MainButton
          icon='plus'
          onClick={stateProps.onClick}
          text='Render'
        />
        <MainButton
          icon='plus'
          onClick={stateProps.onClick}
          state='disabled'
          text='Render'
        />
      </HorizontalSection>

      <HorizontalSection>
        <MainButton
          text='Cancel'
          variant='text'
          width='lg'
          height='md'
          onClick={stateProps.onClick}
        />
        <MainButton
          text='Create'
          width='lg'
          height='md'
          shadowless
          onClick={stateProps.onClick}
        />
      </HorizontalSection>

      <HorizontalSection>
        <IconButton
          icon='undo'
          {...stateProps}
        />
        <IconButton
          icon='redo'
          {...stateProps}
          state='disabled'
        />
        <IconButton
          icon='close'
          size='sm'
          variant='text'
          onClick={stateProps.onClick}
        />
        <IconButton
          icon='gear'
          variant='text'
          {...stateProps}
        />
      </HorizontalSection>

      <HorizontalSection>
        <AppearanceIconButton
          icon='download'
          onClick={noop}
        />
        <AppearanceIconButton
          icon='stars'
          onClick={noop}
        />
      </HorizontalSection>

      <HorizontalSection>
        <TabButton text='Name' onClick={noop} />
        <TabButton state='active' text='Name' onClick={noop} />
        <TabButton state='disabled' text='Name' onClick={noop} />
      </HorizontalSection>

      <HorizontalSection>
        <SecondaryButton text='Done' onClick={noop} />
        <SecondaryButton state='disabled' text='Done' onClick={noop} />
      </HorizontalSection>

      <HorizontalSection>
        <Switch checked={active} onClick={stateProps.onClick} />
      </HorizontalSection>

      <HorizontalSection>
        <FieldButton icon='rotate' text='Rotate' onClick={noop} />
        <FieldButton icon='flipHorizontal' text='Flip horizontal' onClick={noop} />
      </HorizontalSection>

      <HorizontalSection>
        <ButtonLinkLike text='Account' icon='logout' onClick={noop} />
        <ButtonLinkLike text='Log out' icon='logout' onClick={noop} state='active' />
        <ButtonLinkLike text='Smaller log out' icon='logout' onClick={noop} state='active' version='smaller' />
        <ButtonLinkLike text='Delete' icon='delete' onClick={noop} state='active' version='smaller' />
      </HorizontalSection>

      <HorizontalSection>
        <FormButton text='Confirm' size='medium' variant='contained' onClick={() => {}} />
        <FormButton text='Send again' size='medium' onClick={() => {}} />
        <FormButton text='Disabled' size='small' disabled onClick={() => {}} />
      </HorizontalSection>
    </>
  );
});

const ImageCompareSliderDemo = memo(() => (
  <ImageCompareSlider
    imgOne={<ReactCompareSliderImage src='https://placehold.co/190' />}
    imgTwo={<ReactCompareSliderImage src='https://placehold.co/190/black/white' />}
  />
));

type PageContent = 'Projects' | 'Support' | 'Team' | 'Billing' | 'Account';

export const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [searchCatalogValue, setSearchCatalogValue] = useState('');
  const [showMainOverlay, setShowMainOverlay] = useState(false);
  const closeMainOverlay = useCallback(() => setShowMainOverlay(false), []);
  const [showPages, setShowPages] = useState(false);
  const [showIconsPage, setShowIconsPage] = useState(false);
  const closePages = useCallback(() => setShowPages(false), []);
  const [showTemplateScreen, setShowTemplateScreen] = useState(false);
  const closeTemplateScreen = useCallback(() => setShowTemplateScreen(false), []);

  const { isDnDSupported } = useCheckDnDSupport();

  // =====================================================

  if(showPages === true) {
    return <PagesDemo closePages={closePages} />;
  }

  if(showMainOverlay === true) {
    return <MainOverlayDemo closeMainOverlay={closeMainOverlay} />;
  }

  if(showTemplateScreen === true) {
    return <TemplateScreenDemo closeTemplateScreen={closeTemplateScreen} />;
  }

  if(showIconsPage === true) {
    return <IconsPage close={() => setShowIconsPage(false)} />;
  }

  return (
    <Base>
      <Container>
        <h4>Pages or overlays ⬇</h4>
        <HorizontalSection>
          <MainButton
            icon='plus'
            onClick={() => setShowMainOverlay(negate)}
            text='main overlay'
          />
          <MainButton
            icon='plus'
            onClick={() => setShowPages(negate)}
            text='pages'
          />
          <MainButton
            icon='plus'
            onClick={() => setShowTemplateScreen(negate)}
            text='template screen'
          />
          <MainButton
            icon='plus'
            onClick={() => setShowIconsPage(negate)}
            text='all icons'
          />
        </HorizontalSection>

        <SlideUpMenuSection />
        <PopupsSection />

        <h4>End ⬆</h4>

        <ButtonsSection />

        <HorizontalSection>
          <PopUpToolbarGeneric />
          <PopUpToolbarExpandable />
        </HorizontalSection>

        <HorizontalSection>
          <Measurement text='1.3 m' />
        </HorizontalSection>

        <HorizontalSection>
          <Tag
            lines={[
              'Room',
              '10 m²',
            ]}
            onClick={() => console.info('tag clicked')}
          />
        </HorizontalSection>

        <HorizontalSection>
          <Tabs
            chosenTab={tabIndex}
            onClick={index => setTabIndex(index)}
          >
            <Tab label='Build' />
            <Tab label='Design' />
          </Tabs>
        </HorizontalSection>

        <HorizontalSection style={{ width: 358 }}>
          <SearchInput
            placeholder='Search'
            value={searchCatalogValue}
            setValue={setSearchCatalogValue}
          />
        </HorizontalSection>

        <HorizontalSection>
          <div style={{ width: '420px' }}>
            <FormInput
              startAdornment={<InformationIcon />}
              text='Full name'
              onChange={e => {
                console.info(e.target.value);
              }}
            />
          </div>
          <div style={{ width: '420px' }}>
            <FormInput
              startAdornment={<EnvelopeIcon />}
              text='Email Address'
              onChange={e => {
                console.info(e.target.value);
              }}
            />
          </div>
          <div style={{ width: '420px' }}>
            <FormInput
              startAdornment={<LockIcon />}
              type='password'
              text='New password'
              onChange={e => {
                console.info(e.target.value);
              }}
            />
          </div>
        </HorizontalSection>

        <HorizontalSection style={{ width: 360 }}>
          <FileUploadArea
            primaryText={isDnDSupported === true ? 'Drag or Upload Objects' : 'Upload Objects from Files'}
            supportedFormatsText='Supported formats:'
            accept='.glb,.jpg,.jpeg,.png'
            onFileSelect={file => {
              window.alert(file.name);
            }}
            onFileReject={({ showDefaultRejectionEffect }) => {
              showDefaultRejectionEffect();
            }}
          />
        </HorizontalSection>

        <HorizontalSection>
          <ImageCompareSliderDemo />
        </HorizontalSection>

        <HorizontalSection>
          <InfoPanel
            title='Draw Mode: Line Drawing'
            description='Draw lines to complete a room/space. Switch to 3D view to see the space in 3D.'
            onClose={noop}
          />
        </HorizontalSection>

        <HorizontalSection>
          <HotkeysDemo />
        </HorizontalSection>
      </Container>
    </Base>
  );
};
