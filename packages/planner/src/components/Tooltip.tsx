import styled, { css } from 'styled-components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { useRef, useState } from 'react';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { HotkeyLegendProps, tooltipArrowSize, TooltipButton, TooltipDescription, TooltipHeader, TooltipTitle, TooltipWrapper, TooltipWrapperProps } from '@draw-house/ui/dist/components';
import { DownArrowIcon } from '@draw-house/ui/dist/components/Icons';
import { useTheme } from '@mui/material';
import assert from 'assert';
import { useTouchScreen } from '../zustand/useTouchScreen';

const StyledWrapper = styled.div`
  position: relative;
`;
const StyledAnchor = styled.div<{ $position: TooltipProps['position'] }>`
  position: absolute;
  z-index: ${specialZIndexTop};

  ${p => p.$position === 'bottom-to-left' && css`
    top: calc(100% + ${tooltipArrowSize}px);
    right: 0;
  `}
  ${p => p.$position === 'top' && css`
    bottom: calc(100% + ${tooltipArrowSize}px);
    left: 50%;
    transform: translateX(-50%);
  `}
  ${p => p.$position === 'left' && css`
    right: calc(100% + ${tooltipArrowSize}px);
    top: 0;
  `}
`;

export type TooltipProps = {
  position: TooltipWrapperProps['position'];
  content: {
    title: string;
    description?: string;
    hotkey?: HotkeyLegendProps['label'];
  };
};

export const Tooltip: React.FCWithChildren<TooltipProps> = ({ children, position, content }) => {
  const { isTouchScreen } = useTouchScreen();
  const [openStatus, setOpenStatus] = useState<'closed' | 'opened' | 'opened-with-description'>('closed');
  const closeTimeout = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const hotkeyToShow = isUndefined(content.hotkey) || isTouchScreen === true ? null : content.hotkey;

  const setOpenTimeout = () => {
    if(openStatus !== 'closed') {
      return;
    }

    closeTimeout.current = window.setTimeout(() => {
      closeTimeout.current = null;
      setOpenStatus('opened');
    }, 700);
  };
  const clearOpenTimeout = () => {
    if(!isNull(closeTimeout.current)) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    } else if(isTouchScreen === false) {
      setOpenStatus('closed');
    }
  };

  return (
    <StyledWrapper onMouseEnter={setOpenTimeout} onMouseLeave={clearOpenTimeout}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        onClick={clearOpenTimeout}
        onTouchStart={setOpenTimeout}
        onTouchEnd={e => {
          if(openStatus !== 'closed') {
            e.preventDefault();

            const handler = (e?: PointerEvent | TouchEvent) => {
              assert(!isNull(tooltipRef.current), 'Something went wrong. |ek51rv|');
              if(!isUndefined(e) && e.composedPath().includes(tooltipRef.current)) {
                return;
              }

              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              window.clearTimeout(timeout);
              document.removeEventListener('pointerdown', handler);
              document.removeEventListener('touchstart', handler);

              setOpenStatus('closed');
            };

            document.addEventListener('pointerdown', handler);
            document.addEventListener('touchstart', handler);

            const timeout = window.setTimeout(() => {
              handler();
            }, 4000);
          }

          clearOpenTimeout();
        }}
      >
        {children}
      </div>
      {
        openStatus !== 'closed' && (
          <StyledAnchor ref={tooltipRef} $position={position}>
            <TooltipWrapper position={position}>
              <TooltipHeader>
                <TooltipTitle>{`${content.title}${!isNull(hotkeyToShow) ? ` [${hotkeyToShow}]` : ''}`}</TooltipTitle>
                {
                  !isUndefined(content.description) && (
                    <TooltipButton onClick={() => {
                      setOpenStatus(openStatus === 'opened' ? 'opened-with-description' : 'opened');
                    }}
                    >
                      <DownArrowIcon
                        color={theme.palette.background.paper}
                        rotate={openStatus === 'opened-with-description' ? -180 : 0}
                        transitionDurationMs={100}
                      />
                    </TooltipButton>
                  )
                }
              </TooltipHeader>
              {
                !isUndefined(content.description) && openStatus === 'opened-with-description' && (
                  <TooltipDescription>{content.description}</TooltipDescription>
                )
              }
            </TooltipWrapper>
          </StyledAnchor>
        )
      }
    </StyledWrapper>
  );
};
