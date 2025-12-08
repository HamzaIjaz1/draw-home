import styled, { css } from 'styled-components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { HotkeyLegend, HotkeyLegendProps } from '@draw-house/ui/dist/components';
import { useIsHotkeysShown } from '../zustand/useIsHotkeysShown';

const StyledWrapper = styled.div`
  position: relative;
`;
const StyledAnchor = styled.div<{ $position: HotkeyProps['position'] }>`
  position: absolute;
  width: max-content;
  z-index: ${specialZIndexTop};
  pointer-events: none;

  ${p => (p.$position === 'bottom' || p.$position === 'bottomCloser' || p.$position === 'top' || p.$position === 'topCloser') && css`
    left: 50%;
    transform: translateX(-50%);
  `}
  ${p => p.$position === 'left' && css`
    top: calc(50% - 3px);
    transform: translateY(-50%);
  `}

  ${p => p.$position === 'bottom' && css`
    top: calc(100% + 12px);
  `}
  ${p => p.$position === 'bottomCloser' && css`
    top: calc(100% - 6px);
  `}
  ${p => p.$position === 'top' && css`
    bottom: calc(100% + 15px);
  `}
  ${p => p.$position === 'topCloser' && css`
    bottom: calc(100% + 2px);
  `}
  ${p => p.$position === 'left' && css`
    right: calc(100% + 10px);
  `}
`;

export type HotkeyProps = {
  position: 'bottom' | 'bottomCloser' | 'top' | 'topCloser' | 'left';
  label: HotkeyLegendProps['label'];
};

export const Hotkey: React.FCWithChildren<HotkeyProps> = ({ children, position, label }) => {
  const { isHotkeysShown } = useIsHotkeysShown();

  return (
    <StyledWrapper>
      {children}
      {
        isHotkeysShown === true && (
          <StyledAnchor $position={position}>
            <HotkeyLegend label={label} />
          </StyledAnchor>
        )
      }
    </StyledWrapper>
  );
};
