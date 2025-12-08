import { AppearanceContainer, AppearanceIconButton, AppearanceSectionTitle, AppearanceTab, AppearanceTabs, Checkbox, MaterialCategoryPicker, MenuItem, RecentColors, SearchInput, Select, SelectRow, SliderRow, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { useEffect, useRef, useState } from 'react';
import { TextureAssetCategoryId } from '@draw-house/common/dist/brands';
import { getNotNull, getNotUndefined, isNull, isNullish, isUndefined, ObjKeys, round, unionObject } from '@arthurka/ts-utils';
import { capitalize, checkIsNotNever } from '@draw-house/common/dist/utils';
import Color from 'color';
import { AnimatePresence } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import IconButton from '@mui/material/IconButton';
import { CloseIconSmall } from '@draw-house/ui/dist/components/Icons';
import { closeSlideUpMenuLvl2, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useSlideUpMenuLvl2 } from '../../../zustand';
import { extractTextureAssetCategories, getImageWithDefault, preferImage } from '../../../utils';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { setRoofParams, useRoofs } from '../../../zustand/useRoofs';
import { setAppearanceColorWithUpdate, useAppearanceColor } from '../../../zustand/useAppearanceColor';
import { compositeOperations } from '../../../constants';
import { Animations } from '../../animations';
import { CompareWithOriginal } from '../../CompareWithOriginal';
import { useTextureAssetsResolved } from '../../../zustand/useTextureAssets';
import { useTextureMixedWithColorsCached } from '../../../customHooks/useTextureMixedWithColorsCached';
import { getHexOrHexa } from '../../../utils/getHexOrHexa';
import { ColorPicker } from './ColorPicker';
import { queryParams } from '../../../services/queryParams';
import { LocalStorageService } from '../../../services/LocalStorageService';
import { TexturesTabs } from './TexturesTabs';
import { TextureLoader } from './TextureLoader';
import { cancelSampler, startSampler, useAppearanceSampler } from '../../../zustand/useAppearanceSampler';
import { DEFAULT_TEXTURE_TRANSFORM } from '../../../zod/TextureTransform';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { userTexturesToTextureAssets } from '../../../utils/userTextureToTextureAsset';
import { TextureAsset } from '../../../zod/TextureAsset';
import { useAppearanceMenusTopBlockType } from '../../../zustand/useAppearanceMenusTopBlockType';

export type RoofAppearanceProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'roofAppearance' }>;
};

export const RoofAppearance: React.FC<RoofAppearanceProps> = ({ slideUpMenuLvl2: { type, isOpened, roofId, textureType, applyToAll } }) => {
  checkIsNotNever(isOpened);

  const [searchText, setSearchText] = useState('');
  const [searchTextDebounced] = useDebounce(searchText, 300, {
    leading: false,
    trailing: true,
  });

  const matchSearch = (text: string) => (
    text.toLowerCase().includes(searchTextDebounced.toLowerCase())
  );

  const { textureAssets } = useTextureAssetsResolved();
  const { roofs } = useRoofs();
  const { appearanceColor } = useAppearanceColor();
  const { appearanceMenusTopBlockType } = useAppearanceMenusTopBlockType();

  const [categoryFilter, setCategoryFilter] = useState<'target-category' | 'all'>('target-category');
  const [isColorPickerOpened, setIsColorPickerOpened] = useState(false);
  const [pickerColorFallback, setPickerColorFallback] = useState(() => new Color('#fff'));
  const sampler = useAppearanceSampler();
  const { fullCatalog } = useFullCatalog();

  const initialTextureIdRef = useRef<number | null>(null);
  const initialColorHexRef = useRef<string | null>(null);
  const initialTransformRef = useRef<typeof DEFAULT_TEXTURE_TRANSFORM | null>(null);

  assert(!isNull(appearanceColor) && appearanceColor.type === type, 'Something went wrong. |65u6ez|');

  const targetRoof = isNull(roofId) ? null : roofs.find(e => e.id === roofId);
  const targetTexture = isNullish(targetRoof) ? null : targetRoof.roofData[`${textureType}Texture`];
  const targetCompositeOperation = isNullish(targetRoof) ? compositeOperations[0] : targetRoof.roofData[`${textureType}CompositeOperation`];

  const textureAssetCategories = (
    extractTextureAssetCategories(textureAssets)
      .toSorted((a, b) => a[1].order - b[1].order)
      .toSorted((a, b) => +b[1].appearanceTypes.includes('roofs') - +a[1].appearanceTypes.includes('roofs'))
      .toSorted((a, b) => +isNull(a[0]) - +isNull(b[0]))
      .filter(([, { appearanceTypes, excludeFromAllMaterials }]) => ({
        all: excludeFromAllMaterials === false,
        'target-category': appearanceTypes.includes('roofs'),
      } satisfies Record<typeof categoryFilter, boolean>)[categoryFilter])
  );

  const searchedForTextureAssetCategories = textureAssetCategories.filter(e => matchSearch(e[1].name));

  const getCurrentTransform = () => {
    if(isNullish(targetRoof)) {
      return DEFAULT_TEXTURE_TRANSFORM;
    }
    const key = `${textureType}TextureTransform` as const;
    return targetRoof.roofData?.[key] ?? DEFAULT_TEXTURE_TRANSFORM;
  };

  const getCurrentTextureId = () => isNull(targetTexture) ? null : targetTexture.id;
  const getCurrentColorHex = () => isNull(appearanceColor.color) ? null : appearanceColor.color.value.hexa().toLowerCase();

  const latestTransformRef = useRef(getCurrentTransform());
  latestTransformRef.current = getCurrentTransform();

  const latestTextureIdRef = useRef<number | null>(getCurrentTextureId());

  latestTextureIdRef.current = getCurrentTextureId();

  const latestColorHexRef = useRef<string | null>(getCurrentColorHex());
  latestColorHexRef.current = getCurrentColorHex();

  useEffect(() => {
    if(isOpened === true) {
      initialTextureIdRef.current = latestTextureIdRef.current;
      initialColorHexRef.current = latestColorHexRef.current;
      initialTransformRef.current = latestTransformRef.current;
    }
  }, [isOpened]);

  useEffect(() => {
    if(!isNull(appearanceColor.color)) {
      setPickerColorFallback(appearanceColor.color.value);
    }
  }, [appearanceColor.color]);

  const [chosenCategoryId, setChosenCategoryId] = useState(() => {
    const category = isNull(targetTexture) ? null : textureAssetCategories.find(e => e[1].textureAssetIds.includes(targetTexture.id));

    return !isNullish(category) ? category[0] : textureAssetCategories[0]?.[0];
  });
  const [isCompareWithOriginal, setIsCompareWithOriginal] = useState(true);
  const targetTextureAssetCategory = isNullish(chosenCategoryId) ? null : textureAssetCategories.find(e => e[0] === chosenCategoryId)?.[1];

  useEffect(() => {
    if(isNullish(targetRoof)) {
      return;
    }

    useAppearanceColor.setState({
      appearanceColor: {
        type,
        color: targetRoof.roofData[`${textureType}ColorOverlay`],
      },
    });
  }, [targetRoof, textureType, type]);

  const overlayColors = isNullish(targetTextureAssetCategory) ? [] : targetTextureAssetCategory.overlayColors.map(e => e.value);
  const textureMixedWithColors = useTextureMixedWithColorsCached(
    getImageWithDefault(targetTexture?.attributes.maps.colorMap.data.attributes.formats?.thumbnail.url),
    overlayColors,
    targetCompositeOperation,
  );
  const overlayColorChosenOption = (() => {
    if(isNull(appearanceColor.color)) {
      return -1;
    }

    const { color } = appearanceColor;
    const index = overlayColors.map(e => new Color(e)).findIndex(e => e.hexa() === color.value.hexa());

    if(color.type === 'predefined' && index !== -1) {
      return index;
    }

    return overlayColors.length;
  })();

  const filteredTextureAssets = textureAssets.filter(e => (
    isNullish(chosenCategoryId)
      ? e.attributes.categories.data.length === 0
      : !isUndefined(e.attributes.categories.data.find(({ id }) => id === chosenCategoryId))
  ));

  const searchedForTextureAssets = filteredTextureAssets.filter(e => matchSearch(e.attributes.name));

  const colorOverlayOptions = [
    ...overlayColors.map((name, i) => ({
      id: i,
      image: getNotUndefined(textureMixedWithColors[name], 'Something went wrong. |06430t|'),
      name,
    })),
    {
      id: overlayColors.length,
      image: '/spectrum.png',
      name: (
        overlayColorChosenOption !== overlayColors.length
          ? lang.slideUpMenus.appearance.more
          : getHexOrHexa(getNotNull(appearanceColor.color, 'Something went wrong. |24qb5x|').value)
      ),
    },
  ].filter(e => matchSearch(e.name));

  const projectId = queryParams.projectId.get();
  const recentColorsEntry = (
    LocalStorageService.recentColors
      .get()
      .find(e => (isNull(projectId) ? isNull(e.id) : e.id === projectId))
  );

  const recentColors = recentColorsEntry?.colors ?? [];
  const applyHexFromRecent = (hex: string) => {
    setAppearanceColorWithUpdate(false, type, { type: 'predefined', value: new Color(hex) });
  };

  const recentTexturesEntry = LocalStorageService.recentTextures.get().find(e => (isNull(projectId) ? isNull(e.id) : e.id === projectId));
  const recentTextureItems = recentTexturesEntry?.textures ?? [];
  const recentTextureAssets = recentTextureItems.map(item => {
    const asset = textureAssets.find(e => e.id === item.textureId);
    return asset ? { asset, meta: item } : undefined;
  }).filter(x => !isUndefined(x));

  const searchedForRecentTextureAssets = recentTextureAssets.filter(({ asset }) => matchSearch(asset.attributes.name));
  const myTexturesCategory = fullCatalog.find(e => e.isTextures === true);
  const myTextures = isUndefined(myTexturesCategory) ? [] : myTexturesCategory.items;

  const myTexturesTransformed = userTexturesToTextureAssets(myTextures, {
    scale: 1,
    mapsId: 1,
  });

  const searchedForMyTextureAssets = myTexturesTransformed.filter(asset => matchSearch(asset.attributes.name));

  const [texturesTab, setTexturesTab] = useState<'recent' | 'mine'>(
    searchedForRecentTextureAssets.length > 0 ? 'recent' : 'mine',
  );

  const { color } = appearanceColor;

  const previewImage = preferImage([
    targetTexture?.attributes.maps.colorMap.data.attributes.formats?.thumbnail.url,
    targetTexture?.attributes.maps.colorMap.data.attributes.url,
  ]);

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.appearance.title}
      opened={isOpened}
      onClose={async () => {
        const currColor = getCurrentColorHex();

        if(!isNull(currColor) && currColor !== initialColorHexRef.current) {
          LocalStorageService.recentColors.set(projectId, currColor);
        }

        const currTex = getCurrentTextureId();
        const t = getCurrentTransform();
        const overlayHex = getCurrentColorHex() ?? '#fff';
        const it = initialTransformRef.current ?? DEFAULT_TEXTURE_TRANSFORM;
        const transformChanged = t.wScale !== it.wScale || t.lScale !== it.lScale || t.rotateDeg !== it.rotateDeg;
        const textureChanged = !isNull(currTex) && currTex !== initialTextureIdRef.current;
        const colorChanged = overlayHex !== (initialColorHexRef.current ?? null);

        if(!isNull(currTex) && (textureChanged === true || colorChanged === true || transformChanged === true)) {
          LocalStorageService.recentTextures.set(projectId, { textureId: currTex, ...t, color: overlayHex });
        }

        await closeSlideUpMenuLvl2({});
      }}
      onBack={async () => {
        const currColor = getCurrentColorHex();

        if(!isNull(currColor) && currColor !== initialColorHexRef.current) {
          LocalStorageService.recentColors.set(projectId, currColor);
        }

        const currTex = getCurrentTextureId();
        const t = getCurrentTransform();
        const overlayHex = getCurrentColorHex() ?? '#fff';
        const it = initialTransformRef.current ?? DEFAULT_TEXTURE_TRANSFORM;
        const transformChanged = t.wScale !== it.wScale || t.lScale !== it.lScale || t.rotateDeg !== it.rotateDeg;
        const textureChanged = !isNull(currTex) && currTex !== initialTextureIdRef.current;
        const colorChanged = overlayHex !== (initialColorHexRef.current ?? null);

        if(!isNull(currTex) && (textureChanged === true || colorChanged === true || transformChanged === true)) {
          LocalStorageService.recentTextures.set(projectId, { textureId: currTex, ...t, color: overlayHex });
        }

        await closeSlideUpMenuLvl2({});
        showSlideUpMenuLvl1();
      }}
      header={null}
      noDivider
    >
      <MenuItem paddingHorizontal minHeight='unset' gap={10}>
        <SearchInput
          placeholder={lang.search}
          value={searchText}
          setValue={setSearchText}
        />
        <MenuItem minHeight='unset' gap={4}>
          {
            searchedForRecentTextureAssets.length > 0 && (
              <AppearanceIconButton
                icon='recent'
                state='default'
                onClick={() => {
                  if(appearanceMenusTopBlockType === 'textures' && texturesTab === 'recent') {
                    useAppearanceMenusTopBlockType.setState({ appearanceMenusTopBlockType: 'none' });
                  } else {
                    setTexturesTab('recent');
                    useAppearanceMenusTopBlockType.setState({ appearanceMenusTopBlockType: 'textures' });
                  }
                }}
              />
            )
          }
          {
            searchedForMyTextureAssets.length > 0 && (
              <AppearanceIconButton
                icon='arrowToHeart'
                state='default'
                onClick={() => {
                  if(appearanceMenusTopBlockType === 'textures' && texturesTab === 'mine') {
                    useAppearanceMenusTopBlockType.setState({ appearanceMenusTopBlockType: 'none' });
                  } else {
                    setTexturesTab('mine');
                    useAppearanceMenusTopBlockType.setState({ appearanceMenusTopBlockType: 'textures' });
                  }
                }}
              />
            )
          }
          <AppearanceIconButton
            icon='plus'
            state='default'
            onClick={() => {
              useAppearanceMenusTopBlockType.setState({
                appearanceMenusTopBlockType: appearanceMenusTopBlockType === 'upload' ? 'none' : 'upload',
              });
            }}
          />
        </MenuItem>
      </MenuItem>
      <AnimatePresence>
        {
          appearanceMenusTopBlockType === 'textures' && (
            <Animations.collapseBlock>
              <TexturesTabs
                recentTextures={searchedForRecentTextureAssets}
                myTextures={searchedForMyTextureAssets}
                activeTextureId={isNull(targetTexture) ? undefined : targetTexture.id}
                labels={{
                  tabsRecent: lang.slideUpMenus.appearance.labels.recentTextures,
                  tabsMine: lang.slideUpMenus.appearance.labels.myTextures,
                }}
                tab={texturesTab}
                onTabChange={setTexturesTab}
                onPick={textureId => {
                  setSearchText('');
                  assert(!isNull(roofId), 'This should never happen. |03x3c0|');
                  const texture = getNotUndefined(textureAssets.find(e => e.id === textureId), 'This should never happen. |gs5t3e|');
                  const saved = recentTextureItems.find(e => e.textureId === textureId);
                  if(!isUndefined(saved)) {
                    setRoofParams(roofId, applyToAll, unionObject(`${textureType}Texture`, texture));
                    setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, {
                      wScale: saved.wScale,
                      lScale: saved.lScale,
                      rotateDeg: saved.rotateDeg,
                    }));
                    setAppearanceColorWithUpdate(true, type, { type: 'spectrum', value: new Color(saved.color || '#fff') });
                    const texCatIdsRecent = texture.attributes.categories.data.map(e => e.id);
                    const matchRecent = searchedForTextureAssetCategories
                      .find(([id]) => isNull(id) ? texCatIdsRecent.length === 0 : texCatIdsRecent.includes(id));
                    setChosenCategoryId(matchRecent === undefined ? undefined : matchRecent[0]);
                    return;
                  }

                  const texCatIds = texture.attributes.categories.data.map(e => e.id);
                  const match = searchedForTextureAssetCategories.find(([id]) => isNull(id) ? texCatIds.length === 0 : texCatIds.includes(id));

                  setChosenCategoryId(isUndefined(match) ? undefined : match[0]);
                }}
                onPickMyTexture={textureId => {
                  setSearchText('');
                  assert(!isNull(roofId), 'This should never happen. |ibc1n9|');

                  const input = getNotUndefined(myTexturesTransformed.find(e => e.id === textureId), 'This should never happen. |o5ena2|');
                  const parsed = TextureAsset.parse(input);

                  setRoofParams(roofId, applyToAll, unionObject(`${textureType}Texture`, parsed));
                  setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, DEFAULT_TEXTURE_TRANSFORM));

                  const texCatIds = parsed.attributes.categories.data.map(e => e.id);
                  const match = searchedForTextureAssetCategories.find(([id]) => isNull(id) ? texCatIds.length === 0 : texCatIds.includes(id));
                  setChosenCategoryId(isUndefined(match) ? undefined : match[0]);
                }}
                onClose={() => useAppearanceMenusTopBlockType.setState({ appearanceMenusTopBlockType: 'none' })}
              />
            </Animations.collapseBlock>
          )
        }
      </AnimatePresence>
      <AnimatePresence>
        {
          appearanceMenusTopBlockType === 'upload' && (
            <Animations.collapseBlock>
              <TextureLoader
                onPickMyTexture={parsed => {
                  setSearchText('');
                  assert(!isNull(roofId), 'This should never happen. |6mht31|');

                  setRoofParams(roofId, applyToAll, unionObject(`${textureType}Texture`, parsed));
                  setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, DEFAULT_TEXTURE_TRANSFORM));

                  const texCatIds = parsed.attributes.categories.data.map(e => e.id);
                  const match = searchedForTextureAssetCategories.find(([id]) => isNull(id) ? texCatIds.length === 0 : texCatIds.includes(id));
                  setChosenCategoryId(isUndefined(match) ? undefined : match[0]);
                }}
              />
            </Animations.collapseBlock>
          )
        }
      </AnimatePresence>
      <AppearanceContainer>
        <MenuItem paddingHorizontal minHeight='unset'>
          <AppearanceSectionTitle>{lang.slideUpMenus.appearance.materials}</AppearanceSectionTitle>
          <MenuItem paddingHorizontal minHeight='unset'>
            <AppearanceTabs>
              <AppearanceTab
                label={lang.slideUpMenus.appearance.labels.roofs}
                badgeLabel={roofs.filter(e => e.roofData.isVisible).length.toString()}
                state={categoryFilter === 'target-category' ? 'active' : 'default'}
                onClick={() => {
                  setCategoryFilter('target-category');
                }}
              />
              <AppearanceTab
                label={lang.slideUpMenus.appearance.labels.all}
                state={categoryFilter === 'all' ? 'active' : 'default'}
                onClick={() => {
                  setCategoryFilter('all');
                }}
              />
            </AppearanceTabs>
          </MenuItem>
          {
            sampler.isActive === true && sampler.mode === 'texture'
              ? (
                <IconButton
                  size='small'
                  aria-label='close'
                  color='inherit'
                  onClick={() => cancelSampler()}
                >
                  <CloseIconSmall />
                </IconButton>
              )
              : (
                <AppearanceIconButton
                  icon='colorPicker'
                  state='default'
                  isColorPicker
                  onClick={() => {
                    if(isNull(roofId)) {
                      return;
                    }
                    startSampler('texture', {
                      appearance(appearance) {
                        if(!isNull(appearance)) {
                          const { texture, transform, overlay } = appearance;
                          if(!isNull(texture)) {
                            setRoofParams(roofId, applyToAll, unionObject(`${textureType}Texture`, texture));
                          }
                          setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, isNull(transform) ? DEFAULT_TEXTURE_TRANSFORM : transform));
                          setAppearanceColorWithUpdate(true, type, overlay);
                        }
                      },
                    });
                  }}
                />
              )
          }
        </MenuItem>
      </AppearanceContainer>
      {
        searchedForTextureAssetCategories.length > 0 && (
          <MenuItem>
            <MaterialCategoryPicker
              chosenOption={isNull(chosenCategoryId) ? 0 : chosenCategoryId}
              options={
                searchedForTextureAssetCategories.map(([id, { name, image }]) => ({
                  id: isNull(id) ? 0 : id,
                  name,
                  image: (
                    chosenCategoryId !== id || isNull(appearanceColor.color)
                      ? image
                      : getNotUndefined(
                        preferImage([
                          textureMixedWithColors[getHexOrHexa(appearanceColor.color.value)],
                          image,
                        ]),
                        'This should never happen. |lkz7bp|',
                      )
                  ),
                }))
              }
              onClick={e => {
                setSearchText('');
                assert(!isNull(roofId), 'This should never happen. |x81k5p|');

                const newChosenCategoryId = e === 0 ? null : TextureAssetCategoryId(e);

                setChosenCategoryId(newChosenCategoryId);

                const [newTextureAsset] = textureAssets.filter(e => (
                  isNull(newChosenCategoryId)
                    ? e.attributes.categories.data.length === 0
                    : !isUndefined(e.attributes.categories.data.find(({ id }) => id === newChosenCategoryId))
                ));

                assert(!isUndefined(newTextureAsset), 'This should never happen. |e0ffx6|');

                setRoofParams(roofId, applyToAll, unionObject(`${textureType}Texture`, newTextureAsset));
                setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, DEFAULT_TEXTURE_TRANSFORM));
              }}
            />
          </MenuItem>
        )
      }
      <AnimatePresence>
        {
          chosenCategoryId !== undefined && filteredTextureAssets.length > 1 && (
            <Animations.collapseBlock>
              <AppearanceContainer>
                <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
                  <AppearanceSectionTitle>{lang.slideUpMenus.appearance.textures}</AppearanceSectionTitle>
                </MenuItem>
              </AppearanceContainer>
              {
                searchedForTextureAssets.length > 0 && (
                  <MenuItem>
                    <MaterialCategoryPicker
                      chosenOption={isNull(targetTexture) ? undefined : targetTexture.id}
                      options={
                        searchedForTextureAssets.map(({ id, attributes: { name, preview } }) => ({
                          id,
                          name,
                          image: getImageWithDefault(
                            preferImage([
                              isNull(appearanceColor.color) || isNull(targetTexture) || id !== targetTexture.id
                                ? undefined
                                : textureMixedWithColors[getHexOrHexa(appearanceColor.color.value)],
                              preview.data?.attributes.formats?.thumbnail.url,
                            ]),
                          ),
                        }))
                      }
                      onClick={textureId => {
                        setSearchText('');
                        assert(!isNull(roofId), 'This should never happen. |ub21bl|');

                        const texture = getNotUndefined(textureAssets.find(e => e.id === textureId), 'This should never happen. |u8mem6|');

                        setRoofParams(roofId, applyToAll, unionObject(`${textureType}Texture`, texture));
                        setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, DEFAULT_TEXTURE_TRANSFORM));
                      }}
                    />
                  </MenuItem>
                )
              }
            </Animations.collapseBlock>
          )
        }
      </AnimatePresence>
      <AppearanceContainer>
        <MenuItem paddingHorizontal gap={10} minHeight='unset'>
          <AppearanceSectionTitle>{lang.slideUpMenus.appearance.colorOverlay}</AppearanceSectionTitle>
          {
            sampler.isActive === true && sampler.mode === 'overlay'
              ? (
                <IconButton
                  size='small'
                  aria-label='close'
                  color='inherit'
                  onClick={() => cancelSampler()}
                >
                  <CloseIconSmall />
                </IconButton>
              )
              : (
                <AppearanceIconButton
                  icon='colorPicker'
                  state='default'
                  isColorPicker
                  onClick={() => {
                    if(isNull(roofId)) {
                      return;
                    }
                    startSampler('overlay', {
                      overlay(overlay) {
                        setAppearanceColorWithUpdate(true, type, overlay);
                      },
                    });
                  }}
                />
              )
          }
        </MenuItem>
      </AppearanceContainer>
      {
        colorOverlayOptions.length > 0 && (
          <MenuItem>
            <MaterialCategoryPicker
              wrap
              chosenOption={overlayColorChosenOption}
              options={colorOverlayOptions}
              onClick={id => {
                setSearchText('');

                if(id === overlayColors.length) {
                  setAppearanceColorWithUpdate(false, type, {
                    type: 'spectrum',
                    value: isNull(appearanceColor.color) ? new Color('#fff') : appearanceColor.color.value,
                  });
                  setIsColorPickerOpened(isColorPickerOpened === false);
                  return;
                }

                setAppearanceColorWithUpdate(true, type, {
                  type: 'predefined',
                  value: new Color(getNotUndefined(overlayColors[id], 'This should never happen. |w0fag1|')),
                });
                setIsColorPickerOpened(false);
              }}
            />
          </MenuItem>
        )
      }
      <MenuItem>
        <SelectRow
          label={lang.slideUpMenus.appearance.compositeOperation}
          value={targetCompositeOperation}
          options={compositeOperations.map(e => ({ label: e, value: e }))}
          onChange={e => {
            assert(!isNull(roofId), 'This should never happen. |9x8k1z|');

            setRoofParams(roofId, applyToAll, unionObject(`${textureType}CompositeOperation`, e));
          }}
        />
      </MenuItem>
      <AnimatePresence>
        {
          isColorPickerOpened === true && (
            <Animations.collapseBlock>
              <ColorPicker
                type={type}
                value={appearanceColor.color?.value ?? pickerColorFallback}
                onChange={value => {
                  setPickerColorFallback(value);
                  setAppearanceColorWithUpdate(false, type, { type: 'spectrum', value });
                }}
              />
              <MenuItem paddingHorizontal>
                <TextField
                  type='text'
                  label={lang.slideUpMenus.appearance.name}
                  size='lg'
                  value={isNullish(targetRoof) ? '' : targetRoof.roofData[`comment${capitalize(textureType)}TextureOverlayColor`]}
                  onChange={e => {
                    assert(!isNull(roofId), 'This should never happen. |2iln9o|');

                    setRoofParams(roofId, applyToAll, unionObject(`comment${capitalize(textureType)}TextureOverlayColor`, e));
                  }}
                />
              </MenuItem>
            </Animations.collapseBlock>
          )
        }
      </AnimatePresence>
      {
        recentColors.length > 0 && (
          <MenuItem paddingHorizontal paddingVertical='md'>
            <RecentColors
              label={lang.slideUpMenus.appearance.labels.recentColors}
              recentColors={recentColors}
              activeHex={isNull(appearanceColor.color) ? null : appearanceColor.color.value.hex()}
              applyHexFromPalette={applyHexFromRecent}
            />
          </MenuItem>
        )
      }
      {
        !isUndefined(previewImage) && (
          <>
            <AppearanceContainer>
              <MenuItem paddingHorizontal spaceBetween minHeight='unset'>
                <AppearanceSectionTitle>{lang.slideUpMenus.appearance.preview}</AppearanceSectionTitle>
                <Checkbox
                  text={lang.slideUpMenus.appearance.compareToOriginal}
                  checked={isCompareWithOriginal}
                  onClick={() => {
                    setIsCompareWithOriginal(isCompareWithOriginal === false);
                  }}
                />
              </MenuItem>
            </AppearanceContainer>
            <AnimatePresence>
              {
                isCompareWithOriginal === true && (
                  <Animations.collapseBlock>
                    <CompareWithOriginal
                      useTextureCompareParams={[
                        previewImage,
                        color?.value || null,
                        targetCompositeOperation,
                      ]}
                      initialTransform={getCurrentTransform()}
                      onTransformChange={t => {
                        if(isNull(roofId)) {
                          return;
                        }
                        setRoofParams(roofId, applyToAll, unionObject(`${textureType}TextureTransform`, t));
                      }}
                    />
                  </Animations.collapseBlock>
                )
              }
            </AnimatePresence>
          </>
        )
      }
      {
        !isNull(appearanceColor.color) && (() => {
          const { color } = appearanceColor;

          return (

            <MenuItem paddingVertical='lg' paddingHorizontal>
              <SliderRow
                label={lang.slideUpMenus.appearance.transparency}
                min={0}
                max={1}
                step={0.001}
                value={appearanceColor.color.value.alpha()}
                onChange={value => {
                  setAppearanceColorWithUpdate(false, type, {
                    type: 'spectrum',
                    value: color.value.alpha(round(value, 3)),
                  });
                }}
              />
            </MenuItem>

          );
        })()
      }
      <MenuItem paddingHorizontal>
        <TextField
          type='text'
          label={lang.slideUpMenus.appearance.name}
          size='lg'
          value={isNullish(targetRoof) ? '' : targetRoof.roofData[`comment${capitalize(textureType)}TextureAppearance`]}
          onChange={e => {
            assert(!isNull(roofId), 'This should never happen. |9rzk2x|');

            setRoofParams(roofId, applyToAll, unionObject(`comment${capitalize(textureType)}TextureAppearance`, e));
          }}
        />
      </MenuItem>
      <AppearanceContainer>
        <MenuItem paddingLeft='row 3/4' paddingRight spaceBetween minHeight='unset'>
          <Checkbox
            text={lang.applyToAll}
            checked={applyToAll.isActive}
            onClick={() => {
              assert(!isNull(roofId), 'This should never happen. |1mvh6t|');

              useSlideUpMenuLvl2.setState({
                slideUpMenuLvl2: {
                  type,
                  isOpened: true,
                  roofId,
                  textureType,
                  applyToAll: {
                    ...applyToAll,
                    isActive: applyToAll.isActive === false,
                  },
                },
              });
            }}
          />
          <Select
            value={applyToAll.type}
            options={
              ObjKeys({
                sameLevelRoofs: true,
                roofs: true,
              } satisfies Record<typeof applyToAll.type, true>)
                .map(e => ({
                  label: lang.slideUpMenus.roofSettings.applyToAll(e),
                  value: e,
                }))
            }
            onChange={e => {
              assert(!isNull(roofId), 'This should never happen. |ai9mq9|');

              useSlideUpMenuLvl2.setState({
                slideUpMenuLvl2: {
                  type,
                  isOpened: true,
                  roofId,
                  textureType,
                  applyToAll: {
                    ...applyToAll,
                    type: e,
                  },
                },
              });
            }}
          />
        </MenuItem>
      </AppearanceContainer>
    </SlideUpAndFloatingMenusWrapper>
  );
};
