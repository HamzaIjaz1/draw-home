import { useCallback, useState } from 'react';
import styled from 'styled-components';
import assert from 'assert';
import { isNull, isUndefined, ObjEntries } from '@arthurka/ts-utils';
import { DialogActions, Divider, ExportTabFormatPicker, IconButton, PublicLink, ShareExportPopUpContentWrapper, Tab, Tabs } from '@draw-house/ui/dist/components';
import { menuHorizontalGutterWidth } from '@draw-house/ui/dist/utils/styles';
import { AppPagePopUp } from '../AppPagePopUp';
import { lang } from '../../lang';
import { defaultProjectName, useGlobalSettings, useR3FDataResolved, useUserResolved, useViewMode } from '../../zustand';
import { filenamify, removeTrailingSlash, takeScreenshot } from '../../utils';
import { exportScene } from '../../utils/sceneExport';
import { queryParams } from '../../services';
import { useIsExportPopupOpened } from '../../zustand/useIsExportPopupOpened';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { usePaywallPopUpState } from '../../zustand/usePaywallPopUpState';
import { isPrivilegedUser } from '../../utils/isPrivilegedUser';

const EXPORT_FORMATS = ['PNG', 'GLTF', 'GLB'] as const;

type ExportContentProps = {
  onClose: () => void;
};

const ExportContent: React.FC<ExportContentProps> = ({ onClose }) => {
  const [format, setFormat] = useState<typeof EXPORT_FORMATS[number]>('PNG');

  return (
    <>
      <ExportTabFormatPicker
        title={lang.export.formatTitle}
        chosenFormat={format}
        formats={EXPORT_FORMATS}
        onChange={setFormat}
      />
      <Divider />
      <DialogActions
        paddingHorizontal
        primaryActionText={lang.export.exportButtonTitle}
        onPrimaryAction={async () => {
          const handlers: Record<typeof format, () => void | Promise<void>> = {
            async PNG() {
              const { projectName } = useGlobalSettings.getState();
              const blob = await takeScreenshot('full-screen');
              const link = document.createElement('a');
              const url = window.URL.createObjectURL(blob);

              link.href = url;
              link.download = filenamify(projectName.trim() === '' ? defaultProjectName : projectName);

              document.body.appendChild(link);
              link.click();
              link.remove();
              window.URL.revokeObjectURL(url);
            },
            GLTF() {
              const { user } = useUserResolved.getState();
              if(user === 'guest' || !isPrivilegedUser(user)) {
                usePaywallPopUpState.setState({
                  paywallPopUpState: { type: 'paywall' },
                });
                return;
              }

              const { projectName } = useGlobalSettings.getState();
              const { scene } = useR3FDataResolved.getState();

              useViewMode.setState({ viewMode: '3D' });

              exportScene({
                format: 'GLTF',
                projectName,
                scene,
              });
            },
            GLB() {
              const { user } = useUserResolved.getState();
              if(user === 'guest' || !isPrivilegedUser(user)) {
                usePaywallPopUpState.setState({
                  paywallPopUpState: { type: 'paywall' },
                });
                return;
              }

              const { projectName } = useGlobalSettings.getState();
              const { scene } = useR3FDataResolved.getState();

              useViewMode.setState({ viewMode: '3D' });

              exportScene({
                format: 'GLB',
                projectName,
                scene,
              });
            },
          };

          await handlers[format]();
        }}
        secondaryActionText={lang.cancel}
        onSecondaryAction={onClose}
      />
    </>
  );
};

const InstructionText = styled.span`
  padding: 0 ${menuHorizontalGutterWidth}px;
`;

// Don't memo this component to ensure window.location.href stays up to date.
// With this naive approach url won't react to programmatic changes
// to location (like pushState).
const ShareContent: React.FC = () => {
  const projectId = queryParams.projectId.get();

  return (
    isNull(projectId)
      ? <InstructionText>Save the project to enable sharing</InstructionText>
      : (
        <PublicLink
          title={lang.share.publicLinkTitle}
          url={removeTrailingSlash(window.location.href)}
          buttonText={lang.share.copyLinkButtonTitle}
          copySuccessStatusText={lang.share.copySuccessStatusText}
        />
      )
  );
};

type Tab = 'export' | 'share';

type TabData = {
  popupTitle: string;
  tabTitle: string;
  content: JSX.Element;
};

export const ShareButton: React.FC = () => {
  const { isExportPopupOpened } = useIsExportPopupOpened();
  const [activeTab, setActiveTab] = useState<Tab>('export');
  const close = useCallback(() => {
    useIsExportPopupOpened.setState({ isExportPopupOpened: false });
  }, []);

  const tabs: Record<Tab, TabData> = {
    export: {
      popupTitle: lang.export.popupTitle,
      tabTitle: lang.export.tabTitle,
      content: <ExportContent onClose={close} />,
    },
    share: {
      popupTitle: lang.share.popupTitle,
      tabTitle: lang.share.tabTitle,
      content: <ShareContent />,
    },
  };

  const { popupTitle, content } = tabs[activeTab];
  const tabEntries = ObjEntries(tabs);

  return (
    <>
      <Hotkey position='bottom' label={lang.tooltips.shareButton.hotkey}>
        <Tooltip position='bottom-to-left' content={lang.tooltips.shareButton}>
          <IconButton
            icon='share'
            state={isExportPopupOpened === true ? 'active' : 'default'}
            onClick={() => {
              useIsExportPopupOpened.setState({
                isExportPopupOpened: isExportPopupOpened === false,
              });
            }}
          />
        </Tooltip>
      </Hotkey>
      <AppPagePopUp open={isExportPopupOpened} onClose={close}>
        <ShareExportPopUpContentWrapper title={popupTitle} onClose={close}>
          <Tabs
            stretch
            chosenTab={tabEntries.findIndex(([tab]) => tab === activeTab)}
            onClick={index => {
              const entry = tabEntries[index];
              assert(!isUndefined(entry), 'This should never happen. |3oux5t|');

              setActiveTab(entry[0]);
            }}
          >
            {
              tabEntries.map(([, { tabTitle }]) => (
                <Tab key={tabTitle} label={tabTitle} />
              ))
            }
          </Tabs>
          {content}
        </ShareExportPopUpContentWrapper>
      </AppPagePopUp>
    </>
  );
};
