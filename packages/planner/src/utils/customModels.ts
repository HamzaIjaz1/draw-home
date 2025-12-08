import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { StrapiCustomModelCategoryId } from '@draw-house/common/dist/brands';
import { createCustomModel } from '../services';
import { useNewCustomModelUploadData } from '../zustand';
import { CustomModel } from '../zod';

type UploadAssetParam = {
  file: File;
  name: string;
  category: StrapiCustomModelCategoryId;
};
type UploadAssesReturn = (
  | {
    type: 'ok';
    model: CustomModel;
  }
  | {
    type: 'paymentRequired';
  }
);

export const uploadAsset = async ({ file, name, category }: UploadAssetParam): Promise<UploadAssesReturn> => {
  const formData = new FormData();

  formData.set('files.model', file);
  formData.set('data', JSON.stringify({
    name,
    category,
    order: 0,
  }));

  const res = await createCustomModel(formData);
  if(res.success === true) {
    return {
      type: 'ok',
      model: res.data,
    };
  }

  switch(res.error.status) {
    case 402:
      return {
        type: 'paymentRequired',
      };
    default:
      ((e: never) => e)(res.error.status);
      throw new Error('This should never happen. |v9jif1|');
  }
};

export const uploadCustomModel = () => {
  const { newCustomModelUploadData } = useNewCustomModelUploadData.getState();
  assert(!isNull(newCustomModelUploadData) && !isNull(newCustomModelUploadData.category), 'This should never happen. |5w6455|');

  return uploadAsset({
    category: newCustomModelUploadData.category,
    file: newCustomModelUploadData.file,
    name: newCustomModelUploadData.name,
  });
};
