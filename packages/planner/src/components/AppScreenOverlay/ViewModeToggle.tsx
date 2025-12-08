import { useEffect, useRef, useState } from 'react';
import { AnnotatedTabs, Tab, TabProps } from '@draw-house/ui/dist/components';
import { getNotUndefined, isNull, ObjKeys } from '@arthurka/ts-utils';
import { WithClassName } from '@draw-house/common/dist/utils';
import { DollhouseIcon, PersonWalkingIcon } from '@draw-house/ui/dist/components/Icons';
import { useTheme } from '@mui/material';
import { useCreationMode, useCreationModeConfig, useLevels, useOnboardingJourneyEvents, useViewMode } from '../../zustand';
import { Animations } from '../animations';
import { quickTourClassNames } from '../../constants';
import { onAutoSwitchToPointer } from '../../utils/creationModeOrigin';
import { onEmptySpacePointerDown } from '../../zustand/useBorderSphere';
import { LocalStorageService } from '../../services/LocalStorageService';
import { lang } from '../../lang';
import { useIsFirstPersonView } from '../../zustand/useIsFirstPersonView';
import { switchViewModeToggle, ViewModeToggleTab } from '../../utils/handlerHelpers/switchViewModeToggle';
import { useTouchScreen } from '../../zustand/useTouchScreen';
import { Hotkey } from '../Hotkey';
import { Tooltip } from '../Tooltip';
import { useIsDollhouseView } from '../../zustand/useIsDollhouseView';

const WalkIcon = () => (
  <PersonWalkingIcon color={useTheme().palette.text.secondary} />
);
const Dollhouse = () => (
  <DollhouseIcon color={useTheme().palette.text.secondary} />
);

const tabToLabel: Record<ViewModeToggleTab, TabProps & WithClassName> = {
  '2D': {
    label: '2D',
    Wrapper({ children }) {
      return (
        <Hotkey position='bottomCloser' label='2'>
          {children}
        </Hotkey>
      );
    },
  },
  '3D': {
    className: quickTourClassNames.tab3D,
    label: '3D',
    Wrapper({ children }) {
      return (
        <Hotkey position='bottomCloser' label='3'>
          {children}
        </Hotkey>
      );
    },
  },
  dollhouse: {
    label: <Dollhouse />,
    Wrapper({ children }) {
      return (
        <Hotkey position='bottomCloser' label='4'>
          {children}
        </Hotkey>
      );
    },
  },
  walk: {
    label: <WalkIcon />,
    Wrapper({ children }) {
      return (
        <Hotkey position='bottomCloser' label={lang.tooltips.switchViewModeToWalkthrough.hotkey}>
          <Tooltip position='bottom-to-left' content={lang.tooltips.switchViewModeToWalkthrough}>
            {children}
          </Tooltip>
        </Hotkey>
      );
    },
  },
};

export const ViewModeToggle: React.FC = () => {
  const { viewMode } = useViewMode();
  const { levels } = useLevels();
  const { isFirstPersonView } = useIsFirstPersonView();
  const { isTouchScreen } = useTouchScreen();
  const { creationMode } = useCreationMode();
  const { creationModeConfig } = useCreationModeConfig();
  const { onboardingJourneyEvents } = useOnboardingJourneyEvents();
  const { isDollhouseView } = useIsDollhouseView();

  const firstRoomCreated = onboardingJourneyEvents.includes('first-space-completed');
  const onboarding = LocalStorageService.infoPanel.onboarding.get();

  const [firstRoomCreatedAt, setFirstRoomCreatedAt] = useState(0);
  const [hint, setHint] = useState<'auto-pointer' | 'empty-space' | null>(null);
  const [hintAt, setHintAt] = useState(0);
  const [modeChangedAt, setModeChangedAt] = useState(0);
  const [muteFallback, setMuteFallback] = useState(false);
  const emptySpaceShownRef = useRef(false);

  const hintRef = useRef<typeof hint>(null);
  useEffect(() => {
    hintRef.current = hint;
  }, [hint]);

  useEffect(() => {
    if(firstRoomCreated === true && firstRoomCreatedAt === 0) {
      setFirstRoomCreatedAt(Date.now());
    }
  }, [firstRoomCreated, firstRoomCreatedAt]);

  useEffect(() => {
    setModeChangedAt(Date.now());
  }, [creationMode, viewMode, isFirstPersonView]);

  useEffect(() => {
    if(isNull(hintRef.current)) {
      setMuteFallback(false);
      emptySpaceShownRef.current = false;
    }
  }, [creationMode, viewMode, isFirstPersonView]);

  useEffect(() => (
    onAutoSwitchToPointer(() => {
      setHint('auto-pointer');
      setHintAt(Date.now());
      setMuteFallback(true);
    })
  ), []);

  useEffect(() => (
    onEmptySpacePointerDown(() => {
      const { creationMode } = useCreationMode.getState();
      if(creationMode !== 'pointer' || emptySpaceShownRef.current === true) {
        return;
      }

      emptySpaceShownRef.current = true;
      setHint('empty-space');
      setHintAt(Date.now());
      setMuteFallback(true);
    })
  ), []);

  const showingFinished = (
    true
      && onboarding !== 'finished'
      && firstRoomCreated === true
      && firstRoomCreatedAt !== 0
      && firstRoomCreatedAt >= modeChangedAt
  );
  const showingEmptySpace = (
    true
      && hint === 'empty-space'
      && hintAt !== 0
      && hintAt >= modeChangedAt
  );
  const showingAutoPointer = hint === 'auto-pointer';

  useEffect(() => {
    if(showingFinished === true || showingEmptySpace === false && showingAutoPointer === false) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setHint(null);
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [showingFinished, showingEmptySpace, showingAutoPointer]);

  const { annotation, annotationDetails } = (() => {
    if(showingFinished === true) {
      return lang.liveHints.firstRoomCompleted;
    }
    if(showingEmptySpace === true) {
      return lang.liveHints.emptySpaceClick;
    }
    if(showingAutoPointer === true) {
      return lang.liveHints.autoPointer;
    }
    if(muteFallback === true) {
      return { annotation: '', annotationDetails: '' };
    }

    if(onboarding !== 'finished') {
      switch(creationMode) {
        case 'walls':
          switch(creationModeConfig.mode) {
            case 'straightLine':
              return lang.liveHints.straightLine;
            case 'multipleStraightLines':
              return lang.liveHints.multipleStraightLine;
            default:
              ((e: never) => e)(creationModeConfig.mode);
              throw new Error('This should never happen. |sc4jom|');
          }
        case 'pointer':
          return lang.liveHints.selectMode;
        default:
          return { annotation: '', annotationDetails: '' };
      }
    }

    return { annotation: '', annotationDetails: '' };
  })();

  const availableTabs = ObjKeys(tabToLabel).filter(e => isTouchScreen === false || e !== 'walk');
  const availableLabels = availableTabs.map(e => tabToLabel[e]);
  const chosenTab = isDollhouseView === true ? 'dollhouse' : isFirstPersonView === true ? 'walk' : viewMode;
  const levelName = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |n8zxk5|').name;

  return (
    <Animations.fromTop>
      <AnnotatedTabs
        chosenTab={availableTabs.indexOf(chosenTab)}
        annotation={annotation}
        annotationDetails={annotationDetails}
        levelName={levelName}
        onClick={async index => {
          const tab = getNotUndefined(availableTabs[index], 'This should never happen. |oz6uix|');

          await switchViewModeToggle(tab);
        }}
      >
        {
          availableLabels.map((props, index) => (
            <Tab key={index} {...props} />
          ))
        }
      </AnnotatedTabs>
    </Animations.fromTop>
  );
};
