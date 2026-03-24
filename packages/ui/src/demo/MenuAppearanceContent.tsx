import { memo, useState } from 'react';
import {
  AppearanceContainer,
  AppearanceIconButton,
  AppearanceSectionTitle,
  AppearanceTab,
  AppearanceTabs,
  Checkbox,
  MaterialCategoryPicker,
  MenuItem,
  PreviewImage,
  SearchInput,
  TextField,
} from '../components';
import { RecentColors } from '../components/RecentColors';
import { noop } from '../utils/noop';
import { negate } from '../utils/negate';
import { makeSolidColorImageUri } from '../utils';

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
  { id: 9, image: 'https://placehold.co/56', name: 'More' },
];

const recentColorsList = [
  '#888880', '#e8e0d0', '#4a9a40', '#9bbfc8', '#c8c4a0',
  '#8a7060', '#765040', '#654030', '#543020', '#432010',
];

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
      <MenuItem paddingHorizontal minHeight='unset' gap={10}>
        <SearchInput
          placeholder='Texture Search'
          value={searchValue}
          setValue={setSearchValue}
        />
        <MenuItem minHeight='unset' gap={4}>
          <AppearanceIconButton icon='recent' onClick={noop} />
          <AppearanceIconButton icon='arrowToHeart' onClick={noop} />
          <AppearanceIconButton icon='plus' onClick={noop} />
        </MenuItem>
      </MenuItem>

      <AppearanceContainer>
        <MenuItem paddingHorizontal minHeight='unset' spaceBetween>
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
          <AppearanceIconButton icon='close' onClick={noop} />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem>
        <MaterialCategoryPicker
          options={recentMaterials}
          chosenOption={chosenMaterial}
          onClick={setChosenMaterial}
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
          <AppearanceSectionTitle>Materials</AppearanceSectionTitle>
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

      <MenuItem>
        <MaterialCategoryPicker
          options={materials}
          chosenOption={chosenMaterial}
          onClick={setChosenMaterial}
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
          <AppearanceSectionTitle>Textures</AppearanceSectionTitle>
          <AppearanceIconButton icon='colorPicker' onClick={noop} />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem>
        <MaterialCategoryPicker
          options={textures}
          chosenOption={chosenTexture}
          onClick={setChosenTexture}
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
          <AppearanceSectionTitle>Color Overlay</AppearanceSectionTitle>
          <AppearanceIconButton icon='colorPicker' onClick={noop} />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem>
        <MaterialCategoryPicker
          options={colorOverlayColors}
          chosenOption={chosenColor}
          onClick={setChosenColor}
          wrap
        />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem paddingHorizontal minHeight='unset'>
          <RecentColors
            label='Recent Colors'
            recentColors={recentColorsList}
            applyHexFromPalette={noop}
          />
        </MenuItem>
      </AppearanceContainer>

      <AppearanceContainer>
        <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
          <AppearanceSectionTitle>Preview</AppearanceSectionTitle>
          <Checkbox
            checked={shouldCompare}
            onClick={() => setShouldCompare(negate)}
            text='Compare to Original'
          />
        </MenuItem>
      </AppearanceContainer>

      <MenuItem paddingHorizontal center>
        <PreviewImage src={makeSolidColorImageUri('#c8b090')} />
      </MenuItem>

      <AppearanceContainer>
        <MenuItem paddingHorizontal>
          <TextField
            type='number'
            size='sm'
            label='W'
            value='0.50'
            onChange={noop}
            adornment='m'
          />
        </MenuItem>
      </AppearanceContainer>
    </>
  );
});
