import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined } from '@arthurka/ts-utils';
import { BadgeLabel, Container, Label } from './styles';

export type AppearanceTabProps = {
  label: string;
  badgeLabel?: string;
  state: 'default' | 'active';
  onClick: () => void;
};

export const AppearanceTab = ({
  className,
  label,
  badgeLabel,
  state,
  onClick,
}: AppearanceTabProps & WithClassName) => (
  <Container
    className={className}
    $state={state}
    onClick={onClick}
  >
    <Label
      $state={state}
      noWrap
    >
      {label}
    </Label>

    {isUndefined(badgeLabel) ? null : (
      <span>
        <BadgeLabel $state={state}>{badgeLabel}</BadgeLabel>
      </span>
    )}
  </Container>
);
