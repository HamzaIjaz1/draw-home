import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { Material, MenuItem } from '@draw-house/ui/dist/components';
import { closeSlideUpMenuLvl2, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useGlobalSettings } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { useStrapiAppConfigResolved } from '../../../zustand/useStrapiAppConfig';

export type LandTexturesProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'landTextures' }>;
};

export const LandTextures: React.FC<LandTexturesProps> = ({ slideUpMenuLvl2: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const landscapeTexture = useGlobalSettings(s => s.landscapeTexture);
  const { strapiAppConfig } = useStrapiAppConfigResolved();

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.visibilitySettings.land}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl2({});
      }}
      onBack={async () => {
        await closeSlideUpMenuLvl2({});
        showSlideUpMenuLvl1();
      }}
      header={null}
    >
      {
        strapiAppConfig.defaultTexturePalette.landTextures.map((e, i) => (
          <MenuItem key={i} divider>
            <Material
              text={e.attributes.name}
              image={e.attributes.maps.colorMap.data.attributes.url}
              withCheckmark={landscapeTexture === e.attributes.maps.colorMap.data.attributes.url}
              onClick={() => {
                useGlobalSettings.setState({
                  landscapeTexture: e.attributes.maps.colorMap.data.attributes.url,
                });
              }}
            />
          </MenuItem>
        ))
      }
    </SlideUpAndFloatingMenusWrapper>
  );
};
