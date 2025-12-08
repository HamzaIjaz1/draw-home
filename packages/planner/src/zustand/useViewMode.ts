import { create } from 'zustand';
import { ObjKeys } from '@arthurka/ts-utils';
import { closePopUpToolbar } from './usePopUpToolbar';
import { withComparingSetState } from '../utils/withComparingSetState';
import { useCanMoveWall } from './useCanMoveWall';
import { useCreationMode } from './useCreationMode';

export type ViewModeStore = {
  viewMode: '2D' | '3D';
};

export const useViewMode = create<ViewModeStore>(() => ({
  viewMode: '2D',
}));

withComparingSetState(useViewMode);

export const viewModes = ObjKeys({
  '2D': true,
  '3D': true,
} satisfies Record<ViewModeStore['viewMode'], true>);

useViewMode.subscribe(closePopUpToolbar);

useViewMode.subscribe(() => {
  useCanMoveWall.setState({ canMoveWall: false });
});

useViewMode.subscribe(({ viewMode }) => {
  if(viewMode === '3D') {
    useCreationMode.setState({
      creationMode: 'pointer',
    });
  }
});
