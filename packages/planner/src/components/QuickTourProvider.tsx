import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { styled, useTheme } from '@mui/material';
import { MainButton, QuickTourContent } from '@draw-house/ui/dist/components';
import { TourProps, TourProvider } from '@reactour/tour';
import assert from 'assert';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { CreationModeStore, useCreationMode, useFeatureMapState, useViewMode, ViewModeStore } from '../zustand';
import { QuickTourDataStore, useQuickTourDataResolved } from '../zustand/useQuickTourData';
import { lang } from '../lang';
import { quickTourClassNames } from '../constants';
import { Resolved } from '../utils/isResolved';
import { LocalStorageService } from '../services/LocalStorageService';
import { useIsWallDrawToolbarShown } from '../zustand/useIsWallDrawToolbarShown';

let savedStoreData: ViewModeStore & CreationModeStore | null = null;

export const onOpen = () => {
  const { viewMode } = useViewMode.getState();
  const { creationMode } = useCreationMode.getState();

  savedStoreData = {
    viewMode,
    creationMode,
  };
};

export const onClose = () => {
  LocalStorageService.quickTour.isCompleted.set(true);

  assert(!isNull(savedStoreData), 'Something went wrong. |n6s9mq|');

  useViewMode.setState({ viewMode: savedStoreData.viewMode });
  useCreationMode.setState({ creationMode: savedStoreData.creationMode });

  useFeatureMapState.setState({ featureMapState: 'show' });
};

const OutOfBoundsDummy = styled('div')`
  visibility: hidden;
  position: absolute;
  top: 200vh;
  left: 200vw;
`;

export const QuickTourWelcomeStepAnchor = () => (
  <OutOfBoundsDummy className={quickTourClassNames.welcome} />
);

const NavigationContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  & > button:last-of-type {
    margin-left: auto;
  }
`;

const Navigation: NonNullable<NonNullable<TourProps['components']>['Navigation']> = ({
  steps,
  currentStep,
  setCurrentStep,
  setIsOpen,
}) => {
  const theme = useTheme();

  const isLastStep = currentStep === steps.length - 1;

  return (
    <NavigationContainer>
      {
        currentStep > 0 && (
          <MainButton
            text={lang.quickTour.previous}
            height='md'
            variant='text'
            textColors={{ default: theme.palette.primary.main }}
            onClick={() => {
              setCurrentStep(s => s - 1);
            }}
          />
        )
      }
      <MainButton
        text={isLastStep === false ? lang.quickTour.next : lang.quickTour.finish}
        height='md'
        onClick={() => {
          if(isLastStep === true) {
            setIsOpen(false);
            onClose();
          } else {
            setCurrentStep(s => s + 1);
          }
        }}
      />
    </NavigationContainer>
  );
};

const Content: NonNullable<TourProps['steps']>[number]['content'] = ({ currentStep, setIsOpen }) => {
  const { quickTourData } = useQuickTourDataResolved();
  const {
    title,
    description,
    video,
    image,
  } = getNotUndefined(quickTourData[currentStep], 'This should never happen. |bhj77y|');

  return (
    <QuickTourContent
      badgeText={`${currentStep + 1}/${quickTourData.length}`}
      title={title}
      description={description}
      media={
        !isNull(video)
          ? { type: 'video', src: video }
          : !isNull(image)
            ? { type: 'image', src: image }
            : null
      }
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
    />
  );
};

const actions: Record<Resolved<QuickTourDataStore['quickTourData']>[number]['connectTo'], () => void> = {
  welcome() {},
  drawLineTool() {
    useCreationMode.setState({ creationMode: 'walls' });
    useIsWallDrawToolbarShown.setState({ isWallDrawToolbarShown: true });
  },
  tab3D() {
    useViewMode.setState({ viewMode: '3D' });
  },
  menuPointer() {
    useCreationMode.setState({ creationMode: 'pointer' });
  },
};

export const QuickTourProvider: React.FCWithChildren = ({ children }) => {
  const theme = useTheme();
  const { quickTourData } = useQuickTourDataResolved();

  return (
    <TourProvider
      steps={quickTourData.map((e): NonNullable<TourProps['steps']>[number] => ({
        selector: `.${quickTourClassNames[e.connectTo]}`,
        content: Content,
        action: actions[e.connectTo],
        position: e.connectTo === 'welcome' ? 'center' : undefined,
      }))}
      components={{
        Navigation,
        Close: () => null,
      }}
      showBadge={false}
      showDots={false}
      padding={{ mask: 6 }}
      // Warn: empty function overrides default behavior
      onClickMask={() => {}}
      styles={{
        maskWrapper: base => ({
          ...base,
          zIndex: specialZIndexTop,
          opacity: 0.4,
        }),
        maskArea: base => ({ ...base, rx: 30 }),
        popover: base => ({
          ...base,
          '--reactour-accent': theme.palette.primary.main,
          zIndex: specialZIndexTop,
          borderRadius: 16,
          maxWidth: '100vw',
          padding: '4px 4px 14px',
        }),
      }}
    >
      {children}
    </TourProvider>
  );
};
