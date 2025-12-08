import { AllHotkeysLegend } from '@draw-house/ui/dist/components';
import { CameraIcon, HouseWithChimneyIcon, KeyboardAndMouseIcon, PersonWalkingIcon } from '@draw-house/ui/dist/components/Icons';
import { useTheme } from '@mui/material';
import { useIsHotkeysShown } from '../zustand/useIsHotkeysShown';
import { lang } from '../lang';

export const HotkeysPopUp: React.FC = () => {
  const theme = useTheme();
  const { isHotkeysShown } = useIsHotkeysShown();

  return isHotkeysShown === true && (
    <AllHotkeysLegend.Root>
      <AllHotkeysLegend.Block
        title={lang.hotkeys.globalTitle}
        icon={<KeyboardAndMouseIcon color={theme.palette.text.secondary} />}
        lines={[
          `Alt, / = ${lang.hotkeys.showHotkeys}`,
          `Del = ${lang.hotkeys.deleteSelected}`,
          `Esc = ${lang.hotkeys.abandonAction}`,
          `Ctrl+C/Ctrl+V = ${lang.hotkeys.copy}/${lang.hotkeys.paste}`,
          `Tab = ${lang.hotkeys.switch2D3D}`,
          `Shift+Draw = ${lang.hotkeys.noGridSnap}`,
          `Ctrl+Draw = ${lang.hotkeys.noAxisSnap}`,
          `Ctrl+Shift+Draw = ${lang.hotkeys.noGridAndGridSnap}`,
          `PgUp = ${lang.hotkeys.moveLvlUp}`,
          `PgDn = ${lang.hotkeys.moveLvlDown}`,
          `X = ${lang.hotkeys.unselectObject}`,
        ]}
      />
      <AllHotkeysLegend.Block
        title={lang.hotkeys.quickAccessTitle}
        icon={<HouseWithChimneyIcon color={theme.palette.text.secondary} />}
        lines={[
          `Shift + D = ${lang.hotkeys.door}`,
          `Shift + W = ${lang.hotkeys.window}`,
        ]}
      />
      <AllHotkeysLegend.Block
        title={lang.hotkeys.cameraTitle}
        icon={<CameraIcon color={theme.palette.text.secondary} />}
        lines={[
          `LMB+Drag, Ctrl+Arrows = ${lang.hotkeys.rotate}`,
          `RMB+Drag, Arrows = ${lang.hotkeys.pan}`,
          `Wheel = ${lang.hotkeys.zoom}`,
          `Z, Ctrl + = ${lang.hotkeys.zoomIn}`,
          `Shift + Z, Ctrl - = ${lang.hotkeys.zoomOut}`,
          `R = ${lang.hotkeys.resetCamera}`,
        ]}
      />
      <AllHotkeysLegend.Block
        title={lang.hotkeys.walkTitle}
        icon={<PersonWalkingIcon color={theme.palette.text.secondary} />}
        lines={[
          `WASD = ${lang.hotkeys.walk}`,
          `Mouse = ${lang.hotkeys.look}`,
        ]}
      />
    </AllHotkeysLegend.Root>
  );
};
