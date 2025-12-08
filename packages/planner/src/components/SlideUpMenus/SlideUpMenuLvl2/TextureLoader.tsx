import { CenterWrapper, FileUploadArea, FileUploadAreaProps, ImportTabGuestContent, MainButton, MenuItem } from '@draw-house/ui/dist/components';
import assert from 'assert';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { CircularProgress } from '@mui/material';
import { openSnackbar, useCustomModelLoading, useUserResolved } from '../../../zustand';
import { lang } from '../../../lang';
import { importAllowedAsset2DExtensions } from '../../../constants';
import { guestSaveAndLogIn, removeFileExtension, uploadAsset } from '../../../utils';
import { requestToLoadCatalogData } from '../../../zustand/useCatalogData';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { usePaywallPopUpState } from '../../../zustand/usePaywallPopUpState';
import { isPrivilegedUser } from '../../../utils/isPrivilegedUser';
import { TextureAsset } from '../../../zod/TextureAsset';
import { userTexturesToTextureAssets } from '../../../utils/userTextureToTextureAsset';
import { getCustomModel } from '../../../services';

type TextureLoaderProps = {
  onPickMyTexture: (texture: ReturnType<typeof TextureAsset.parse>) => void;
};

export const TextureLoader: React.FC<TextureLoaderProps> = ({ onPickMyTexture }) => {
  const { customModelLoading } = useCustomModelLoading();
  const { fullCatalog } = useFullCatalog();
  const { user } = useUserResolved();

  const category = fullCatalog.find(e => e.isTextures === true);
  const modelCategoryId = isUndefined(category) ? null : category.id;

  return (
    user === 'guest'
      ? (
        <ImportTabGuestContent text={lang.importModel.loginToUnlockImport}>
          <MainButton
            text={lang.cabinet.logIn}
            onClick={guestSaveAndLogIn}
            variant='contained'
            width='md'
            height='md'
            padding='sm'
          />
        </ImportTabGuestContent>
      )
      : customModelLoading === true
        ? (
          <CenterWrapper>
            <CircularProgress />
          </CenterWrapper>
        )
        : (
          <MenuItem paddingVertical='md' paddingHorizontal>
            <FileUploadArea
              primaryText={(() => {
                assert(!isUndefined(category) && !isNull(category.userAssetMenuTexts), 'Something went wrong. |9ex30g|');

                return category.userAssetMenuTexts.uploadPaneTitle;
              })()}
              supportedFormatsText={`${lang.importModel.supportedFormats}:`}
              accept={importAllowedAsset2DExtensions.map(e => `.${e}`).join(',')}
              {
                ...!isPrivilegedUser(user)
                  ? {
                    onClick(e) {
                      e.preventDefault();
                      usePaywallPopUpState.setState({
                        paywallPopUpState: { type: 'paywall' },
                      });
                    },
                  } satisfies Partial<FileUploadAreaProps>
                  : {
                    async onFileSelect(file) {
                      if(file.size === 0) {
                        await openSnackbar({
                          type: 'warning',
                          message: lang.importModel.fileIsEmpty,
                        });
                      }

                      useCustomModelLoading.setState({ customModelLoading: true });
                      assert(!isNull(modelCategoryId), 'Something went wrong. |2nm1yt|');

                      try {
                        const res = await uploadAsset({
                          category: modelCategoryId,
                          file,
                          name: removeFileExtension(file.name),
                        });

                        switch(res.type) {
                          case 'ok': {
                            await openSnackbar({
                              type: 'success',
                              message: lang.importModel.successfullyUploaded,
                            });

                            await requestToLoadCatalogData(true);

                            const customModel = await getCustomModel(res.model.strapiId);
                            const [parsed] = userTexturesToTextureAssets([customModel], {
                              scale: 1,
                              mapsId: 1,
                            });
                            assert(!isUndefined(parsed), 'This should never happen. |c9bc08|');

                            onPickMyTexture(parsed);
                            break;
                          }
                          case 'paymentRequired':
                            usePaywallPopUpState.setState({
                              paywallPopUpState: { type: 'paywall' },
                            });
                            break;
                          default:
                            ((e: never) => e)(res);
                            throw new Error('Something went wrong. |8mr49s|');
                        }
                      } catch(e) {
                        console.error('Upload image |o39zt8|', e);
                        await openSnackbar({
                          type: 'warning',
                          message: lang.somethingWentWrong,
                        });
                      } finally {
                        useCustomModelLoading.setState({ customModelLoading: false });
                      }
                    },
                    async onFileReject({ showDefaultRejectionEffect }) {
                      showDefaultRejectionEffect();

                      const extensions = importAllowedAsset2DExtensions.map(e => e.toUpperCase()).join(', ');
                      await openSnackbar({
                        type: 'warning',
                        message: `${lang.importModel.supportedFormats}: ${extensions}`,
                      });
                    },
                  } satisfies Partial<FileUploadAreaProps>
              }
            />
          </MenuItem>
        )
  );
};
