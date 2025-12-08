import { IconButton } from '@draw-house/ui/dist/components';
import { redo, undo, useUndoRedo } from '../../zustand';
import { Hotkey } from '../Hotkey';

export const UndoRedoButtons: React.FC = () => {
  const isUndoActive = useUndoRedo(s => s.prevStore.length > 0);
  const isRedoActive = useUndoRedo(s => s.nextStore.length > 0);

  return (
    <>
      <Hotkey position='top' label='Ctrl + Z'>
        <IconButton
          icon='undo'
          state={isUndoActive === true ? 'default' : 'disabled'}
          onClick={undo}
        />
      </Hotkey>
      <Hotkey position='top' label='Ctrl + Y'>
        <IconButton
          icon='redo'
          state={isRedoActive === true ? 'default' : 'disabled'}
          onClick={redo}
        />
      </Hotkey>
    </>
  );
};
