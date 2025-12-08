import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { Union } from '@arthurka/ts-utils';
import { DownArrowIcon } from '../../../Icons';
import { Isle } from '../Isle';
import {
  AccordionDetails,
  AccordionSummary,
  DesktopContent,
  MobileAccordion,
  Title,
} from './styles';

type Controls = (
  | {
    defaultCollapsed?: boolean;
  }
  | {
    expanded: boolean;
    onChange: (expanded: boolean) => void;
  }
);

export type TitledIsleProps = Union<
  & {
    title: string;
    children: React.ReactNode;
  }
  & (
    | { type: 'always-static' }
    | (
      & { type: 'desktop-static' }
      & Controls
    )
  )
>;

export const TitledIsle = ({
  className,
  title,
  children,
  expanded,
  onChange,
  type,
  defaultCollapsed = false,
}: TitledIsleProps & WithClassName) => {
  const theme = useTheme();

  return (
    <Isle className={className}>
      <MobileAccordion
        elevation={0}
        disableGutters
        defaultExpanded={!defaultCollapsed}
        expanded={type === 'always-static' ? true : expanded}
        onChange={(_, expanded) => onChange?.(expanded)}
      >
        <AccordionSummary
          type={type}
          expandIcon={(
            type === 'always-static'
              ? undefined
              : <DownArrowIcon color={theme.palette.general.purpleGray} />
          )}
          tabIndex={type === 'always-static' ? -1 : 0}
        >
          <Title>{title}</Title>
        </AccordionSummary>

        <AccordionDetails>
          {children}
        </AccordionDetails>
      </MobileAccordion>

      <DesktopContent>
        <Title>{title}</Title>
        {children}
      </DesktopContent>
    </Isle>
  );
};
