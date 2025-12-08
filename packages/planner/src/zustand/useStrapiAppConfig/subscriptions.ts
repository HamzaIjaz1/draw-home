import { preloadTexture } from '../../utils/helpers';
import { useStrapiAppConfig } from './store';
import { isResolved } from '../../utils/isResolved';

useStrapiAppConfig.subscribe(({ strapiAppConfig }) => {
  if(!isResolved(strapiAppConfig)) {
    return;
  }

  preloadTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.wallTextureCenter.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.wallTextureBack.attributes.maps);

  preloadTexture(strapiAppConfig.defaultTexturePalette.roofTextureTop.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.roofTextureEdge.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.roofTextureBottom.attributes.maps);

  preloadTexture(strapiAppConfig.defaultTexturePalette.floorTextureTop.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.floorTextureEdge.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.floorTextureBottom.attributes.maps);

  preloadTexture(strapiAppConfig.defaultTexturePalette.ceilingTextureTop.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.ceilingTextureEdge.attributes.maps);
  preloadTexture(strapiAppConfig.defaultTexturePalette.ceilingTextureBottom.attributes.maps);
});
