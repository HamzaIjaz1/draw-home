import { memo, useState } from 'react';
import { useTheme } from '@mui/material';
import { AllHotkeysLegend, MainButton } from '../components';
import { negate } from '../utils/negate';
import { CameraIcon, CircumscribedPencilIcon, HouseWithChimneyIcon, KeyboardAndMouseIcon, PersonWalkingIcon } from '../components/Icons';

export const AllHotkeysDemo = memo(() => {
  const theme = useTheme();

  const globalKeys = {
    title: 'Global Keys',
    icon: <KeyboardAndMouseIcon color={theme.palette.text.secondary} />,
    lines: [
      'Alt = Show Hotkeys, Help',
      'Del = Delete selected object',
      'Esc = Abandon current action',
      'Ctrl + C = Copy Ctrl + V = Paste',
      'Tab = Switch between 2D/3D',
      'M = Tape Measure',
      'Shift while drawing = Ignore snap rules',
      'Shift + Click = Group',
      'Pg Up = Move up one level',
      'Pg DN = Move down one level',
    ],
  };

  const quickAccessKeys = {
    title: 'Quick Access Objects',
    icon: <HouseWithChimneyIcon color={theme.palette.text.secondary} />,
    lines: [
      'Shift + D = Door',
      'Shift + W = Window',
      'Shift + C = Column',
      'Shift + S = Stairs',
    ],
  };

  const cameraKeys = {
    title: 'Camera Controls',
    icon: <CameraIcon color={theme.palette.text.secondary} />,
    lines: [
      'Left click + Drag = Rotate',
      'Right click + Drag = Pan',
      'Scroll wheel = Zoom',
      'R = Reset camera',
      'Hold R = Rotate camera',
      'Arrows = Pan',
      'Z, Ctrl + = Zoom in',
      'Shift Z, Ctrl - = Zoom out',
    ],
  };

  const walkKeys = {
    title: 'Walk Controls',
    icon: <PersonWalkingIcon color={theme.palette.text.secondary} />,
    lines: [
      'WASD = Walk',
      'Pg Up = Up',
      'Pg Down = Down',
      'Mouse, Arrows = Look',
    ],
  };

  const otherKeys = {
    title: 'Other Tools',
    icon: <CircumscribedPencilIcon color={theme.palette.text.secondary} />,
    lines: [
      '/ = Comment',
      'B = Paintbrush',
      'T = Terrain',
    ],
  };

  return (
    <AllHotkeysLegend.Root>
      <AllHotkeysLegend.Block {...globalKeys} />
      <AllHotkeysLegend.Block {...quickAccessKeys} />
      <AllHotkeysLegend.Block {...cameraKeys} />
      <AllHotkeysLegend.Combine>
        <AllHotkeysLegend.Block {...walkKeys} />
        <AllHotkeysLegend.Block {...otherKeys} />
      </AllHotkeysLegend.Combine>
    </AllHotkeysLegend.Root>
  );
});

export const AllHotkeysMenuDemo = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MainButton
        icon='plus'
        text='All Hotkeys Legend'
        onClick={() => setOpen(negate)}
      />

      {open === true && <AllHotkeysDemo />}
    </>
  );
});
