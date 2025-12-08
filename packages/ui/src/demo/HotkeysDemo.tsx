import { memo } from 'react';
import { HotkeyLegend } from '../components';

export const HotkeysDemo = memo(() => (
  <>
    <HotkeyLegend label='2' />
    <HotkeyLegend label='V' />
    <HotkeyLegend label='Tab' />
    <HotkeyLegend label='Ctrl + Z' />
    <HotkeyLegend label='L or Space bar' />
  </>
));
