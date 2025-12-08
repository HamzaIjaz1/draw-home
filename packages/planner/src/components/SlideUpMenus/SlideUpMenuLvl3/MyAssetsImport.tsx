import { CenterWrapper, FileUploadArea, FileUploadAreaProps, ImportTabGuestContent, MainButton, MenuItem, SelectedUploadItem, TextField } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { CircularProgress } from '@mui/material';
import assert from 'assert';
import { isArrayIncludes, isNull, isUndefined } from '@arthurka/ts-utils';
import { useCheckDnDSupport } from '@draw-house/ui/dist/hooks';
import { closeSlideUpMenuLvl3, openSnackbar, showSlideUpMenuLvl2, SlideUpMenuLvl3Store, useCustomModelLoading, useNewCustomModelUploadData, useUserResolved } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { getFileExtension, guestSaveAndLogIn, removeFileExtension, uploadCustomModel } from '../../../utils';
import { importAllowedAsset2DExtensions, importAllowedAsset3DExtensions } from '../../../constants';
import { requestToLoadCatalogData } from '../../../zustand/useCatalogData';
import { useFullCatalog } from '../../../customHooks/useFullCatalog';
import { usePaywallPopUpState } from '../../../zustand/usePaywallPopUpState';
import { isPrivilegedUser } from '../../../utils/isPrivilegedUser';

export type MyAssetsImportProps = {
  slideUpMenuLvl3: Extract<SlideUpMenuLvl3Store['slideUpMenuLvl3'], { type: 'myAssetsImport' }>;
};

export const MyAssetsImport: React.FC<MyAssetsImportProps> = ({
  slideUpMenuLvl3: {
    isOpened,
    modelCategoryId,
  },
}) => {
  checkIsNotNever(isOpened);
  assert(!isNull(modelCategoryId), 'Something went wrong. |z53ypa|');

  const { user } = useUserResolved();
  const { isDnDSupported } = useCheckDnDSupport();
  const { customModelLoading } = useCustomModelLoading();
  const { newCustomModelUploadData } = useNewCustomModelUploadData();
  const { fullCatalog } = useFullCatalog();

  const category = fullCatalog.find(e => e.id === modelCategoryId);
  assert(!isUndefined(category), 'Something went wrong. |v2tc5a|');
  assert(category.userUpload !== 'forbidden', 'Something went wrong. |27yo78|');

  const allowedAssetExtensions = (
    category.childrenType === 'assets-2d' ? importAllowedAsset2DExtensions : importAllowedAsset3DExtensions
  );

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.import}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl3({});
      }}
      onBack={async () => {
        await closeSlideUpMenuLvl3({});
        showSlideUpMenuLvl2();
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
            : isNull(newCustomModelUploadData)
              ? (
                <MenuItem paddingVertical='md' paddingHorizontal>
                  <FileUploadArea
                    primaryText={
                      isDnDSupported === true
                        ? lang.importModel.dragOrUploadObjects
                        : lang.importModel.uploadObjectsFromFiles
                    }
                    supportedFormatsText={`${lang.importModel.supportedFormats}:`}
                    accept={allowedAssetExtensions.map(e => `.${e}`).join(',')}
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
                              return;
                            }

                            useNewCustomModelUploadData.setState({
                              newCustomModelUploadData: {
                                file,
                                name: removeFileExtension(file.name),
                                category: modelCategoryId,
                              },
                            });
                          },
                          async onFileReject({ showDefaultRejectionEffect }) {
                            showDefaultRejectionEffect();
                            await openSnackbar({
                              type: 'warning',
                              message: `${lang.importModel.supportedFormats}: ${allowedAssetExtensions.map(e => e.toUpperCase()).join(', ')}`,
                            });
                          },
                        } satisfies Partial<FileUploadAreaProps>
                    }
                  />
                </MenuItem>
              )
              : (() => {
                const fileExtension = getFileExtension(newCustomModelUploadData.file.name);

                if(!isArrayIncludes(allowedAssetExtensions, fileExtension)) {
                  useNewCustomModelUploadData.setState({ newCustomModelUploadData: null });

                  return null;
                }

                return (
                  <>
                    <MenuItem paddingVertical='md'>
                      <SelectedUploadItem
                        name={removeFileExtension(newCustomModelUploadData.file.name)}
                        sizeBytes={newCustomModelUploadData.file.size}
                        extension={`.${fileExtension}`}
                      />
                    </MenuItem>
                    <MenuItem divider paddingHorizontal>
                      <TextField
                        type='text'
                        label={lang.importModel.name}
                        size='lg'
                        value={newCustomModelUploadData.name}
                        onChange={name => {
                          useNewCustomModelUploadData.setState({
                            newCustomModelUploadData: {
                              ...newCustomModelUploadData,
                              name,
                            },
                          });
                        }}
                      />
                    </MenuItem>
                    <MenuItem spaceBetween paddingVertical='lg' paddingHorizontal>
                      <MainButton
                        text={lang.cancel}
                        variant='text'
                        width='lg'
                        height='md'
                        onClick={() => {
                          useNewCustomModelUploadData.setState({ newCustomModelUploadData: null });
                        }}
                      />
                      <MainButton
                        text={lang.import}
                        width='lg'
                        height='md'
                        shadowless
                        state={isNull(newCustomModelUploadData.category) ? 'disabled' : 'default'}
                        onClick={async () => {
                          useCustomModelLoading.setState({ customModelLoading: true });

                          try {
                            const res = await uploadCustomModel();
                            useNewCustomModelUploadData.setState({ newCustomModelUploadData: null });

                            switch(res.type) {
                              case 'ok':
                                await openSnackbar({
                                  type: 'success',
                                  message: lang.importModel.successfullyUploaded,
                                });

                                await requestToLoadCatalogData(true);
                                break;
                              case 'paymentRequired':
                                usePaywallPopUpState.setState({
                                  paywallPopUpState: { type: 'paywall' },
                                });
                                break;
                              default:
                                ((e: never) => e)(res);
                                throw new Error('Something went wrong. |1h0764|');
                            }
                          } catch(e) {
                            await openSnackbar({
                              type: 'warning',
                              message: lang.somethingWentWrong,
                            });
                          } finally {
                            useCustomModelLoading.setState({ customModelLoading: false });
                          }
                        }}
                      />
                    </MenuItem>
                  </>
                );
              })()
      }
    </SlideUpAndFloatingMenusWrapper>
  );
};
