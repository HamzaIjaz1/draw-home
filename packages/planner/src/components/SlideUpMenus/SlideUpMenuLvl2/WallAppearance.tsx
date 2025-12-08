import { AppearanceContainer, AppearanceIconButton, AppearanceSectionTitle, AppearanceTab, AppearanceTabs, Checkbox, MaterialCategoryPicker, MenuItem, RecentColors, SearchInput, Select, SelectRow, SliderRow, TextField } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { useEffect, useRef, useState } from 'react';
import { getNotNull, getNotUndefined, isNull, isNullish, isUndefined, ObjKeys, round } from '@arthurka/ts-utils';
import { capitalize, checkIsNotNever } from '@draw-house/common/dist/utils';
import { TextureAssetCategoryId } from '@draw-house/common/dist/brands';
import { AnimatePresence } from 'framer-motion';
import Color from 'color';
import { useDebounce } from 'use-debounce';
import IconButton from '@mui/material/IconButton';
import { CloseIconSmall } from '@draw-house/ui/dist/components/Icons';
import { closeSlideUpMenuLvl2, setWallSideParams, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useSlideUpMenuLvl2, useWalls } from '../../../zustand';
import { extractTextureAssetCategories, getImageWithDefault, preferImage } from '../../../utils';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { setAppearanceColorWithUpdate, useAppearanceColor } from '../../../zustand/useAppearanceColor';
import { Animations } from '../../animations';
import { compositeOperations } from '../../../constants';
import { useTextureAssetsResolved } from '../../../zustand/useTextureAssets';
import { CompareWithOriginal } from '../../CompareWithOriginal';
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

export type WallAppearanceProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'wallAppearance' }>;
};

export const WallAppearance: React.FC<WallAppearanceProps> = ({ slideUpMenuLvl2: { type, isOpened, wallId, textureType, applyToAll } }) => {
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
  const { walls } = useWalls();
  const { appearanceColor } = useAppearanceColor();
  const sampler = useAppearanceSampler();
  const { fullCatalog } = useFullCatalog();
  const { appearanceMenusTopBlockType } = useAppearanceMenusTopBlockType();

  const [categoryFilter, setCategoryFilter] = useState<'target-category' | 'all'>('target-category');
  const [isColorPickerOpened, setIsColorPickerOpened] = useState(false);
  const [pickerColorFallback, setPickerColorFallback] = useState(() => new Color('#fff'));
  const initialTextureIdRef = useRef<number | null>(null);
  const initialColorHexRef = useRef<string | null>(null);
  const initialTransformRef = useRef<typeof DEFAULT_TEXTURE_TRANSFORM | null>(null);

  assert(!isNull(appearanceColor) && appearanceColor.type === type, 'Something went wrong. |6s8xte|');

  const targetWall = isNull(wallId) ? null : walls.find(e => e.id === wallId);
  const targetTexture = isNullish(targetWall) ? null : targetWall[`${textureType}Texture`];
  const targetCompositeOperation = isNullish(targetWall) ? compositeOperations[0] : targetWall[`${textureType}CompositeOperation`];

  const textureAssetCategories = (
    extractTextureAssetCategories(textureAssets)
      .toSorted((a, b) => a[1].order - b[1].order)
      .toSorted((a, b) => +b[1].appearanceTypes.includes('walls') - +a[1].appearanceTypes.includes('walls'))
      .toSorted((a, b) => +isNull(a[0]) - +isNull(b[0]))
      .filter(([, { appearanceTypes, excludeFromAllMaterials }]) => ({
        all: excludeFromAllMaterials === false,
        'target-category': appearanceTypes.includes('walls'),
      } satisfies Record<typeof categoryFilter, boolean>)[categoryFilter])
  );

  const searchedForTextureAssetCategories = textureAssetCategories.filter(e => matchSearch(e[1].name));

  const getCurrentTransform = () => {
    if(isNullish(targetWall)) {
      return DEFAULT_TEXTURE_TRANSFORM;
    }
    const key = `${textureType}TextureTransform` as const;
    return targetWall[key] ?? DEFAULT_TEXTURE_TRANSFORM;
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
    if(isNullish(targetWall)) {
      return;
    }

    useAppearanceColor.setState({
      appearanceColor: {
        type,
        color: targetWall[`${textureType}ColorOverlay`],
      },
    });
  }, [targetWall, textureType, type]);

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
      image: getNotUndefined(textureMixedWithColors[name], 'Something went wrong. |ih8eky|'),
      name,
    })),
    {
      id: overlayColors.length,
      image: '/spectrum.png',
      name: (
        overlayColorChosenOption !== overlayColors.length
          ? lang.slideUpMenus.appearance.more
          : getHexOrHexa(getNotNull(appearanceColor.color, 'Something went wrong. |6vk5q5|').value)
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
                  assert(!isNull(wallId), 'This should never happen. |m1k7gf|');
                  const texture = getNotUndefined(textureAssets.find(e => e.id === textureId), 'This should never happen. |so2uuy|');
                  const saved = recentTextureItems.find(e => e.textureId === textureId);
                  if(!isUndefined(saved)) {
                    setWallSideParams(
                      wallId,
                      applyToAll,
                      textureType,
                      {
                        texture,
                        textureTransform: {
                          wScale: saved.wScale,
                          lScale: saved.lScale,
                          rotateDeg: saved.rotateDeg,
                        },
                      },
                    );

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
                  assert(!isNull(wallId), 'This should never happen. |xt8m0h|');

                  const input = getNotUndefined(myTexturesTransformed.find(e => e.id === textureId), 'This should never happen. |m61bk5|');
                  const parsed = TextureAsset.parse(input);

                  setWallSideParams(wallId, applyToAll, textureType, { texture: parsed, resetTransform: true });

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
                  assert(!isNull(wallId), 'This should never happen. |7p9qkc|');

                  setWallSideParams(wallId, applyToAll, textureType, {
                    texture: parsed,
                    resetTransform: true,
                  });

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
          <MenuItem paddingLeft minHeight='unset'>
            <AppearanceTabs>
              <AppearanceTab
                label={lang.slideUpMenus.appearance.labels.walls}
                badgeLabel={walls.filter(e => e.isVisible).length.toString()}
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
                    if(isNull(wallId)) {
                      return;
                    }
                    startSampler('texture', {
                      appearance(appearance) {
                        if(!isNull(appearance)) {
                          const { texture, transform, overlay } = appearance;
                          if(!isNull(texture)) {
                            setWallSideParams(
                              wallId,
                              applyToAll,
                              textureType,
                              {
                                texture,
                                textureTransform: isNull(transform) ? DEFAULT_TEXTURE_TRANSFORM : transform,
                              },
                            );
                          }
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
                searchedForTextureAssetCategories.map(([id, { name, image }]): React.ComponentProps<typeof MaterialCategoryPicker>['options'][number] => ({
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
                        'This should never happen. |80ih06|',
                      )
                  ),
                }))
              }
              onClick={e => {
                setSearchText('');
                assert(!isNull(wallId), 'This should never happen. |oge22b|');

                const newChosenCategoryId = e === 0 ? null : TextureAssetCategoryId(e);

                setChosenCategoryId(newChosenCategoryId);

                const [newTextureAsset] = textureAssets.filter(e => (
                  isNull(newChosenCategoryId)
                    ? e.attributes.categories.data.length === 0
                    : !isUndefined(e.attributes.categories.data.find(({ id }) => id === newChosenCategoryId))
                ));

                assert(!isUndefined(newTextureAsset), 'This should never happen. |g0ufr3|');

                setWallSideParams(wallId, applyToAll, textureType, { texture: newTextureAsset, resetTransform: true });
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
                        assert(!isNull(wallId), 'This should never happen. |x8boa3|');

                        const texture = getNotUndefined(textureAssets.find(e => e.id === textureId), 'This should never happen. |hp4tx5|');

                        setWallSideParams(wallId, applyToAll, textureType, { texture, resetTransform: true });
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
                    if(isNull(wallId)) {
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
                  value: new Color(getNotUndefined(overlayColors[id], 'This should never happen. |qmy0vc|')),
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
          onChange={compositeOperation => {
            assert(!isNull(wallId), 'This should never happen. |ny2uq3|');

            setWallSideParams(wallId, applyToAll, textureType, { compositeOperation });
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
                  value={isNullish(targetWall) ? '' : targetWall[`comment${capitalize(textureType)}TextureOverlayColor`]}
                  onChange={commentTextureOverlayColor => {
                    assert(!isNull(wallId), 'This should never happen. |6a3deh|');

                    setWallSideParams(wallId, applyToAll, textureType, { commentTextureOverlayColor });
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
                        if(isNull(wallId)) {
                          return;
                        }
                        setWallSideParams(wallId, applyToAll, textureType, { textureTransform: t });
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
          value={isNullish(targetWall) ? '' : targetWall[`comment${capitalize(textureType)}TextureAppearance`]}
          onChange={commentTextureAppearance => {
            assert(!isNull(wallId), 'This should never happen. |m87mlv|');

            setWallSideParams(wallId, applyToAll, textureType, { commentTextureAppearance });
          }}
        />
      </MenuItem>
      <AppearanceContainer>
        <MenuItem paddingLeft='row 3/4' paddingRight spaceBetween minHeight='unset'>
          <Checkbox
            text={lang.applyToAll}
            checked={applyToAll.isActive}
            onClick={() => {
              assert(!isNull(wallId), 'This should never happen. |fqu820|');

              useSlideUpMenuLvl2.setState({
                slideUpMenuLvl2: {
                  type,
                  isOpened: true,
                  wallId,
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
                sameFaceSameSpaceWallFaces: true,
                sameFaceSameLevelWallFaces: true,
                sameFaceWallFaces: true,
              } satisfies Record<typeof applyToAll.type, true>)
                .map(e => ({
                  label: lang.slideUpMenus.wallSettings.applyToAll(
                    e,
                    isNullish(targetWall) || isNull(targetWall[`${textureType}SideSpaceId`]) ? 'street' : 'room',
                  ),
                  value: e,
                }))
            }
            onChange={e => {
              assert(!isNull(wallId), 'This should never happen. |wx9fvi|');

              useSlideUpMenuLvl2.setState({
                slideUpMenuLvl2: {
                  type,
                  isOpened: true,
                  wallId,
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
