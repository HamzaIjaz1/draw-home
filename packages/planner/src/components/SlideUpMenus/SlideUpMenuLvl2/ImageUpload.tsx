import { CenterWrapper, FileUploadArea, FileUploadAreaProps, ImportTabGuestContent, MainButton, MenuItem } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import assert from 'assert';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { CircularProgress } from '@mui/material';
import { closeSlideUpMenuLvl2, openSnackbar, showSlideUpMenuLvl1, SlideUpMenuLvl2Store, useCustomModelLoading, useUserResolved } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { importAllowedAsset2DExtensions } from '../../../constants';
import { guestSaveAndLogIn, removeFileExtension, uploadAsset } from '../../../utils';
import { requestToLoadCatalogData } from '../../../zustand/useCatalogData';
import { catalogCustomModelClick } from '../../../utils/catalogCustomModelClick';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { usePaywallPopUpState } from '../../../zustand/usePaywallPopUpState';
import { isPrivilegedUser } from '../../../utils/isPrivilegedUser';

export type ImageUploadProps = {
  slideUpMenuLvl2: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'imageUpload' }>;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  slideUpMenuLvl2: {
    isOpened,
    modelCategoryId,
  },
}) => {
  checkIsNotNever(isOpened);

  const { customModelLoading } = useCustomModelLoading();
  const { fullCatalog } = useFullCatalog();
  const { user } = useUserResolved();

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.imageUpload.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl2({});
      }}
      onBack={async () => {
        await closeSlideUpMenuLvl2({});
        showSlideUpMenuLvl1();
      }}
    >
      {
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
                  primaryText={
                    isOpened === false
                      ? ''
                      : (() => {
                        const category = fullCatalog.find(e => e.id === modelCategoryId);
                        assert(!isUndefined(category) && !isNull(category.userAssetMenuTexts), 'Something went wrong. |22f25r|');

                        return category.userAssetMenuTexts.uploadPaneTitle;
                      })()
                  }
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
                          assert(!isNull(modelCategoryId), 'Something went wrong. |jy934t|');

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

                                const category = fullCatalog.find(e => e.id === modelCategoryId);
                                assert(!isUndefined(category), 'Something went wrong. |fe6aur|');

                                catalogCustomModelClick({
                                  id: res.model.id,
                                  childrenType: res.model.category.childrenType,
                                  targetModels: category.items,
                                });

                                await closeSlideUpMenuLvl2({});
                                break;
                              }
                              case 'paymentRequired':
                                usePaywallPopUpState.setState({
                                  paywallPopUpState: { type: 'paywall' },
                                });
                                break;
                              default:
                                ((e: never) => e)(res);
                                throw new Error('Something went wrong. |b2hq1c|');
                            }
                          } catch(e) {
                            console.error('Upload image |fgq6d4|', e);
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
      }
    </SlideUpAndFloatingMenusWrapper>
  );
};
