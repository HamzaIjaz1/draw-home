import { WithClassName } from '@draw-house/common/dist/utils';
import Stack from '@mui/material/Stack';
import { Union } from '@arthurka/ts-utils';
import { Link, LinkProps } from '../Link';
import { ButtonLinkLike } from '../ButtonLinkLike';

type Option = Union<(
  & {
    title: string;
    icon: LinkProps['icon'];
    state?: 'default' | 'active';
  }
  & (
    | { href: string }
    | { onClick: () => void }
  )
)>;

export type MenuOptionsProps = {
  options: Option[];
  closeMenu: () => void;
};

export const MenuOptions = ({
  className,
  options,
  closeMenu,
}: MenuOptionsProps & WithClassName) => (
  <Stack className={className} gap={7}>
    {options.map(({ title, icon, href, onClick, state }) => {
      const key = `${icon}${href}${title}`;

      if(onClick === undefined) {
        return (
          <Link
            key={key}
            href={href}
            text={title}
            icon={icon}
            state={state}
          />
        );
      }

      return (
        <ButtonLinkLike
          key={key}
          text={title}
          icon={icon}
          onClick={() => {
            onClick();
            closeMenu();
          }}
          state={state}
        />
      );
    })}
  </Stack>
);
