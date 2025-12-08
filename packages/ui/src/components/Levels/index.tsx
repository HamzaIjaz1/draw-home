import { SafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import List from '@mui/material/List';
import { Level, LevelProps } from '../Level';
import { ListItem } from './styles';

export type LevelsProps = {
  items: Array<
    & SafeOmit<LevelProps, 'showTransparencyOption'>
    & {
      id: string;
      highlighted?: boolean;
      onClick: () => void;
    }
  >;
};

const keys = [' ', 'Enter'];

export const Levels = ({ className, items }: LevelsProps & WithClassName) => (
  <List className={className} role='listbox'>
    {items.map(({ id, onClick, highlighted = false, ...rest }) => (
      <ListItem
        key={id}
        role='option'
        tabIndex={0}
        onClick={onClick}
        onKeyUp={e => {
          if(keys.includes(e.key)) {
            onClick();
          }
        }}
        onKeyDown={e => {
          if(keys.includes(e.key)) {
            e.preventDefault();
          }
        }}
        highlighted={highlighted}
      >
        <Level
          {...rest}
          showTransparencyOption={highlighted}
        />
      </ListItem>
    ))}
  </List>
);
