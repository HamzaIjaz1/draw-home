import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { $Props, $props } from '../../utils/$props';
import { lookup } from '../../utils/lookup';

export const tooltipArrowSize = 6;

export type TooltipWrapperProps = {
  children: React.ReactNode;
  position: 'bottom-to-left' | 'top' | 'left';
};

const Container = styled('div', $props())<$Props<{
  $position: TooltipWrapperProps['position'];
}>>(({ $position }) => css`
  --tooltip-background-color: #000000b2;

  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 3px 8px 6px 8px;
  background-color: var(--tooltip-background-color);
  backdrop-filter: blur(6px);
  border-radius: 6px;

  position: relative;

  ::before {
    content: '';
    position: absolute;

    ${$position === 'bottom-to-left' && css`
      width: 100%;
      height: ${tooltipArrowSize}px;
      bottom: 100%;
      right: 0;
    `}
    ${$position === 'top' && css`
      width: 100%;
      height: ${tooltipArrowSize}px;
      top: 100%;
      left: 0;
    `}
    ${$position === 'left' && css`
      width: ${tooltipArrowSize}px;
      height: 100%;
      top: 0;
      left: 100%;
    `}
  }

  ::after {
    content: '';
    position: absolute;

    width: 0;
    height: 0;

    ${lookup($position, {
    'bottom-to-left': css`
      bottom: 100%;
      right: 20px;
      border-left: ${tooltipArrowSize}px solid transparent;
      border-right: ${tooltipArrowSize}px solid transparent;
      border-bottom: ${tooltipArrowSize}px solid var(--tooltip-background-color);
    `,
    left: css`
      left: 100%;
      top: 12px;
      border-top: ${tooltipArrowSize}px solid transparent;
      border-bottom: ${tooltipArrowSize}px solid transparent;
      border-left: ${tooltipArrowSize}px solid var(--tooltip-background-color);
    `,
    top: css`
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: ${tooltipArrowSize}px solid transparent;
      border-right: ${tooltipArrowSize}px solid transparent;
      border-top: ${tooltipArrowSize}px solid var(--tooltip-background-color);
    `,
  })}
  }
`);

export const TooltipWrapper = ({ className, children, position }: TooltipWrapperProps & WithClassName) => (
  <Container
    className={className}
    $position={position}
  >
    {children}
  </Container>
);
