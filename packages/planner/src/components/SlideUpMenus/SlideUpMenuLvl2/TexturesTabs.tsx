import { useState } from 'react';
import {
  AppearanceContainer,
  AppearanceTab,
  AppearanceTabs,
  MaterialCategoryPicker,
  MenuItem,
  RecentTexturePicker,
} from '@draw-house/ui/dist/components';
import { CloseIconSmall } from '@draw-house/ui/dist/components/Icons';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';
import { getImageWithDefault, preferImage } from '../../../utils';
import { TextureAsset } from '../../../zod';

export type TexturesTabsProps = {
  recentTextures: Array<{ asset: TextureAsset; meta: { wScale: number; lScale: number; rotateDeg: number; color: string } }>;
  myTextures: TextureAsset[];
  activeTextureId?: number;
  labels: {
    tabsRecent: string;
    tabsMine: string;
  };
  tab?: 'recent' | 'mine';
  onTabChange?: (t: 'recent' | 'mine') => void;
  onPick: (textureId: number) => void;
  onPickMyTexture: (textureId: number) => void;
  onClose: () => void;
};

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 16px;
`;

export const TexturesTabs: React.FC<TexturesTabsProps> = ({
  recentTextures,
  myTextures,
  activeTextureId,
  labels: {
    tabsRecent,
    tabsMine,
  },
  tab: controlledTab,
  onTabChange,
  onPick,
  onPickMyTexture,
  onClose,
}) => {
  const [uncontrolledTab, setUncontrolledTab] = useState<'recent' | 'mine'>('recent');
  const setTab = (t: 'recent' | 'mine') => {
    onTabChange?.(t);
    if(controlledTab === undefined) {
      setUncontrolledTab(t);
    }
  };
  const tab = controlledTab ?? uncontrolledTab;
  const hasRecent = recentTextures.length > 0;
  const hasMine = myTextures.length > 0;
  if(hasRecent === false && hasMine === false) {
    return null;
  }

  const effectiveTab: 'recent' | 'mine' =
    tab === 'recent' ? (hasRecent === true ? 'recent' : 'mine') : (hasMine === true ? 'mine' : 'recent');

  return (
    <>
      <AppearanceContainer>
        <TabsWrapper>
          <MenuItem paddingHorizontal minHeight='unset'>
            <AppearanceTabs>
              {hasRecent === true && (
                <AppearanceTab
                  label={tabsRecent}
                  state={effectiveTab === 'recent' ? 'active' : 'default'}
                  badgeLabel={recentTextures.length.toString()}
                  onClick={() => setTab('recent')}
                />
              )}
              {hasMine === true && (
                <AppearanceTab
                  label={tabsMine}
                  state={effectiveTab === 'mine' ? 'active' : 'default'}
                  badgeLabel={myTextures.length.toString()}
                  onClick={() => setTab('mine')}
                />
              )}
            </AppearanceTabs>
          </MenuItem>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={onClose}
          >
            <CloseIconSmall />
          </IconButton>
        </TabsWrapper>
      </AppearanceContainer>
      <MenuItem>
        {
          effectiveTab === 'recent'
            ? (
              <RecentTexturePicker<number>
                chosenOption={activeTextureId}
                options={recentTextures.map(({ asset, meta }) => ({
                  id: asset.id,
                  name: asset.attributes.name,
                  image: getImageWithDefault(
                    preferImage([
                      asset.attributes.preview.data?.attributes.formats?.thumbnail?.url,
                    ]),
                  ),
                  wScale: meta.wScale ?? 1,
                  lScale: meta.lScale ?? 1,
                  rotateDeg: meta.rotateDeg ?? 0,
                  color: meta.color ?? '#fff',
                }))}
                onClick={onPick}
              />
            )
            : (
              <MaterialCategoryPicker<number>
                chosenOption={activeTextureId}
                options={myTextures.map(({ id, attributes: { name, preview } }) => ({
                  id,
                  name,
                  image: getImageWithDefault(preferImage([preview.data?.attributes.formats?.thumbnail?.url])),
                }))}
                onClick={onPickMyTexture}
              />
            )
        }
      </MenuItem>
    </>
  );
};
