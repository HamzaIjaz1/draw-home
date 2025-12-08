import { ObjEntries, ObjKeys } from '@arthurka/ts-utils';
import { renderMaterial } from '../../utils/renderMaterial';
import { withLoadedAppPage } from '../useAppPage/requestToLoad';
import { createProjectHash } from '../useProjectHash';
import { useModelMaterials } from './store';

useModelMaterials.subscribe(withLoadedAppPage(createProjectHash));
useModelMaterials.subscribe(withLoadedAppPage(async ({ modelMaterials }) => {
  if(ObjKeys(modelMaterials).length === 0) {
    return;
  }

  const images: Record<string, string> = {};
  for(const [name, material] of ObjEntries(modelMaterials)) {
    try {
      const previewImage = await renderMaterial(material);
      images[name] = previewImage;
    } catch(e) {
      console.error('Failed to generate preview image for material:', e);
      images[name] = '';
    }
  }

  const { modelMaterialPreviews } = useModelMaterials.getState();
  const isSame = ObjKeys(images).every(e => images[e] === modelMaterialPreviews[e]);

  if(isSame === false) {
    useModelMaterials.setState({
      modelMaterialPreviews: images,
    });
  }
}));
