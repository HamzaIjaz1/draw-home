/**
 * Appearance screen — Figma design 1400 screen_Appearance (node 22450:143414).
 * Pixel-perfect layout: grid canvas, left/top/bottom toolbars, right Appearance panel.
 */
import { WithClassName } from '@draw-house/common/dist/utils';
import { AppearancePanelContent } from './AppearancePanelContent';
import { appearanceScreenAssets as a } from './assets';
import { appearanceTokens as t } from './tokens';
import {
  AppearanceContent,
  AppearanceHeader,
  AppearanceModal,
  AppearanceTitle,
  CanvasArea,
  CenterBottomButton,
  CompassWrap,
  FloorRect,
  HeaderClose,
  HeaderCloseIconWrap,
  HeaderCloseXWrap,
  HeaderCollapse,
  LevelDropdownIcon,
  LevelLabel,
  LevelRow,
  PlanningTab,
  PlanningTabIcon,
  PlanningTabsRoot,
  Root,
  RoofPlanningImage,
  SideToolbar,
  SideToolbarButtons,
  SideToolbarSettings,
  ToolButton,
  ToolButtonIcon,
  ToolButtonLabel,
  ToolButtonWithLabel,
  TopRightSettings,
  UndoRedoRow,
  VisibilityBadge,
} from './styles';

export type AppearanceScreenProps = {
  /** Optional: URL for grid cell background (defaults to Figma asset) */
  gridImageUrl?: string;
};

function GridOverlay({ imageUrl }: { imageUrl: string }) {
  const cellSize = 60;
  const cellsPerRow = Math.ceil(1920 / cellSize) + 2;
  const rows = Math.ceil(1080 / cellSize) + 2;
  const total = cellsPerRow * rows;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.6,
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: cellSize,
            height: cellSize,
            flexShrink: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
          }}
        />
      ))}
    </div>
  );
}

export const AppearanceScreen = ({
  className,
  gridImageUrl = a.imgImage30,
}: AppearanceScreenProps & WithClassName) => {
  return (
    <Root className={className} style={{ ['--appearance-grid-image' as string]: `url(${gridImageUrl})` }}>
      <GridOverlay imageUrl={gridImageUrl} />

      {/* Left: Back */}
      <ToolButton type="button" style={{ left: 26, top: 26 }} aria-label="Back">
        <ToolButtonIcon>
          <img src={a.imgVector12} alt="" />
        </ToolButtonIcon>
      </ToolButton>
      {/* Left: Save */}
      <ToolButton type="button" style={{ left: 88, top: 26 }} aria-label="Save">
        <ToolButtonIcon>
          <img src={a.imgVector13} alt="" />
        </ToolButtonIcon>
      </ToolButton>

      {/* Top center: 2D / 3D / icon / person */}
      <PlanningTabsRoot>
        <PlanningTab $active>2D</PlanningTab>
        <PlanningTab>3D</PlanningTab>
        <PlanningTab>
          <PlanningTabIcon>
            <img src={a.imgGroup1171276661} alt="" />
          </PlanningTabIcon>
        </PlanningTab>
        <PlanningTab>
          <PlanningTabIcon>
            <img src={a.imgPerson} alt="" />
          </PlanningTabIcon>
        </PlanningTab>
      </PlanningTabsRoot>

      {/* Level 1 row */}
      <LevelRow>
        <PlanningTabIcon>
          <img src={a.imgGroup1171276361} alt="" style={{ transform: 'rotate(90deg)' }} />
        </PlanningTabIcon>
        <LevelLabel>Level 1</LevelLabel>
        <LevelDropdownIcon>
          <img src={a.imgVector23} alt="" style={{ transform: 'rotate(-90deg) scaleY(-1)' }} />
        </LevelDropdownIcon>
      </LevelRow>

      {/* Compass */}
      <CompassWrap>
        <img src={a.imgCompassDesktop} alt="" />
      </CompassWrap>

      {/* Center: floor/roof plan */}
      <CanvasArea>
        <FloorRect>
          <RoofPlanningImage style={{ backgroundImage: `url(${a.imgRoofPlanning})` }} />
        </FloorRect>
      </CanvasArea>

      {/* Bottom left: Undo, Redo */}
      <UndoRedoRow>
        <ToolButton type="button" aria-label="Undo">
          <ToolButtonIcon>
            <img src={a.imgVector14} alt="" />
          </ToolButtonIcon>
        </ToolButton>
        <ToolButton type="button" aria-label="Redo">
          <ToolButtonIcon>
            <img src={a.imgVector15} alt="" />
          </ToolButtonIcon>
        </ToolButton>
      </UndoRedoRow>

      {/* Bottom center */}
      <CenterBottomButton>
        <ToolButton type="button" aria-label="Center">
          <ToolButtonIcon>
            <img src={a.imgVector16} alt="" />
          </ToolButtonIcon>
        </ToolButton>
      </CenterBottomButton>

      {/* Right: Settings (top) */}
      <TopRightSettings>
        <ToolButton type="button" aria-label="Settings">
          <ToolButtonIcon>
            <img src={a.imgVector20} alt="" />
          </ToolButtonIcon>
        </ToolButton>
      </TopRightSettings>

      {/* Right: Side toolbar */}
      <SideToolbar>
        <SideToolbarSettings>
          <ToolButton type="button" aria-label="Settings">
            <ToolButtonIcon>
              <img src={a.imgVector20} alt="" />
            </ToolButtonIcon>
          </ToolButton>
        </SideToolbarSettings>
        <SideToolbarButtons>
          <ToolButton type="button" aria-label="Drawing">
            <ToolButtonIcon>
              <img src={a.imgVector13} alt="" />
            </ToolButtonIcon>
          </ToolButton>
          <ToolButtonWithLabel>
            <ToolButton type="button" $active aria-label="Select">
              <ToolButtonIcon>
                <img src={a.imgGroup1171276368} alt="" />
              </ToolButtonIcon>
            </ToolButton>
            <ToolButtonLabel>Select</ToolButtonLabel>
          </ToolButtonWithLabel>
          <ToolButton type="button" aria-label="Catalog">
            <ToolButtonIcon>
              <img src={a.imgVector1471} alt="" />
            </ToolButtonIcon>
          </ToolButton>
          <ToolButton type="button" aria-label="Upload">
            <ToolButtonIcon>
              <img src={a.imgVector19} alt="" />
            </ToolButtonIcon>
          </ToolButton>
          <ToolButton type="button" aria-label="Visibility" style={{ position: 'relative' }}>
            <ToolButtonIcon>
              <img src={a.imgVector13} alt="" />
            </ToolButtonIcon>
            <VisibilityBadge>6</VisibilityBadge>
          </ToolButton>
          <ToolButton type="button" aria-label="Annotation" style={{ opacity: 0.6 }}>
            <ToolButtonIcon>
              <img src={a.imgVector15} alt="" />
            </ToolButtonIcon>
          </ToolButton>
          <ToolButton type="button" $aiHighlight aria-label="AI">
            <ToolButtonIcon style={{ position: 'relative' }}>
              <img src={a.imgVector17} alt="" />
              <img src={a.imgVector18} alt="" style={{ position: 'absolute', inset: '4.17% 54.17% 54.17% 4.17%' }} />
            </ToolButtonIcon>
          </ToolButton>
        </SideToolbarButtons>
      </SideToolbar>

      {/* Hint button */}
      <button
        type="button"
        aria-label="Hint"
        style={{
          position: 'absolute',
          left: 1390,
          top: 960,
          width: 24,
          height: 24,
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
      >
        <img src={a.imgVector20} alt="" style={{ display: 'block', width: '100%', height: '100%' }} />
      </button>

      {/* Appearance modal */}
      <AppearanceModal>
        <AppearanceHeader>
          <AppearanceTitle>Appearance</AppearanceTitle>
          <HeaderCollapse type="button" aria-label="Collapse">
            <img src={a.imgVector9} alt="" style={{ transform: 'rotate(180deg) scaleY(-1)', width: 6, height: 12 }} />
          </HeaderCollapse>
          <HeaderClose type="button" aria-label="Close">
            <HeaderCloseIconWrap>
              <img src={a.imgVector10} alt="" />
            </HeaderCloseIconWrap>
            <HeaderCloseXWrap>
              <img src={a.imgVector11} alt="" />
            </HeaderCloseXWrap>
          </HeaderClose>
        </AppearanceHeader>
        <AppearanceContent>
          <AppearancePanelContent />
        </AppearanceContent>
      </AppearanceModal>
    </Root>
  );
};
