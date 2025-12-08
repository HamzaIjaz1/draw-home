import { Material } from 'three';
import { ObjEntries } from '@arthurka/ts-utils';
import { renderMaterial } from './renderMaterial';

export const generateMaterialPreviewImages = async (materials: Record<string, Material>) => {
  const images: Record<string, string> = {};
  for(const [id, material] of ObjEntries(materials)) {
    try {
      const previewImage = await renderMaterial(material);
      images[id] = previewImage;
    } catch(e) {
      console.error('Failed to generate preview image for material:', e);
      images[id] = '';
    }
  }

  return images;
};
