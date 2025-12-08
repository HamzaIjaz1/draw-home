import { lang } from '../lang';
import { openSnackbar } from '../zustand';

export type ComingSoonProps = {
  children: JSX.Element;
};

export const ComingSoonWrapper: React.FC<ComingSoonProps> = ({ children }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  <div
    style={{
      display: 'flex',
      flexGrow: 1,
    }}
    onClick={async () => {
      await openSnackbar({
        type: 'neutral',
        message: lang.comingSoon,
      });
    }}
  >
    {children}
  </div>
);
