import { memo, useState } from 'react';
import {
  AppearanceContainer,
  AppearanceIconButton,
  AppearanceInputsContainer,
  AppearanceSectionTitle,
  AppearanceTab,
  AppearanceTabs,
  Checkbox,
  ImageCompareSlider,
  MaterialCategoryPicker,
  MenuItem,
  PreviewImage,
  SearchInput,
  SliderRow,
  SliderRowProps,
  TextField,
} from '../components';
import { RecentColors } from '../components/RecentColors';
import { noop } from '../utils/noop';
import { makeSolidColorImageUri } from '../utils';
import { SafeOmit } from '@draw-house/common/dist/utils';
import { ReactCompareSliderImage } from 'react-compare-slider';
import { ArrowClockwiseIcon, BidirectionalHorizontalArrowIcon, BidirectionalVerticalArrowIcon } from '../components/Icons';

const recentMaterials = [
  { id: 0, image: makeSolidColorImageUri('#888880'), name: 'Plain' },
  { id: 1, image: makeSolidColorImageUri('#c8c4be'), name: 'Stucco' },
  { id: 2, image: makeSolidColorImageUri('#DDCDA6'), name: '#DDCDA6' },
  { id: 3, image: 'https://placehold.co/56', name: 'Brick' },
];

const materials = [
  { id: 0, image: makeSolidColorImageUri('#111111'), name: 'Plain' },
  { id: 1, image: 'https://placehold.co/56', name: 'Shingles' },
  { id: 2, image: 'https://placehold.co/56', name: 'Metal' },
  { id: 3, image: 'https://placehold.co/56', name: 'Tile' },
];

const textures = [
  { id: 0, image: makeSolidColorImageUri('#9a9a9a'), name: 'Monolith' },
  { id: 1, image: makeSolidColorImageUri('#6b6b6b'), name: 'Concrete Block' },
  { id: 2, image: makeSolidColorImageUri('#b0b0a8'), name: 'Facade' },
  { id: 3, image: makeSolidColorImageUri('#9c9c8e'), name: 'Slag Block' },
  { id: 4, image: makeSolidColorImageUri('#7a7a7a'), name: 'Foamed' },
];

const colorOverlayColors = [
  { id: 0, image: makeSolidColorImageUri('#FFE5C0'), name: '#FFE5C0' },
  { id: 1, image: makeSolidColorImageUri('#F3E6D4'), name: '#F3E6D4' },
  { id: 2, image: makeSolidColorImageUri('#988F85'), name: '#988F85' },
  { id: 3, image: makeSolidColorImageUri('#DEDDD1'), name: '#DEDDD1' },
  { id: 4, image: makeSolidColorImageUri('#ADB8C0'), name: '#ADB8C0' },
  { id: 5, image: makeSolidColorImageUri('#DDCDA6'), name: '#DDCDA6' },
  { id: 6, image: makeSolidColorImageUri('#8A7362'), name: '#8A7362' },
  { id: 7, image: makeSolidColorImageUri('#868578'), name: '#868578' },
  { id: 8, image: makeSolidColorImageUri('#434A54'), name: '#434A54' },
  { id: 7, image: 'https://placehold.co/56', name: 'More' },
];

const recentColorsList = [
  '#888880', '#e8e0d0', '#4a9a40', '#9bbfc8', '#c8c4a0',
  '#8a7060', '#765040', '#654030', '#543020', '#432010',
];

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

export const MenuAppearanceContent = memo(() => {
  const [activeTab, setActiveTab] = useState(0);
  const [materialFilter, setMaterialFilter] = useState(0);
  const [chosenMaterial, setChosenMaterial] = useState<number | undefined>(undefined);
  const [chosenTexture, setChosenTexture] = useState<number | undefined>(undefined);
  const [chosenColor, setChosenColor] = useState<number | undefined>(undefined);
  const [shouldCompare, setShouldCompare] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const tabs = [
    { label: 'Recent', badge: '125' },
    { label: 'My Textures', badge: '0' },
  ];

  const materialFilterTabs = [
    { label: 'Roof' },
    { label: 'All' },
  ];

  return (
    <>
      <MenuItem className='menu-item' paddingHorizontal minHeight='unset' gap={8}>
        <SearchInput
          className='search-input'
          placeholder='Texture Search'
          value={searchValue}
          setValue={setSearchValue}
        />
        <MenuItem minHeight='unset' gap={8}>
          <AppearanceIconButton icon='recent' onClick={noop} />
          <AppearanceIconButton icon='arrowToHeart' onClick={noop} />
          <AppearanceIconButton icon='plus' onClick={noop} />
        </MenuItem>
      </MenuItem>

      <AppearanceContainer>
        <MenuItem className='menu-item' paddingHorizontal minHeight='unset' spaceBetween>
          <AppearanceTabs className='appearance-tabs'>
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
          <AppearanceIconButton className='appearance-close-button' icon='close' onClick={noop} />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem className='menu-category-item'>
        <MaterialCategoryPicker
          options={recentMaterials}
          chosenOption={chosenMaterial}
          onClick={setChosenMaterial}
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem className='menu-item' paddingHorizontal gap={8} minHeight='unset'>
          <AppearanceSectionTitle className='materials-title'>Materials</AppearanceSectionTitle>
          <AppearanceTabs>
            {materialFilterTabs.map(({ label }, i) => (
              <AppearanceTab
                key={label}
                label={label}
                state={materialFilter === i ? 'active' : 'default'}
                onClick={() => setMaterialFilter(i)}
              />
            ))}
          </AppearanceTabs>
        </MenuItem>
      </AppearanceContainer>

      <MenuItem className='menu-category-item'>
        <MaterialCategoryPicker
          options={materials}
          chosenOption={chosenMaterial}
          onClick={setChosenMaterial}
          size='sm'
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem className='menu-item' paddingHorizontal gap={8} minHeight='unset'>
          <AppearanceSectionTitle>Textures</AppearanceSectionTitle>
          <AppearanceIconButton className='edit-icon' icon='colorPicker' onClick={noop} />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem className='menu-category-item'>
        <MaterialCategoryPicker
          options={textures}
          chosenOption={chosenTexture}
          onClick={setChosenTexture}
          size='sm'
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem className='menu-item' paddingHorizontal gap={8} minHeight='unset'>
          <AppearanceSectionTitle>Color Overlay</AppearanceSectionTitle>
          <AppearanceIconButton className='edit-icon' icon='colorPicker' onClick={noop} />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem className='menu-item'>
        <MaterialCategoryPicker
          className='menu-color-overlay'
          options={colorOverlayColors}
          chosenOption={chosenColor}
          onClick={setChosenColor}
          size='sm'
          wrap
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem className='menu-item' paddingHorizontal minHeight='unset'>
          <RecentColors
            className='recent-color-menu'
            label='Recent Colors'
            recentColors={recentColorsList}
            applyHexFromPalette={noop}
          />
        </MenuItem>
      </AppearanceContainer>

      {/* <AppearanceContainer>
        <MenuItem className='menu-item preview-menu' paddingHorizontal spaceBetween minHeight='unset'>
          <AppearanceSectionTitle>Preview</AppearanceSectionTitle>
          <Checkbox
            checked={shouldCompare}
            onClick={() => setShouldCompare(negate)}
            text='Compare to Original'
          />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem className='menu-item' paddingHorizontal center>
        <PreviewImage src={makeSolidColorImageUri('#c8b090')} />
      </MenuItem> */}
      <AppearanceContainer>
        <MenuItem className='menu-item preview-menu' paddingHorizontal spaceBetween minHeight='unset'>
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
          <MenuItem className='menu-item image-compare-menu' paddingHorizontal spaceBetween>
            <ImageCompareSlider
              imgOne={<ReactCompareSliderImage src={makeSolidColorImageUri('#ed8282')} />}
              imgTwo={<ReactCompareSliderImage src={makeSolidColorImageUri('#81c14b')} />}
            />
            <AppearanceInputsContainer>
              <MenuItem>
                <TextField
                  type='number'
                  size='sm'
                  label={<BidirectionalHorizontalArrowIcon />}
                  value='0.5'
                  onChange={noop}
                  adornment='m'
                />
              </MenuItem>
              <MenuItem>
                <TextField
                  type='number'
                  size='sm'
                  label={<BidirectionalVerticalArrowIcon />}
                  value='0.5'
                  onChange={noop}
                  adornment='m'
                />
              </MenuItem>
              <MenuItem>
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
          <MenuItem className='menu-item image-compare-menu' paddingHorizontal center>
            <PreviewImage src={makeSolidColorImageUri('#81c14b')} />
          </MenuItem>
        )
      }
      <MenuItem className='menu-item transparency-menu' paddingHorizontal paddingVertical='md'>
        <SliderRowWrap
          label='Transparency'
          initialValue={0.4}
          min={0}
          max={1}
          step={0.001}
        />
      </MenuItem>
      {/* <AppearanceContainer>
        <MenuItem className='menu-item' paddingHorizontal>
          <TextField
            type='number'
            size='sm'
            label='W'
            value='0.50'
            onChange={noop}
            adornment='m'
          />
        </MenuItem>
      </AppearanceContainer> */}
    </>
  );
});
