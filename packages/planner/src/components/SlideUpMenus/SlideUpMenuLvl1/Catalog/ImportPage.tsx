import { CenterWrapper, FileUploadArea, FileUploadAreaProps, ImportTabGuestContent, MainButton, MenuItem, SelectedUploadItem, TextField, TextOptionRow } from '@draw-house/ui/dist/components';
import { useCheckDnDSupport } from '@draw-house/ui/dist/hooks';
import { getNotUndefined, isArrayIncludes, isArrayLength, isNull } from '@arthurka/ts-utils';
import { CircularProgress } from '@mui/material';
import { lang } from '../../../../lang';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, openSnackbar, useCustomModelLoading, useNewCustomModelUploadData, useUserResolved } from '../../../../zustand';
import { Animations } from '../../../animations';
import { requestToLoadCatalogData, useCatalogDataResolved } from '../../../../zustand/useCatalogData';
import { getFileExtension, guestSaveAndLogIn, removeFileExtension, uploadCustomModel } from '../../../../utils';
import { useFullCatalog } from '../../../../customHooks/useFullCatalog';
import { importAllowedAsset2DExtensions, importAllowedAsset3DExtensions } from '../../../../constants';
import { isCategoryForUpload } from '../../../../utils/isCategoryForUpload';
import { usePaywallPopUpState } from '../../../../zustand/usePaywallPopUpState';
import { isPrivilegedUser } from '../../../../utils/isPrivilegedUser';

const allowedAssetExtensions = [...importAllowedAsset3DExtensions, ...importAllowedAsset2DExtensions] as const;

export type ImportPageProps = {
  onClose: () => void;
};

export const ImportPage: React.FC<ImportPageProps> = ({ onClose }) => {
  const { customModelLoading } = useCustomModelLoading();
  const { newCustomModelUploadData } = useNewCustomModelUploadData();
  const { isDnDSupported } = useCheckDnDSupport();
  const { catalogData } = useCatalogDataResolved();
  const { user } = useUserResolved();
  const { fullCatalog } = useFullCatalog();

  return (
    <Animations.collapseBlock key={`${customModelLoading} ${isNull(newCustomModelUploadData)}`}>
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

                            const ext = getFileExtension(file.name);
                            const uploadCategories = fullCatalog.filter(isCategoryForUpload(ext));

                            useNewCustomModelUploadData.setState({
                              newCustomModelUploadData: {
                                file,
                                name: removeFileExtension(file.name),
                                category: isArrayLength(uploadCategories, '===', 1) ? uploadCategories[0].id : null,
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
                const categoryName = (
                  isNull(newCustomModelUploadData.category)
                    ? lang.none
                    : getNotUndefined(catalogData.categories.find(e => e.id === newCustomModelUploadData.category), 'This should never happen. |rc024s|').name
                );
                const fileExtension = getFileExtension(newCustomModelUploadData.file.name);

                if(!isArrayIncludes(allowedAssetExtensions, fileExtension)) {
                  useNewCustomModelUploadData.setState({ newCustomModelUploadData: null });

                  return <div />;
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
                    <MenuItem divider>
                      <TextOptionRow
                        label={lang.slideUpMenus.catalog.category}
                        value={categoryName}
                        onClick={async () => {
                          await closeSlideUpMenuLvl1({ preserveState: true });
                          await openSlideUpMenuLvl2({
                            type: 'newCustomModelCategoryPicker',
                            isOpened: true,
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
                          onClose();
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
                                onClose();
                                break;
                              case 'paymentRequired':
                                usePaywallPopUpState.setState({
                                  paywallPopUpState: { type: 'paywall' },
                                });
                                break;
                              default:
                                ((e: never) => e)(res);
                                throw new Error('Something went wrong. |y28ivj|');
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
    </Animations.collapseBlock>
  );
};
