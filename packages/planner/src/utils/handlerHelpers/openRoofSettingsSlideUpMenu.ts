import { RoofId } from '@draw-house/common/dist/brands';
import { openWithFocus } from '../openWithFocus';

export const openRoofSettingsSlideUpMenu = async (id: RoofId) => {
  await openWithFocus(
    `roof:${id}`,
    { type: 'roof', isOpened: true, roofId: id },
    s => s.type === 'roof' && s.roofId === id,
  );
};
