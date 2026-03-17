import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { appearanceTokens } from './tokens';

const t = appearanceTokens;
const accent = t.colors.accent;
const black = t.colors.black;
const white = t.colors.white;
const gray100 = t.colors.gray100;
const gray200 = t.colors.gray200;
const gray400 = t.colors.gray400;
const gray600 = t.colors.gray600;
const gray700 = t.colors.gray700;
const grayBorder = t.colors.grayBorder;
const graySwatchBorder = t.colors.graySwatchBorder;

/** Root: full viewport, white background (Figma 1920×1080) */
export const Root = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${white};
  overflow: hidden;
`;

/** Grid overlay columns (60px cell, opacity 0.6) */
export const GridOverlay = styled('div')`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.6;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const GridCell = styled('div')<{ $cellSize?: number }>`
  width: ${({ $cellSize = 60 }) => $cellSize}px;
  height: ${({ $cellSize = 60 }) => $cellSize}px;
  flex-shrink: 0;
  background-image: var(--appearance-grid-image);
  background-size: cover;
`;

/** Left toolbar: Back, Save — 26px from left/top, 52×52, gap 62px */
export const ToolButton = styled('button')<{ $active?: boolean; $aiHighlight?: boolean }>`
  position: absolute;
  width: ${t.size.toolButton}px;
  height: ${t.size.toolButton}px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background-color: ${white};
  box-shadow: ${t.shadow.toolButton};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${({ $active }) => $active && `background-color: ${accent};`}
  ${({ $aiHighlight }) =>
    $aiHighlight &&
    css`
      border: 2px solid #fdfa31;
      box-shadow: ${t.shadow.aiButton};
    `}
`;

export const ToolButtonIcon = styled('span')`
  width: ${t.size.toolButtonIcon}px;
  height: ${t.size.toolButtonIcon}px;
  display: block;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Planning tabs: 406×54, bg #E9E9E9, rounded 16px, padding 6px, gap 6px */
export const PlanningTabsRoot = styled('div')`
  position: absolute;
  left: 50%;
  top: 81px;
  transform: translate(-50%, 0);
  width: ${t.size.planningTabsWidth}px;
  height: ${t.size.planningTabsHeight}px;
  background-color: ${gray200};
  border-radius: ${t.size.planningTabsBorderRadius}px;
  padding: ${t.size.planningTabsPadding}px;
  display: flex;
  gap: ${t.size.planningTabsGap}px;
  align-items: stretch;
`;

export const PlanningTab = styled('button')<{ $active?: boolean }>`
  flex: 1 0 0;
  min-width: 0;
  min-height: 0;
  padding: 8px 10px;
  border: none;
  border-radius: ${t.size.planningTabBorderRadius}px;
  background-color: ${({ $active }) => ($active ? white : 'transparent')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto, Arial;
  font-size: ${t.typography.tab.fontSize}px;
  font-weight: ${t.typography.tab.fontWeight};
  line-height: normal;
  color: ${black};
`;

export const PlanningTabIcon = styled('span')`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Level dropdown row */
export const LevelRow = styled('div')`
  position: absolute;
  left: 50%;
  top: 150px;
  transform: translate(-50%, 0);
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
`;

export const LevelLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: 17px;
  font-weight: 400;
  line-height: normal;
  color: ${gray400};
  white-space: nowrap;
`;

export const LevelDropdownIcon = styled('span')`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Compass: 24×84, left 42px, top 126px */
export const CompassWrap = styled('div')`
  position: absolute;
  left: 42px;
  top: 126px;
  width: 24px;
  height: 84px;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Center canvas / floor area placeholder */
export const CanvasArea = styled('div')`
  position: absolute;
  left: 379px;
  top: 304px;
  width: 426px;
  height: 428px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FloorRect = styled('div')`
  width: 426px;
  height: 428px;
  background-color: ${white};
  position: relative;
`;

export const RoofPlanningImage = styled('div')`
  position: absolute;
  left: 14px;
  top: 14px;
  width: 426px;
  height: 428px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const DimensionLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: 23.279px;
  font-weight: 400;
  line-height: normal;
  color: ${gray600};
`;

/** Undo/Redo row: left 26px, top 946px, gap 10px */
export const UndoRedoRow = styled('div')`
  position: absolute;
  left: 26px;
  top: 946px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

/** Center bottom button */
export const CenterBottomButton = styled('div')`
  position: absolute;
  left: 50%;
  margin-left: 30px;
  top: 946px;
  width: ${t.size.toolButton}px;
  height: ${t.size.toolButton}px;
`;

/** Right side toolbar column */
export const SideToolbar = styled('div')`
  position: absolute;
  right: 26px;
  top: 26px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export const SideToolbarSettings = styled('div')`
  width: ${t.size.toolButton}px;
  height: ${t.size.toolButton}px;
`;

export const SideToolbarButtons = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ToolButtonWithLabel = styled('div')`
  position: relative;
  width: ${t.size.toolButton}px;
  min-height: ${t.size.toolButton}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

export const ToolButtonLabel = styled(Typography)`
  position: absolute;
  bottom: -13px;
  left: 50%;
  transform: translate(-50%, 100%);
  font-family: Roboto, Arial;
  font-size: 10px;
  font-weight: 400;
  line-height: normal;
  color: ${white};
  white-space: nowrap;
`;

export const VisibilityBadge = styled('span')`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 17px;
  height: 17px;
  border-radius: 100px;
  background-color: ${white};
  box-shadow: ${t.shadow.toolButtonBadge};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto, Arial;
  font-size: 10px;
  font-weight: 500;
  color: ${accent};
`;

/** Hint button bottom-right */
export const HintButton = styled('div')`
  position: absolute;
  left: 1390px;
  top: 960px;
  width: 24px;
  height: 24px;
`;

/** Settings button top-right (before panel) */
export const TopRightSettings = styled('div')`
  position: absolute;
  right: 94px;
  top: 26px;
  width: ${t.size.toolButton}px;
  height: ${t.size.toolButton}px;
`;

/** ————— Appearance modal (right panel) — relative units for responsiveness ————— */
const r = t.rel;

export const AppearanceModal = styled('div')(({ theme }) => css`
  position: absolute;
  right: ${r.sidebarMarginV};
  bottom: ${r.sidebarMarginH};
  width: clamp(280px, ${r.sidebarWidth}, 390px);
  max-width: calc(100vw - 2 * 1.5vw);
  height: min(90vh, 972px);
  min-height: 30vh;
  background-color: ${white};
  border-radius: ${r.radiusLg};
  box-shadow: ${t.shadow.modal};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  ${theme.breakpoints.down('sm')} {
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 0;
    border-radius: ${r.radiusLg} ${r.radiusLg} 0 0;
  }
`);

/** Header: height in vh, padding in % */
export const AppearanceHeader = styled('div')`
  height: clamp(48px, ${r.headerHeight}, 54px);
  min-height: 48px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 ${r.headerPadding};
  box-sizing: border-box;
`;

export const AppearanceTitle = styled(Typography)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.2vw, 19px);
  font-weight: ${t.typography.title.fontWeight};
  line-height: normal;
  color: ${black};
  white-space: nowrap;
  pointer-events: none;
`;

/** Back / collapse: left-aligned */
export const HeaderCollapse = styled('button')`
  position: absolute;
  left: ${r.headerPadding};
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5vw 0.6vw;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const HeaderClose = styled('button')`
  position: absolute;
  right: ${r.headerPadding};
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: hidden;
`;

/** Figma Close button: outer stroke at 8.33% inset */
export const HeaderCloseIconWrap = styled('span')`
  position: absolute;
  inset: 8.33%;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Figma Close button: X at 38.22% inset */
export const HeaderCloseXWrap = styled('span')`
  position: absolute;
  inset: 38.22% 38.21% 38.21% 38.22%;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const AppearanceContent = styled('div')(({ theme }) => css`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 ${r.contentPadding} ${r.contentPadding};
  display: flex;
  flex-direction: column;
  gap: ${r.contentGap};
  width: 100%;
  max-width: 92%;
  margin: 0 auto;
  box-sizing: border-box;

  ${theme.breakpoints.down('sm')} {
    max-width: 100%;
    padding: 0 4% 4%;
  }
`);

/** Search row: search field + 3 icon buttons */
export const SearchRow = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: stretch;
  width: 100%;
  min-width: 0;
`;

export const SearchField = styled('div')`
  flex: 1 1 0;
  min-width: 0;
  min-height: clamp(36px, 4vh, 44px);
  padding: 2%;
  background-color: ${gray100};
  border-radius: ${r.radiusMd};
  display: flex;
  gap: ${r.gapSm};
  align-items: center;
`;

export const SearchIcon = styled('span')`
  width: clamp(20px, ${r.iconMd}, 24px);
  height: clamp(20px, ${r.iconMd}, 24px);
  flex-shrink: 0;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const SearchPlaceholder = styled(Typography)`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${gray400};
`;

export const SmallIconButton = styled('button')`
  width: clamp(36px, 4vw, 40px);
  height: clamp(36px, 4vw, 40px);
  padding: 0;
  border: none;
  border-radius: 100px;
  background-color: ${gray100};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  & img,
  & > span {
    width: clamp(20px, ${r.iconMd}, 24px);
    height: clamp(20px, ${r.iconMd}, 24px);
    display: block;
  }
`;

/** Recent / My Textures row */
export const RecentMyTexturesRow = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  gap: ${r.gapSm};
`;

export const RecentMyTexturesLeft = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: center;
  min-width: 0;
`;

export const RecentPill = styled('div')`
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 4px;
  height: clamp(24px, 2.6vh, 28px);
  background-color: ${accent};
  border-radius: 6px;
  min-width: clamp(80px, 8vw, 100px);
  justify-content: center;
  flex-shrink: 0;
`;

export const RecentPillText = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 700;
  line-height: normal;
  color: ${white};
  white-space: nowrap;
`;

export const RecentPillBadge = styled('span')`
  height: clamp(12px, 1.4vh, 15px);
  min-width: clamp(20px, 2vw, 26px);
  border-radius: 100px;
  background-color: ${white};
  border: 1px solid ${accent};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto, Arial;
  font-size: clamp(10px, 0.7vw, 11px);
  font-weight: 600;
  color: ${accent};
  line-height: 1.2;
`;

export const MyTexturesLabel = styled('div')`
  display: flex;
  gap: 0.2vw;
  align-items: center;
  min-width: 0;
`;

export const MyTexturesText = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${black};
  white-space: nowrap;
`;

export const MyTexturesBadge = styled('span')`
  width: clamp(12px, 1.4vw, 15px);
  height: clamp(12px, 1.4vw, 15px);
  border-radius: 100px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto, Arial;
  font-size: clamp(10px, 0.7vw, 11px);
  font-weight: 600;
  color: ${accent};
`;

/** Plus icon on the right of Recent/My Textures row (Figma: add action, dark gray) */
export const RecentRowAddButton = styled('button')`
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${black};
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/** Wrapper for the swatch row directly under Recent tab (Figma gap 16px) */
export const SwatchRowSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

/** Section title row (e.g. "Materials" + tabs) */
export const SectionTitleRow = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: center;
  width: 100%;
  min-width: 0;
  flex-wrap: wrap;
`;

export const SectionTitle = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: ${t.typography.sectionTitle.fontWeight};
  line-height: normal;
  color: ${black};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const ChipsRow = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: center;
`;

export const Chip = styled('button')<{ $active?: boolean }>`
  padding: 0.2vh 0.5vw;
  border: none;
  border-radius: ${r.radiusSm};
  background-color: ${({ $active }) => ($active ? accent : gray100)};
  cursor: pointer;
  font-family: Roboto, Arial;
  font-size: clamp(12px, 0.9vw, 14px);
  font-weight: ${t.typography.bodySmall.fontWeight};
  line-height: normal;
  color: ${({ $active }) => ($active ? white : accent)};
  white-space: nowrap;
`;

/** Swatch row (textures / materials) — horizontal scroll */
export const SwatchRow = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: flex-start;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  padding-bottom: 0.2vh;
  &::-webkit-scrollbar {
    height: 0.4vh;
  }
  &::-webkit-scrollbar-thumb {
    background: ${grayBorder};
    border-radius: 0.2vw;
  }
`;

export const SwatchItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.4vh;
  align-items: center;
  flex-shrink: 0;
  width: clamp(48px, 3.2vw, 61px);
`;

export const SwatchCircle = styled('div')<{
  $selected?: boolean;
  $border?: boolean;
}>`
  position: relative;
  width: clamp(40px, ${r.swatchSize}, 56px);
  height: clamp(40px, ${r.swatchSize}, 56px);
  border-radius: 100px;
  flex-shrink: 0;
  overflow: hidden;
  border: ${({ $selected, $border }) =>
    $selected ? `2px solid ${accent}` : $border !== false ? `0.8px solid ${grayBorder}` : 'none'};
  background-color: ${graySwatchBorder};
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SwatchLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(10px, 0.75vw, 12px);
  font-weight: ${t.typography.label.fontWeight};
  line-height: normal;
  color: ${gray700};
  text-align: center;
  width: 100%;
`;

/** Color overlay swatches (with hex labels) */
export const ColorSwatchRow = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: ${r.gapMd} ${r.gapSm};
  align-items: flex-start;
  width: 100%;
`;

export const ColorSwatchItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.4vh;
  align-items: center;
  width: clamp(52px, 3.4vw, 65px);
  flex-shrink: 0;
`;

export const ColorSwatchCircle = styled('div')<{ $selected?: boolean }>`
  width: clamp(40px, ${r.swatchSize}, 56px);
  height: clamp(40px, ${r.swatchSize}, 56px);
  border-radius: 100px;
  flex-shrink: 0;
  border: ${({ $selected }) => ($selected ? `2px solid ${accent}` : `0.8px solid ${grayBorder}`)};
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100px;
  }
`;

export const ColorSwatchLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(10px, 0.75vw, 12px);
  font-weight: ${t.typography.label.fontWeight};
  line-height: normal;
  color: ${gray700};
  text-align: center;
  width: min-content;
  min-width: 100%;
`;

/** Recent colors (small swatches) — horizontal scroll */
export const RecentColorsRow = styled('div')`
  display: flex;
  gap: ${r.gapSm};
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  padding-bottom: 0.2vh;
  scrollbar-width: thin;
`;

export const RecentColorDot = styled('div')<{ $border?: boolean }>`
  width: clamp(24px, ${r.swatchSmall}, 30px);
  height: clamp(24px, ${r.swatchSmall}, 30px);
  border-radius: 100px;
  flex-shrink: 0;
  border: ${({ $border }) => ($border ? '1.3px solid ' + grayBorder : '0.8px solid ' + grayBorder)};
`;

/** Divider */
export const DividerLine = styled('div')`
  width: 100%;
  height: 0;
  border: none;
  background: url(var(--appearance-divider-image)) no-repeat;
  background-size: 100% 1px;
`;

/** Preview section */
export const PreviewSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${r.contentGap};
  width: 100%;
`;

export const PreviewHeader = styled('div')`
  display: flex;
  gap: ${r.gapSm};
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 0;
  flex-wrap: wrap;
`;

export const PreviewCheckboxRow = styled('div')`
  display: flex;
  gap: ${r.gapSm};
  align-items: center;
  cursor: pointer;
`;

export const CompareLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${black};
  white-space: nowrap;
`;

export const PreviewArea = styled('div')`
  width: 100%;
  height: clamp(140px, 17vh, 187px);
  background-color: ${white};
  position: relative;
  overflow: hidden;
  border-radius: 0;
`;

export const PreviewInputRow = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: center;
`;

export const PreviewInputLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${gray700};
  white-space: nowrap;
`;

export const SmallInput = styled('div')`
  width: clamp(60px, 5vw, 80px);
  padding: 0.5vh 0.5vw;
  background-color: ${gray100};
  border-radius: ${r.radiusSm};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const SmallInputText = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${black};
  flex: 1;
  text-align: right;
`;

/** Transparency slider row */
export const TransparencyRow = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
  width: 100%;
`;

export const TransparencyLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${gray700};
  width: min-content;
  min-width: 100%;
`;

export const SliderRow = styled('div')`
  display: flex;
  gap: ${r.gapLg};
  align-items: center;
  width: 100%;
  min-width: 0;
`;

export const SliderTrack = styled('div')`
  height: 0.7vh;
  flex: 1;
  min-width: 25%;
  max-width: 75%;
  border-radius: 100px;
  border: 1px solid ${gray200};
  background: linear-gradient(to right, ${black}, ${white});
  position: relative;
`;

export const SliderInput = styled('div')`
  width: clamp(48px, 4vw, 60px);
  padding: 0.5vh 0.5vw;
  background-color: ${gray100};
  border-radius: ${r.radiusSm};
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** Blend mode / Name row */
export const FieldRow = styled('div')`
  display: flex;
  gap: ${r.gapLg};
  align-items: center;
  padding: 0.6vh 0;
  border-top: 1px solid ${gray200};
  border-bottom: 1px solid ${gray200};
  width: 100%;
  box-sizing: border-box;
`;

export const FieldLabel = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${gray700};
  width: clamp(80px, 8vw, 110px);
  flex-shrink: 0;
`;

export const FieldInput = styled('div')`
  flex: 1;
  min-width: 0;
  padding: 0.5vh 0.5vw;
  background-color: ${gray100};
  border-radius: ${r.radiusSm};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${r.gapMd};
`;

export const NameRow = styled('div')`
  display: flex;
  gap: ${r.gapMd};
  align-items: center;
  padding: 0.8vh 0;
  border-top: 1px solid ${gray200};
  border-bottom: 1px solid ${gray200};
  width: 100%;
  box-sizing: border-box;
`;

export const NameInput = styled('div')`
  padding: 0.5vh 0.5vw;
  background-color: ${gray100};
  border-radius: ${r.radiusSm};
  min-width: 0;
  flex: 1;
`;

export const NameInputText = styled(Typography)`
  font-family: Roboto, Arial;
  font-size: clamp(14px, 1.1vw, 17px);
  font-weight: 400;
  line-height: normal;
  color: ${black};
  text-align: right;
  max-width: 100%;
  display: block;
`;

/** Scrollbar track (visual) */
export const ScrollTrack = styled('div')`
  position: absolute;
  top: 8.7vh;
  right: 0.2vw;
  width: 2px;
  height: 18.5vh;
  background-color: ${gray400};
  border-radius: 100px;
`;
